package models
import play.api.libs.json._

object Header {
  implicit val headerFormatter = Json.format[Header];
}

object HeaderRef {
  implicit val headerRefFormatter = Json.format[HeaderRef];
}

case class Header(
    ref: String,
    name: String,
    summary: String,
    os_affinity: Seq[String],
)

case class HeaderRef(
    ref: String,
    name: String,
)