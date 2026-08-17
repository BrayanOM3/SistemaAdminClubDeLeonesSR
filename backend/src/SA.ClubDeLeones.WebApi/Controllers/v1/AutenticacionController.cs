using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SA.ClubDeLeones.Application.Dtos.Autenticacion;
using SA.ClubDeLeones.Application.Interfaces.Servicios;

namespace SA.ClubDeLeones.WebApi.Controllers.v1;

[ApiController]
[Route("api/v1/autenticacion")]
[AllowAnonymous]
public class AutenticacionController : ControllerBase
{
    private readonly IAutenticacionServicio _autenticacionServicio;

    public AutenticacionController(IAutenticacionServicio autenticacionServicio)
    {
        _autenticacionServicio = autenticacionServicio;
    }

    [HttpPost("login")]
    [ProducesResponseType(typeof(IniciarSesionRespuestaDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> IniciarSesion([FromBody] IniciarSesionRequestDto dto)
    {
        var resultado = await _autenticacionServicio.IniciarSesionAsync(dto);
        if (resultado == null)
            return Unauthorized(new { mensaje = "Credenciales inválidas" });

        return Ok(resultado);
    }

    [HttpGet("validar-token")]
    [Authorize]
    [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
    public async Task<IActionResult> ValidarToken()
    {
        var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        var esValido = await _autenticacionServicio.ValidarTokenAsync(token);
        return Ok(esValido);
    }
}