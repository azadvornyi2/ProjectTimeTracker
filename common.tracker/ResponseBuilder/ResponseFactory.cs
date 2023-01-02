using common.tracker.ResponseBuilder.Contracts;

namespace common.tracker.ResponseBuilder
{
    public sealed class ResponseFactory : IResponseFactory
    {
        public IWebResponse GetSuccessResponse()
        {
            return new SuccessResponse();
        }

        public IWebResponse GetErrorResponse()
        {
            return new ErrorResponse();
        }
    }
}
