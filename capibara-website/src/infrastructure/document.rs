use rocket::http::Status;
use rocket::request::Outcome;
use rocket::request::FromRequest;
use rocket::Request;
use rocket::State;
use crate::models::document::Document;
use crate::CapibaraState;
use sqlx::Row;

#[derive(Debug)]
pub enum DocumentError {
    Unresolvable
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for Document {
    type Error = DocumentError;

    async fn from_request(req: &'r Request<'_>) -> Outcome<Self, DocumentError> {
        let outcome = req.guard::<&State<CapibaraState>>().await;
        let state = outcome.succeeded().unwrap();

        let mut not_populated = false;
        if let Ok(lock) = state.document.try_read() {
            let value = (*lock).clone();

            if let Some(document) = value {
                return Outcome::Success(document);
            } else {
                not_populated = true;
            }
        }

        if not_populated {
            let query = sqlx::query(r#"SELECT title, convert_from(blob_data, 'UTF8') as data FROM blob_persist WHERE title = $1;"#);

            let result = query
            .bind("capibara_document")
            .fetch_one(&state.pool).await;

            if let Ok(row) = result {
                let data : &str = row.try_get("data").unwrap_or("");
                if let Ok(document) = rocket::serde::json::serde_json::from_str::<Document>(data) {
                    let mut lock = state.document.write().await;
                    *lock = Some(document.clone());

                    return Outcome::Success(document)
                } else {
                    println!("data {}", data);
                }
            } else {
                println!("{:?}", result)
            }
        }

        Outcome::Error((Status::BadRequest, DocumentError::Unresolvable))
    }
}