using Microsoft.AspNetCore.Mvc;

namespace common.tracker.WebApi
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public sealed class AssignControllerRouteAttribute : RouteAttribute
    {
        /// <summary>
        ///     Web Api version.
        /// </summary>
        public string Version { get; }

        /// <summary>
        ///     Dev or release environment.
        /// </summary>
        public string Environment { get; }

        /// <summary>
        ///     ctor().
        /// </summary>
        /// <param name="environment">The environment.</param>
        /// <param name="version">The web api version.</param>
        /// <param name="template">The route template.</param>
        public AssignControllerRouteAttribute(string environment, int version, string template) :
            base($"{environment}/{BuildRouteVersion(version)}/{template}")
        {
            Version = BuildRouteVersion(version);
            Environment = environment;
        }

        private static string BuildRouteVersion(int number)
        {
            return $"v{number.ToString()}";
        }
    }
}
