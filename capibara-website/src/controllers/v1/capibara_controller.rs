use std::default::Default;
use std::path::PathBuf;
use rocket::data::ToByteUnit;
use rocket::fs::NamedFile;
use rocket::http::Status;
use rocket::response::status::{BadRequest, Custom};
use rocket::{get, put, Data, State};
use rocket::serde::json::Json;
use crate::dtos::header_detail::HeaderDetail;
use crate::dtos::ref_result::RefResult;
use crate::dtos::search_result::SearchResult;
use crate::infrastructure::auth_token::AuthToken;
use crate::models::document;
use crate::models::{document::Document, header::Header};
use crate::CapibaraState;

#[get("/v1/headers")]
pub async fn headers(document: Document) -> Json<Vec<Header>>{
    return Json(document.headers.clone())
}

#[get("/v1/search?<term>")]
pub async fn search(document: Document, term: Option<&str>) -> Result<Json<SearchResult>, BadRequest<String>>{
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
pub async fn update_definitions(data : Data<'_>, _token : AuthToken<'_>, state: &State<CapibaraState>) -> Status {
    let bytes = data.open(5.megabytes());
    if let Ok(capped_json_string) = bytes.into_string().await {
        let json_string = capped_json_string.as_str();
        if let Ok(document) = rocket::serde::json::serde_json::from_str::<Document>(&json_string) {

            let upsert = sqlx::query(r#"
            INSERT INTO blob_persist (title, blob_data) VALUES ($1, convert_to($2, 'UTF8'))
            ON CONFLICT (title) DO UPDATE SET title = $1, blob_data = convert_to($2, 'UTF8');
            "#);

            //println!("{:?}", json_string);

            let output = upsert
            .bind("capibara_document")
            .bind(json_string)
            .execute(&state.pool)
            .await;

            _ = output.map_err(|x| {
                eprintln!("{:?}", x)
            });

            let mut lock = state.document.write().await;
            *lock = Some(document.clone());

            Status::Ok
        } else {
            Status::BadRequest
        }
    } else {
        Status::BadRequest
    }
}

#[get("/v1/definition/<term..>")]
pub async fn definition(document: Document, term: Option<PathBuf>) -> Result<Json<RefResult>, Custom<String>>{
    if let Some(term) = term {
        let term = term.to_str().unwrap().replace("\\", "/");
        let mut returnable = RefResult::default();

        let header = document.clone()
            .headers
            .clone()
            .into_iter()
            .find(|x| x._ref.as_str() == term);

        if let Some(header) = header {
            let macros = document.macros.clone().into_iter().filter(|x| x.header._ref == header._ref).collect();
            let enums = document.enums.clone().into_iter().filter(|x| x.header._ref == header._ref).collect();
            let structs = document.structs.clone().into_iter().filter(|x| x.header._ref == header._ref).collect();
            let typedefs = document.typedefs.clone().into_iter().filter(|x| x.header._ref == header._ref).collect();
            let functions = document.functions.clone().into_iter().filter(|x| x.header._ref == header._ref).collect();

            let header_detail = HeaderDetail {
                _ref : header._ref.to_string(),
                name : header.name.to_string(),
                summary : header.summary.to_string(),
                os_affinity : header.os_affinity,
                macros,
                enums,
                structs,
                typedefs,
                functions
            };

            returnable.header = Some(header_detail);
        }

        if !returnable.is_returnable() {
            let _macro = document
            .macros
            .clone()
            .into_iter()
            .find(|x| x.header._ref.as_str().to_owned() + "/" + x.name.as_str() == term);

            if let Some(_macro) = _macro {
                returnable._macro = Some(_macro)
            }
        }

        if !returnable.is_returnable() {
            let _enum = document
            .enums
            .clone()
            .into_iter()
            .find(|x| x.header._ref.as_str().to_owned() + "/" + x.name.as_str() == term);

            if let Some(_enum) = _enum {
                returnable._enum = Some(_enum)
            }
        }

        if !returnable.is_returnable() {
            let _struct = document
            .structs
            .clone()
            .into_iter()
            .find(|x| x.header._ref.as_str().to_owned() + "/" + x.name.as_str() == term);

            if let Some(_struct) = _struct {
                returnable._struct = Some(_struct)
            }
        }

        if !returnable.is_returnable() {
            let typedef = document
            .typedefs
            .clone()
            .into_iter()
            .find(|x| x.header._ref.as_str().to_owned() + "/" + x.name.as_str() == term);

            if let Some(typedef) = typedef {
                returnable.typedef = Some(typedef)
            }
        }

        if !returnable.is_returnable() {
            let function = document.clone()
            .functions
            .clone()
            .into_iter()
            .find(|x| x.header._ref.as_str().to_owned() + "/" + x.name.as_str() == term);

            if let Some(function) = function {
                returnable.function = Some(function)
            }
        }

        if returnable.is_returnable() {
          Ok(Json(returnable))
        } else {
            Err(Custom(Status::NotFound,"definition not found.".to_string()))
        }
    } else {
        Err(Custom(Status::BadRequest,"query parameter term is not defined.".to_string()))
    }
}

#[get("/capibara.json")]
pub async fn capibara_file(document : Document) -> Json<Document>{
    Json(document)
}