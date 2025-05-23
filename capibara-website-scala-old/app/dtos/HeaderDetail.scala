package dtos
import models._
import play.api.libs.json.Json

object HeaderDetail {
  implicit val headerDetailFormatter = Json.format[HeaderDetail];
}

case class HeaderDetail(
    ref: String,
    name: String,
    summary: String,
    os_affinity: Seq[String],
    macros: Seq[Macro],
    enums: Seq[Enum],
    structs: Seq[Struct],
    typedefs: Seq[Typedef],
    functions: Seq[Function]
)
