using Api.Features.SMS.Models;
using Api.Features.SMS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.SMS.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SMSController : ControllerBase
{
    private readonly ISMSService _smsService;

    public SMSController(ISMSService smsService)
    {
        _smsService = smsService;
    }

    [HttpPost("send")]
    public async Task<ActionResult<SendSMSResponse>> SendSMS([FromBody] SendSMSRequest request)
    {
        var response = await _smsService.SendSMSAsync(request);
        return Ok(response);
    }
} 