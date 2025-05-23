use controllers::v1::capibara_controller;
use models::document::Document;
use rocket::fs::relative;
use rocket::fs::NamedFile;
use shuttle_runtime::CustomError;
use sqlx::Executor;
use sqlx::PgPool;
use std::path::{Path, PathBuf};
use tokio::sync::RwLock;

pub mod controllers;
pub mod dtos;
pub mod infrastructure;
pub mod models;

#[rocket::get("/<path..>")]
pub async fn serve(path: PathBuf) -> Option<NamedFile> {
    let stripped = path.to_str().unwrap().replace("..", "");
    let mut path = Path::new(relative!("assets/clientapp")).join(stripped);
    if path.is_dir() {
        path.push("index.html");
    }

    NamedFile::open(path).await.ok()
}

struct CapibaraState {
    pool: PgPool,
    document : RwLock<Option<Document>>
}

#[shuttle_runtime::main]
async fn main(
    #[shuttle_shared_db::Postgres] pool: PgPool
) -> shuttle_rocket::ShuttleRocket {
    pool.execute(include_str!("../schema.sql"))
        .await
        .map_err(CustomError::new)?;

    let state = CapibaraState { pool, document : RwLock::new(None) };

    let rocket = rocket::build()
    .mount("/api", rocket::routes![
        capibara_controller::headers,
        capibara_controller::search,
        capibara_controller::update_definitions,
        capibara_controller::definition])
    .mount("/", rocket::routes![capibara_controller::capibara_file])
    .mount("/", rocket::routes![serve])
    .manage(state);

    Ok(rocket.into())
}
