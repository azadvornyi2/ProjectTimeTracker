using common.tracker.ResponseBuilder.Contracts;
using common.tracker.WebApi;
using common.tracker.WebApi.RoutingConfiguration.Maps;
using domain.tracker.Entitites.TimeTracking;
using Microsoft.AspNetCore.Mvc;
using service.tracker.Services.TimeTracking.Contracts;
using System.Net;

namespace data.tracker.Controllers.TimeTracking
{
    [AssignControllerRoute(WebApiEnvironment.CURRENT, WebApiVersion.API_VERSION, ApplicationSegments.TIME_TRACKING)]
    public sealed class TimeTrackingController : WebApiControllerBase
    {
        private readonly ITimeTrackingService _timeTrackingService;
        public TimeTrackingController(IResponseFactory responseFactory, ITimeTrackingService timeTrackingService) : base(responseFactory)
        {
            _timeTrackingService = timeTrackingService;
        }

        [HttpPost]
        [AssignActionRoute(TimeTrackingSegments.REGISTER)]
        public async Task<IActionResult> RegisterHours([FromBody] TimeRegister time)
        {
            try
            {
                return Ok(SuccessResponseBody(await _timeTrackingService.Register(time)));
            }
            catch (Exception ex)
            {
                Logger.Log(NLog.LogLevel.Error, ex.Message);
                return BadRequest(ErrorResponseBody(ex.Message, HttpStatusCode.BadRequest));
            }
        }
        [HttpPost]
        [AssignActionRoute(TimeTrackingSegments.UPDATE)]
        public async Task<IActionResult> Update([FromBody] TimeRegister time)
        {
            try
            {
                return Ok(SuccessResponseBody(await _timeTrackingService.Update(time)));
            }
            catch (Exception ex)
            {
                Logger.Log(NLog.LogLevel.Error, ex.Message);
                return BadRequest(ErrorResponseBody(ex.Message, HttpStatusCode.BadRequest));
            }
        }

        [HttpGet]
        [AssignActionRoute(TimeTrackingSegments.GET_BY_NET_ID)]
        public async Task<IActionResult> Get([FromQuery] Guid netId)
        {
            try
            {
                return Ok(SuccessResponseBody(await _timeTrackingService.Get(netId)));
            }
            catch (Exception ex)
            {
                Logger.Log(NLog.LogLevel.Error, ex.Message);
                return BadRequest(ErrorResponseBody(ex.Message, HttpStatusCode.BadRequest));
            }
        }

        [HttpGet]
        [AssignActionRoute(TimeTrackingSegments.GET_ALL)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(SuccessResponseBody(await _timeTrackingService.GetAll()));
            }
            catch (Exception ex)
            {
                Logger.Log(NLog.LogLevel.Error, ex.Message);
                return BadRequest(ErrorResponseBody(ex.Message, HttpStatusCode.BadRequest));
            }
        }

        [HttpPost]
        [AssignActionRoute(TimeTrackingSegments.REMOVE)]
        public async Task<IActionResult> Remove([FromQuery] Guid netId)
        {
            try
            {
                await _timeTrackingService.Remove(netId);

                return Ok(SuccessResponseBody(NoContent()));
            }
            catch (Exception ex) 
            {
                Logger.Log(NLog.LogLevel.Error, ex.Message);
                return BadRequest(ErrorResponseBody(ex.Message, HttpStatusCode.BadRequest));
            }
        }

    }
}
