using Microsoft.AspNetCore.Mvc;

namespace common.tracker.WebApi
{
    public sealed class AssignActionRouteAttribute : RouteAttribute
    {
        public AssignActionRouteAttribute(string template) : base(template) { }
    }
}
