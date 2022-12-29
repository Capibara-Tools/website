package models
import play.api.libs.json._

object TypedefRef {
  implicit val typedefRefFormatter = Json.format[TypedefRef];
}

object Typedef {
  implicit val typedefFormatter = Json.format[Typedef];
}

case class Typedef(
    name: String,
    header: HeaderRef,
    summary: String,
    `type`: String,
    associated_ref: TypedefRef,
    description: String,
    os_affinity: Seq[String]
)

case class TypedefRef(
    `enum`: Option[Enum],
    struct: Option[Struct],
    none: Option[JsObject] // TypedefNone
) {
  require(
    `enum`.isDefined ^ struct.isDefined ^ none.isDefined,
    "one enum, struct, or none exclusively must be defined!"
  )
}
