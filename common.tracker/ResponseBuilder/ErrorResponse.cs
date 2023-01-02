using common.tracker.ResponseBuilder.Contracts;
using System.Net;

namespace common.tracker.ResponseBuilder
{
    public sealed class ErrorResponse : IWebResponse
    {
        public object Body { get; set; }

        public string Message { get; set; }

        public HttpStatusCode StatusCode { get; set; }
    }
}
