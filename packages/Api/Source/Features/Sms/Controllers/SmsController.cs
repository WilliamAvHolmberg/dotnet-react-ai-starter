using Api.Features.Sms.Models;
using Api.Features.Sms.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SoftAI.Features.Sms.Models;

namespace Api.Features.Sms.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SmsController : ControllerBase
{
    private readonly SmsService _smsService;
    private readonly ClaudeService _claudeService;

    public SmsController(SmsService smsService, ClaudeService claudeService)
    {
        _smsService = smsService;
        _claudeService = claudeService;
    }

    [HttpPost("send")]
    [AllowAnonymous]
    public async Task<ActionResult<SendSmsResponseDto>> SendSms(SendSmsRequestDto request)
    {
        var response = await _smsService.SendSmsAsync(request);
        return Ok(response);
    }

    [HttpGet("history")]
    [AllowAnonymous]
    public async Task<ActionResult<List<SmsMessageResponseDto>>> GetSmsHistory()
    {
        var messages = await _smsService.GetSmsHistoryAsync();
        return Ok(messages);
    }

    [HttpPost("improve")]
    [AllowAnonymous]
    public async Task<ActionResult<SmsImproveResponseDTO>> ImproveMessage([FromBody] SmsImproveRequestDTO request)
    {
        try
        {
            var improvements = await _claudeService.GetMessageImprovementsAsync(request.CurrentMessage);
            return Ok(improvements);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to get message improvements", details = ex.Message });
        }
    }
}