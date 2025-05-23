use rocket::serde::{Deserialize, Serialize};

use crate::models::_macro::Macro;
use crate::models::enumeration::Enumeration;
use crate::models::_struct::Struct;
use crate::models::typedef::Typedef;
use crate::models::function::Function;

#[derive(Serialize, Deserialize, Clone)]
pub(crate) struct HeaderDetail {
    #[serde(rename = "ref")]
    pub _ref: String,
    pub name: String,
    pub summary: String,
    pub os_affinity: Vec<String>,
    pub macros: Vec<Macro>,
    pub enums: Vec<Enumeration>,
    pub structs: Vec<Struct>,
    pub typedefs: Vec<Typedef>,
    pub functions: Vec<Function>
}