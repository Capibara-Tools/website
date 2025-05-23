use controllers::v1::capibara_controller;
use models::document::Document;
use rocket::fairing::AdHoc;
use rocket::fs::relative;
use rocket::fs::NamedFile;
use rocket::http::ContentType;
use rocket::http::Status;
use shuttle_runtime::CustomError;
use sqlx::Executor;
use sqlx::PgPool;
use std::io::Cursor;
use std::path::{Path, PathBuf};
use tokio::sync::RwLock;
use shuttle_runtime::SecretStore;

pub mod controllers;
pub mod dtos;
pub mod infrastructure;
pub mod models;

#[rocket::get("/<path..>")]
pub async fn serve(path: PathBuf) -> Option<NamedFile> {
    let stripped = path.to_str().unwrap().replace("..", "");
    let mut path = Path::new(relative!("assets")).join("clientapp").join(stripped);
    if path.is_dir() {
        path.push("index.html");
    }

    println!("Attempting to read: {:?}", path);

    NamedFile::open(path).await.ok()
}

struct CapibaraState {
    pool: PgPool,
    document : RwLock<Option<Document>>,
    api_key: String
}

#[shuttle_runtime::main]
async fn main(
    #[shuttle_runtime::Secrets] secrets: SecretStore,
    #[shuttle_shared_db::Postgres(local_uri = "postgres://postgres:password@localhost:5432/postgres")] pool: PgPool
) -> shuttle_rocket::ShuttleRocket {

    //Debug . listings
    let paths = std::fs::read_dir("./").unwrap();

    for path in paths {
        println!("Name: {}", path.unwrap().path().display())
    }

    //Print assets path
    println!("{:?}",Path::new(relative!("assets")));

    //Print contents of assets
    let paths = std::fs::read_dir(Path::new(relative!("assets"))).unwrap();

    for path in paths {
        println!("Name: {}", path.unwrap().path().display())
    }


    pool.execute(include_str!("../schema.sql"))
        .await
        .map_err(CustomError::new)?;

    let secret = secrets.get("CAPIBARA_API_KEY").expect("secret was not found");

    let state = CapibaraState { pool, document : RwLock::new(None), api_key: secret};

    let rocket = rocket::build()
    .mount("/api", rocket::routes![
        capibara_controller::headers,
        capibara_controller::search,
        capibara_controller::update_definitions,
        capibara_controller::definition])
    .mount("/", rocket::routes![capibara_controller::capibara_file])
    .mount("/", rocket::routes![serve])
    .attach(AdHoc::on_response("404 Redirector", |_req, res| Box::pin(async move {
        if res.status() == Status::NotFound {
            let body = std::fs::read_to_string(Path::new(relative!("assets")).join("clientapp/index.html")).expect("Index file can't be found.");

            res.set_status(Status::Ok);
            res.set_header(ContentType::HTML);
            res.set_sized_body(body.len(), Cursor::new(body));
        }
    })))
    .manage(state);

    Ok(rocket.into())
}
