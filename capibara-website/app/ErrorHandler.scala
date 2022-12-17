import play.api.http.HttpErrorHandler
import play.controllers.AssetsComponents
import play.api.mvc._
import play.api.mvc.Results._
import scala.concurrent._
import javax.inject.Singleton

@Singleton
class ErrorHandler extends HttpErrorHandler {
  def onClientError(
      request: RequestHeader,
      statusCode: Int,
      message: String
  ): Future[Result] = {
    Future.successful(
      if (statusCode != 404) {
        Status(statusCode)("A client error occurred: " + message)
      } else {
        val bufferedSource =
          scala.io.Source.fromFile("./public/clientapp/build/index.html")
        val data = bufferedSource.getLines.mkString
        bufferedSource.close
        Status(statusCode)(data).as("text/html")
      }
    )
  }

  def onServerError(
      request: RequestHeader,
      exception: Throwable
  ): Future[Result] = {
    Future.successful(
      InternalServerError("A server error occurred: " + exception.getMessage)
    )
  }
}
