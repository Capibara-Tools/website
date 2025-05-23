use rocket::serde::{Deserialize, Serialize};

use crate::dtos::header_detail::HeaderDetail;
use crate::models::_macro::Macro;
use crate::models::enumeration::Enumeration;
use crate::models::_struct::Struct;
use crate::models::typedef::Typedef;
use crate::models::function::Function;

#[derive(Serialize, Deserialize, Clone, Default)]
pub(crate) struct RefResult {
    pub header: Option<HeaderDetail>,
    #[serde(rename = "macro")]
    pub _macro: Option<Macro>,
    #[serde(rename = "enum")]
    pub _enum: Option<Enumeration>,
    #[serde(rename = "struct")]
    pub _struct: Option<Struct>,
    pub typedef: Option<Typedef>,
    pub function: Option<Function>
}

impl RefResult {
    pub fn is_returnable(&self) -> bool {
        self.header.is_some() ||
        self._macro.is_some() ||
        self._enum.is_some() ||
        self._struct.is_some() ||
        self.typedef.is_some() ||
        self.function.is_some()
    }
}