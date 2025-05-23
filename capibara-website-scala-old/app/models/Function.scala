package models
import play.api.libs.json._

object Return {
  implicit val returnFormatter = Json.format[Return];
}

object Parameter {
  implicit val parameterFormatter = Json.format[Parameter];
}

object Example {
  implicit val exampleFormatter = Json.format[Example];
}

object Function {
  implicit val functionFormatter = Json.format[Function];
}

case class Function(
    name: String,
    header: HeaderRef,
    summary: String,
    returns: Return,
    parameters: Seq[Parameter],
    description: String,
    examples: Seq[Example],
    associated: Seq[String],
    os_affinity: Seq[String]
)

case class Return(
    `type`: String,
    description: String,
)

case class Parameter(
    name: String,
    `type`: String,
    description: String,
)

case class Example(
    title: String,
    code: String,
)
