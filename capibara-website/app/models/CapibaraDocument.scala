package models
import play.api.libs.json._

object CapibaraDocument {
  implicit val headerFormatter = Json.format[Header];
  implicit val headerSummaryFormatter = Json.format[HeaderSummary];
  implicit val parameterFormatter = Json.format[Parameter];
  implicit val functionFormatter = Json.format[Function];
  implicit val capibaraDocumentFormatter = Json.format[CapibaraDocument];
}

object Header {
  implicit val headerFormatter = Json.format[Header];
}

object HeaderDetail {
  implicit val headerSummaryFormatter = Json.format[HeaderSummary];
  implicit val parameterFormatter = Json.format[Parameter];
  implicit val functionFormatter = Json.format[Function];
  implicit val headerFormatter = Json.format[Header];
  implicit val headerDetailFormatter = Json.format[HeaderDetail];
}

object HeaderSummary {
  implicit val headerSummaryFormatter = Json.format[HeaderSummary];
}

object Parameter {
  implicit val parameterFormatter = Json.format[Parameter];
}

object Function {
  implicit val headerSummaryFormatter = Json.format[HeaderSummary];
  implicit val parameterFormatter = Json.format[Parameter];
  implicit val functionFormatter = Json.format[Function];
}

object SearchResult {
  implicit val headerFormatter = Json.format[Header];
  implicit val parameterFormatter = Json.format[Parameter];
  implicit val functionFormatter = Json.format[Function];
  implicit val searchResultFormatter = Json.format[SearchResult];
}

object RefResult {
  implicit val headerDetailFormatter = Json.format[HeaderDetail];
  implicit val parameterFormatter = Json.format[Parameter];
  implicit val functionFormatter = Json.format[Function];
  implicit val refResultFormatter = Json.format[RefResult];
}

case class CapibaraDocument(
    build_date: String,
    reference_url: String,
    headers: Seq[Header],
    functions: Seq[Function]
)

case class Header(
    ref: String,
    name: String,
    os_affinity: Seq[String]
)

case class HeaderDetail(
    ref: String,
    name: String,
    os_affinity: Seq[String],
    functions: Seq[Function]
)

case class HeaderSummary(
    ref: String,
    name: String,
    os_affinity: Seq[String]
)

case class Function(
    name: String,
    header: HeaderSummary,
    summary: String,
    returns: String,
    parameters: Seq[Parameter],
    description: String,
    associated: Seq[String]
)

case class Parameter(
    name: String,
    `type`: String,
    description: String
)

case class SearchResult(
    functions: Seq[Function]
)

case class RefResult(
    result_type: String,
    header: Option[HeaderDetail],
    function: Option[Function]
)
