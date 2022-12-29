package models
import play.api.libs.json._

object Variant {
  implicit val variantFormatter = Json.format[Variant];
}

object Enum {
  implicit val enumFormatter = Json.format[Enum];
}

case class Enum(
    name: String,
    header: HeaderRef,
    summary: String,
    variants: Seq[Variant],
    description: String,
    os_affinity: Seq[String]
)

case class Variant(
    name: String,
    description: String,
)