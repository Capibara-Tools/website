package models
import play.api.libs.json._

object Field {
  implicit val fieldFormatter = Json.format[Field];
}

object Struct {
  implicit val structFormatter = Json.format[Struct];
}

case class Struct(
    name: String,
    header: HeaderRef,
    summary: String,
    fields: Seq[Field],
    description: String,
    os_affinity: Seq[String]
)

case class Field(
    name: String,
    `type`: String,
    description: String,
)
