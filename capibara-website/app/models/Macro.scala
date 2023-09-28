package models
import play.api.libs.json._
import scala.None

object MacroReturn {
  implicit val returnFormatter = Json.format[MacroReturn];
}

object MacroParameter {
  implicit val parameterFormatter = Json.format[MacroParameter];
}

object MacroExample {
  implicit val parameterFormatter = Json.format[MacroExample];
}

object MacroFunction {
  implicit val functionFormatter = Json.format[MacroFunction];
}

object MacroKind {
  implicit val macroKindFormatter = Json.format[MacroKind];
}

object Macro {
  implicit val macroFormatter = Json.format[Macro];
}

case class Macro(
    name: String,
    header: HeaderRef,
    summary: String,
    kind: MacroKind,
    description: String,
    os_affinity: Seq[String]
)

case class MacroKind(
    `object`: Option[JsObject], // MacroObject
    function: Option[MacroFunction]
) {
  require(
    `object`.isDefined ^ function.isDefined,
    "one object or function exclusively must be defined!"
  )
}

case class MacroFunction(
    returns: MacroReturn,
    parameters: Seq[MacroParameter],
    examples: Seq[MacroExample]
)

case class MacroReturn(
    `type`: String,
    description: String
)

case class MacroParameter(
    name: String,
    description: String
)

case class MacroExample(
    title: String,
    code: String,
)
