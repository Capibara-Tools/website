use rocket::{http::Status, request::{FromRequest, Outcome, Request}, State};

use crate::CapibaraState;

pub struct AuthToken<'r>(&'r str);

#[derive(Debug)]
pub enum AuthTokenError {
    Missing,
    Invalid,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for AuthToken<'r> {
    type Error = AuthTokenError;

    async fn from_request(req: &'r Request<'_>) -> Outcome<Self, AuthTokenError> {
        let outcome = req.guard::<&State<CapibaraState>>().await;
        let state = outcome.succeeded().unwrap();
        /// Returns true if `key` is a valid API key string.
        fn is_valid(key: &str, input: &str) -> bool {
            key == input
        }

        match req.headers().get_one("x-auth-token") {
            None => Outcome::Error((Status::BadRequest, AuthTokenError::Missing)),
            Some(key) if is_valid(&state.api_key, key) => Outcome::Success(AuthToken(key)),
            Some(_) => Outcome::Error((Status::BadRequest, AuthTokenError::Invalid)),
        }
    }
}