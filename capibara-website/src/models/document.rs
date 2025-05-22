use rocket::serde::{Deserialize, Serialize};
use super::header::Header;
use super::_macro::Macro;
use super::enumeration::Enumeration;
use super::_struct::Struct;
use super::typedef::Typedef;
use super::function::Function;


#[derive(Serialize, Deserialize, Clone)]
pub(crate) struct Document {
    pub build_date: String,
    pub reference_url: String,
    pub headers: Vec<Header>,
    pub macros: Vec<Macro>,
    pub enums: Vec<Enumeration>,
    pub structs: Vec<Struct>,
    pub typedefs: Vec<Typedef>,
    pub functions: Vec<Function>,
}