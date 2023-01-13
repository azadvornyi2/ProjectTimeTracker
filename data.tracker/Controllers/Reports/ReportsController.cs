using common.tracker.ResponseBuilder.Contracts;
using common.tracker.WebApi;
using common.tracker.WebApi.RoutingConfiguration.Maps;
using Microsoft.AspNetCore.Mvc;
using service.tracker.Services.Reports.Contracts;
using System.Net;

namespace data.tracker.Controllers.Reports
{
    [AssignControllerRoute(WebApiEnvironment.CURRENT, WebApiVersion.API_VERSION, ApplicationSegments.REPORTS)]
    public sealed class ReportsController : WebApiControllerBase
    {
        private readonly IReportService _reportService;
        public ReportsController(IResponseFactory responseFactory,
            IReportService reportService) : base(responseFactory)
        {
            _reportService = reportService;
        }

        [HttpGet]
        [AssignActionRoute(ReportsSegments.GET_ALL_PROJECT_HOURS)]
        public async Task<IActionResult> GetAllHoursByOneProject([FromQuery] Guid projectNetId)
        {
            try
            {
                string message = "Report generated successfully.";
                return Ok(SuccessResponseBody(await _reportService.OneProjectReport(projectNetId), message));
            }
            catch (Exception ex)
            {
                Logger.Log(NLog.LogLevel.Error, ex.Message);
                return BadRequest(ErrorResponseBody(ex.Message, HttpStatusCode.BadRequest));
            }
        }

        [HttpGet]
        [AssignActionRoute(ReportsSegments.GET_RANGE_PROJECT_HOURS)]
        public async Task<IActionResult> GetRangeHoursByOneProject([FromQuery] Guid projectNetId, DateTime start, DateTime end)
        {
            try
            {
                string message = "Report generated successfully.";
                return Ok(SuccessResponseBody(await _reportService.OneProjectReportWithTimeFrames(projectNetId, start, end), message));
            }
            catch (Exception ex)
            {
                Logger.Log(NLog.LogLevel.Error, ex.Message);
                return BadRequest(ErrorResponseBody(ex.Message, HttpStatusCode.BadRequest));
            }
        }

        [HttpGet]
        [AssignActionRoute(ReportsSegments.GET_RANGE_HOURS)]
        public async Task<IActionResult> GetRangeHours([FromQuery] DateTime start, DateTime end)
        {
            try
            {
                string message = "Report generated successfully."; 
                return Ok(SuccessResponseBody(await _reportService.ReportWithTimeFrames(start, end), message));
            }
            catch (Exception ex)
            {
                Logger.Log(NLog.LogLevel.Error, ex.Message);
                return BadRequest(ErrorResponseBody(ex.Message, HttpStatusCode.BadRequest));
            }
        }
    }
}
