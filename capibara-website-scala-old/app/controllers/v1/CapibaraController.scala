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
import dtos._

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

          val macros =
            document.macros.filter(x => x.name.contains(term.getOrElse("")))

          val enums =
            document.enums.filter(x => x.name.contains(term.getOrElse("")))

          val structs =
            document.structs.filter(x => x.name.contains(term.getOrElse("")))

          val typedefs =
            document.typedefs.filter(x => x.name.contains(term.getOrElse("")))

          val functions =
            document.functions.filter(x => x.name.contains(term.getOrElse("")))

          val json = Json.toJson(
            SearchResult(macros, enums, structs, typedefs, functions)
          )
          Ok(json)
        } else {
          BadRequest("query parameter term is not defined.")
        }
      }
  }

  def definition(ref: String) = Action {
    implicit request: Request[AnyContent] =>
      {
        var returnable: Option[Result] = None

        val document = getDocument

        val header =
          document.headers.find(x => x.ref == ref)

        if (header.isDefined) {
          val macros =
            document.macros.filter(x => x.header.ref == header.get.ref)

          val enums =
            document.enums.filter(x => x.header.ref == header.get.ref)

          val structs =
            document.structs.filter(x => x.header.ref == header.get.ref)

          val typedefs =
            document.typedefs.filter(x => x.header.ref == header.get.ref)

          val functions =
            document.functions.filter(x => x.header.ref == header.get.ref)

          val headerDetail = HeaderDetail(
            header.get.ref,
            header.get.name,
            header.get.summary,
            header.get.os_affinity,
            macros,
            enums,
            structs,
            typedefs,
            functions
          )

          val data = RefResult(
            Some(headerDetail)
          )

          val json = Json.toJson(data)

          returnable = Some(Ok(json))

        }

        if (returnable.isEmpty) {
          val `macro` =
            document.macros.find(x => ref == x.header.ref + "/" + x.name);

          if (`macro`.isDefined) {
            val data = RefResult(
              `macro` = `macro`
            )

            val json = Json.toJson(data)

            returnable = Some(Ok(json))
          }
        }

        if (returnable.isEmpty) {
          val `enum` =
            document.enums.find(x => ref == x.header.ref + "/" + x.name);

          if (`enum`.isDefined) {
            val data = RefResult(
              `enum` = `enum`
            )

            val json = Json.toJson(data)

            returnable = Some(Ok(json))
          }
        }

        if (returnable.isEmpty) {
          val struct =
            document.structs.find(x => ref == x.header.ref + "/" + x.name);

          if (struct.isDefined) {
            val data = RefResult(
              struct = struct
            )

            val json = Json.toJson(data)

            returnable = Some(Ok(json))
          }
        }

        if (returnable.isEmpty) {
          val typedef =
            document.typedefs.find(x => ref == x.header.ref + "/" + x.name);

          if (typedef.isDefined) {
            val data = RefResult(
              typedef = typedef
            )

            val json = Json.toJson(data)

            returnable = Some(Ok(json))
          }
        }

        if (returnable.isEmpty) {
          val function =
            document.functions.find(x => ref == x.header.ref + "/" + x.name);

          if (function.isDefined) {
            val data = RefResult(
              function = function
            )

            val json = Json.toJson(data)

            returnable = Some(Ok(json))
          }
        }

        if (returnable.isDefined) {
          returnable.get
        } else {
          NotFound("definition not found.")
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

  def getDocument: CapibaraDocument = {
    val documentFuture: Future[CapibaraDocument] =
      cache.getOrElseUpdate[CapibaraDocument]("capibara.json") {
        val bufferedSource =
          scala.io.Source.fromFile(
            config.get[String]("capibara.capibaraFilePath")
          )
        val data = bufferedSource.getLines().mkString
        bufferedSource.close

        val json: JsValue = Json.parse(data)

        val result: JsResult[CapibaraDocument] =
          json.validate[CapibaraDocument]

        implicit val ec: scala.concurrent.ExecutionContext =
          scala.concurrent.ExecutionContext.global

        if (result.isError) {
          println(result)
        }

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
