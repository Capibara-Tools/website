use rocket::http::Status;
use rocket::response::status::BadRequest;
use rocket::{get, put, Data};
use rocket::serde::json::Json;

use crate::dtos::search_result::SearchResult;
use crate::infrastructure::auth_token::AuthToken;
use crate::models::{document::Document, header::Header};


#[get("/v1/headers")]
async fn headers(document: &Document) -> Json<Vec<Header>>{
    return Json(document.headers.clone())
}

#[get("/v1/search?<term>")]
async fn search(document: &Document, term: Option<&str>) -> Result<Json<SearchResult>, BadRequest<String>>{
    if let Some(term) = term {
        let macros = document
            .macros
            .clone()
            .into_iter()
            .filter(|x| x.name.contains(term))
            .collect();

        let enums = document
            .enums
            .clone()
            .into_iter()
            .filter(|x| x.name.contains(term))
            .collect();

        let structs = document
            .structs
            .clone()
            .into_iter()
            .filter(|x| x.name.contains(term))
            .collect();

        let typedefs = document
            .typedefs
            .clone()
            .into_iter()
            .filter(|x| x.name.contains(term))
            .collect();

        let functions = document
            .functions
            .clone()
            .into_iter()
            .filter(|x| x.name.contains(term))
            .collect();

        let json = Json(
            SearchResult {
                macros,
                enums,
                structs,
                typedefs,
                functions
            }
        );

        Ok(json)
    } else {
        Err(BadRequest("query parameter term is not defined.".to_string()))
    }
}

#[put("/v1/update-definitions", data = "<data>")]
async fn update_definitions(data : Data<'_>, token : AuthToken<'_>) -> Status {
    Status::Ok
}

//GET /api/v1/refresh-definitions controllers.CapibaraController.refreshCapibaraFile(token : Option[String])

//GET /api/v1/definition/*definition controllers.CapibaraController.definition(definition)

//GET /capibara.json controllers.CapibaraController.getCapibaraFile()*/