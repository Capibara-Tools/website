package dtos
import models._
import play.api.libs.json.Json

object RefResult {
  implicit val refResultFormatter = Json.format[RefResult];
}

case class RefResult(
    header: Option[HeaderDetail] = None,
    `macro`: Option[Macro] = None,
    `enum`: Option[Enum] = None,
    struct: Option[Struct] = None,
    typedef: Option[Typedef] = None,
    function: Option[Function] = None
) {
  require(
    header.isDefined ^ `macro`.isDefined ^ `enum`.isDefined ^ struct.isDefined ^ typedef.isDefined ^ function.isDefined,
    "Exactly one of header, macro, enum, struct, typedef, and function must exclusively be defined!"
  );
}
