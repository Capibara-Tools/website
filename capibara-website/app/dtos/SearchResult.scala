package dtos
import models._
import play.api.libs.json.Json

object SearchResult {
  implicit val searchResultFormatter = Json.format[SearchResult];
}

case class SearchResult(
    macros: Seq[Macro],
    enums: Seq[Enum],
    structs: Seq[Struct],
    typedefs: Seq[Typedef],
    functions: Seq[Function]
)
