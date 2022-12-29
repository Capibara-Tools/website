package models
import play.api.libs.json._

object CapibaraDocument {
  implicit val capibaraDocumentFormatter = Json.format[CapibaraDocument];
}

case class CapibaraDocument(
    build_date: String,
    reference_url: String,
    headers: Seq[Header],
    macros: Seq[Macro],
    enums: Seq[Enum],
    structs: Seq[Struct],
    typedefs: Seq[Typedef],
    functions: Seq[Function]
)
