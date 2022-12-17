package controllers

import javax.inject._
import play.api._
import play.api.cache._
import play.api.mvc._
import play.api.libs.json._
import java.io.FileReader
import scala.concurrent._
import scala.concurrent.duration._
import java.util.concurrent.TimeUnit
import models._

/** This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class CapibaraController @Inject() (
    val cache: AsyncCacheApi,
    val controllerComponents: ControllerComponents,
    val config: Configuration
) extends BaseController {
  def refreshCapibaraFile(token: Option[String]) = Action {
    implicit request: Request[AnyContent] =>
      {
        if (token.isDefined) {
          if (
            token.get == config.get[String]("capibara.capibaraFileRefreshToken")
          ) {
            val value = cache.remove("capibara.json")
            Ok("success")
          } else {
            Unauthorized("bad token provided")
          }
        } else {
          BadRequest("no token provided")
        }
      }
  }

  def headers() = Action { implicit request: Request[AnyContent] =>
    {
      val document = getDocument

      val json = Json.toJson(document.headers)
      Ok(json)
    }
  }

  def search(term: Option[String]) = Action {
    implicit request: Request[AnyContent] =>
      {
        if (term.isDefined) {
          val document = getDocument

          val functions =
            document.functions.filter(x => x.name.contains(term.getOrElse("")))

          val json = Json.toJson(SearchResult(functions))
          Ok(json)
        } else {
          BadRequest("query parameter term is not defined.")
        }
      }
  }

  def definition(ref: String) = Action {
    implicit request: Request[AnyContent] =>
      {
        val document = getDocument

        val header =
          document.headers.find(x => x.ref == ref)

        if (header.isDefined) {
          val functions =
            document.functions.filter(x => x.header.ref == header.get.ref);

          val headerDetail = HeaderDetail(
            header.get.ref,
            header.get.name,
            header.get.os_affinity,
            functions
          )

          val data = RefResult(
            "header",
            Some(headerDetail),
            None
          )

          val json = Json.toJson(data)

          Ok(json)
        } else {
          val function =
            document.functions.find(x => ref == x.header.ref + "/" + x.name);

          if (function.isDefined) {
            val data = RefResult(
              "function",
              None,
              function
            )

            val json = Json.toJson(data)

            Ok(json)
          } else {
            NotFound("Definition not found.")
          }
        }
      }
  }

  def getCapibaraFile() = Action { implicit request: Request[AnyContent] =>
    {
      val document = getDocument

      val json = Json.toJson(document)
      Ok(json)
    }
  }

  def getDocument(): CapibaraDocument = {
    val documentFuture: Future[CapibaraDocument] =
      cache.getOrElseUpdate[CapibaraDocument]("capibara.json") {
        val bufferedSource =
          scala.io.Source.fromFile(
            config.get[String]("capibara.capibaraFilePath")
          )
        val data = bufferedSource.getLines.mkString
        bufferedSource.close

        val json: JsValue = Json.parse(data)

        val result: JsResult[CapibaraDocument] =
          json.validate[CapibaraDocument]

        implicit val ec: scala.concurrent.ExecutionContext =
          scala.concurrent.ExecutionContext.global

        Future.successful(
          result.get
        )
      }

    val maxWaitTime: scala.concurrent.duration.FiniteDuration =
      scala.concurrent.duration.Duration(5, TimeUnit.SECONDS)

    val document: CapibaraDocument =
      scala.concurrent.Await.result(documentFuture, maxWaitTime)

    document
  }
}
