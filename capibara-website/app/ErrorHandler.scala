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
        val appClass = this.getClass();
        val bufferedSource = appClass.getResourceAsStream("public/clientapp/index.html");
        val data = scala.io.Source.fromInputStream(bufferedSource).mkString
        bufferedSource.close
        Status(308)(data).as("text/html")
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
