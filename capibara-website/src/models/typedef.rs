use super::{_struct::Struct, enumeration::Enumeration, header::HeaderSummary};
use rocket::serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub(crate) struct Typedef {
    pub name: Box<String>,
    pub header: HeaderSummary,
    pub summary: Box<String>,
    #[serde(rename = "type")]
    pub _type: Box<String>,
    pub associated_ref: TypedefRef,
    pub description: Box<String>,
    pub os_affinity: Vec<String>,
}

#[derive(Serialize, Deserialize, PartialEq, Clone)]
pub(crate) enum TypedefRef {
    #[serde(rename = "none")]
    None(None),
    #[serde(rename = "enum")]
    Enumeration(Enumeration),
    #[serde(rename = "struct")]
    Struct(Struct),
}

#[derive(Serialize, Deserialize, PartialEq, Clone)]
pub(crate) struct None {}
