use super::{function::Return, header::HeaderSummary};
use rocket::serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub(crate) struct Macro {
    pub name: Box<String>,
    pub header: HeaderSummary,
    pub summary: Box<String>,
    pub kind: MacroKind,
    pub description: Box<String>,
    pub os_affinity: Vec<String>,
}

#[derive(Serialize, Deserialize, Clone)]
pub(crate) struct MacroFunction {
    pub returns: Return,
    pub parameters: Vec<TypelessParameter>,
    pub examples: Vec<Example>
}

#[derive(Serialize, Deserialize, Clone)]
pub(crate) struct Example {
    pub title: Box<String>,
    pub code: Box<String>,
}

#[derive(Serialize, Deserialize, Clone)]
pub(crate) struct TypelessParameter {
    pub name: Box<String>,
    pub description: Box<String>,
}

#[derive(Serialize, Deserialize, Clone)]
pub(crate) struct MacroObject {}

#[derive(Serialize, Deserialize, Clone)]
pub(crate) enum MacroKind {
    #[serde(rename = "object")]
    Object(MacroObject),
    #[serde(rename = "function")]
    Function(MacroFunction),
}
