using common.tracker.ResponseBuilder.Contracts;
using Microsoft.AspNetCore.Mvc;
using NLog;
using System.Net;

namespace common.tracker.WebApi
{
    public abstract class WebApiControllerBase : Controller
    {
        private readonly IResponseFactory _responseFactory;

        protected Logger Logger { get; set; }

        protected WebApiControllerBase(IResponseFactory responseFactory)
        {
            _responseFactory = responseFactory;

            Logger = LogManager.GetCurrentClassLogger();
        }

        protected IWebResponse SuccessResponseBody(object body, string message = "")
        {
            IWebResponse response = _responseFactory.GetSuccessResponse();

            response.Body = body;
            response.StatusCode = HttpStatusCode.OK;
            response.Message = message;

            return response;
        }

        protected IWebResponse ErrorResponseBody(string message, HttpStatusCode statusCode)
        {
            IWebResponse response = _responseFactory.GetErrorResponse();

            response.Message = message;
            response.StatusCode = statusCode;

            return response;
        }
    }
}
