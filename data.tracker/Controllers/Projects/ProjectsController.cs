using common.tracker.ResponseBuilder.Contracts;
using common.tracker.WebApi;
using common.tracker.WebApi.RoutingConfiguration.Maps;
using domain.tracker.Entitites.Projects;
using Microsoft.AspNetCore.Mvc;
using service.tracker.Services.Projects.Contracts;
using System.Net;

namespace data.tracker.Controllers.Projects
{
    [AssignControllerRoute(WebApiEnvironment.CURRENT, WebApiVersion.API_VERSION, ApplicationSegments.PROJECTS)]

    public sealed class ProjectsController : WebApiControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IResponseFactory responseFactory,
            IProjectService projectService) : base(responseFactory)
        {
            _projectService = projectService;
        }

        [HttpPost]
        [AssignActionRoute(ProjectSegments.CREATE)]
        public async Task<IActionResult> Create([FromBody] Project project)
        {
            try
            {

                return Ok(SuccessResponseBody(await _projectService.Add(project),"Project successfuly created."));
            }
            catch (Exception ex)
            {
                Logger.Log(NLog.LogLevel.Error, ex.Message);
                return BadRequest(ErrorResponseBody(ex.Message, HttpStatusCode.BadRequest));
            }
        }

        [HttpPost]
        [AssignActionRoute(ProjectSegments.UPDATE)]
        public async Task<IActionResult> Update([FromBody] Project project)
        {
            string message = string.Empty;
            try
            {
                if (!project.Deleted) message = "Project successfuly updated.";
                else message = "Project successfuly deleted.";
                return Ok(SuccessResponseBody(await _projectService.Update(project), message));
            }
            catch (Exception ex)
            {
                Logger.Log(NLog.LogLevel.Error, ex.Message);
                return BadRequest(ErrorResponseBody(ex.Message, HttpStatusCode.BadRequest));
            }
        }

        [HttpPost]
        [AssignActionRoute(ProjectSegments.REMOVE)]
        public async Task<IActionResult> Delete([FromQuery] Guid netId)
        {
            try
            {
                await _projectService.Remove(netId);
                return Ok(SuccessResponseBody(NoContent()));
            }
            catch (Exception ex)
            {
                Logger.Log(NLog.LogLevel.Error, ex.Message);
                return BadRequest(ErrorResponseBody(ex.Message, HttpStatusCode.BadRequest));
            }
        }

        [HttpGet]
        [AssignActionRoute(ProjectSegments.GET_BY_NET_ID)]
        public async Task<IActionResult> Get([FromQuery] Guid netId)
        {
            try
            {
                return Ok(SuccessResponseBody(await _projectService.Get(netId)));
            }
            catch (Exception ex)
            {
                Logger.Log(NLog.LogLevel.Error, ex.Message);
                return BadRequest(ErrorResponseBody(ex.Message, HttpStatusCode.BadRequest));
            }
        }

        [HttpGet]
        [AssignActionRoute(ProjectSegments.GET_ALL)]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(SuccessResponseBody(await _projectService.GetAll()));
            }
            catch (Exception ex)
            {
                Logger.Log(NLog.LogLevel.Error, ex.Message);
                return BadRequest(ErrorResponseBody(ex.Message, HttpStatusCode.BadRequest));
            }
        }
    }
}
