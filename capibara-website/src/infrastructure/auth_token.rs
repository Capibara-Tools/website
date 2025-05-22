use rocket::{http::Status, request::{FromRequest, Outcome, Request}};

pub struct AuthToken<'r>(&'r str);

#[derive(Debug)]
enum AuthTokenError {
    Missing,
    Invalid,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for AuthToken<'r> {
    type Error = AuthTokenError;

    async fn from_request(req: &'r Request<'_>) -> Outcome<Self, AuthTokenError> {
        /// Returns true if `key` is a valid API key string.
        fn is_valid(key: &str) -> bool {
            key == "valid_api_key"
        }

        match req.headers().get_one("x-auth-token") {
            None => Outcome::Error((Status::BadRequest, AuthTokenError::Missing)),
            Some(key) if is_valid(key) => Outcome::Success(AuthToken(key)),
            Some(_) => Outcome::Error((Status::BadRequest, AuthTokenError::Invalid)),
        }
    }
}