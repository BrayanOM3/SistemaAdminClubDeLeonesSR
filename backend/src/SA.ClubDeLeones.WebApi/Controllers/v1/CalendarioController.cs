using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SA.ClubDeLeones.Application.Dtos.AyudasSociales;
using SA.ClubDeLeones.Application.Dtos.Calendario;
using SA.ClubDeLeones.Application.Dtos.Donaciones;
using SA.ClubDeLeones.Application.Interfaces.Servicios;

namespace SA.ClubDeLeones.WebApi.Controllers.v1;

[ApiController]
[Route("api/v1/calendario")]
[Authorize]
public class CalendarioController : ControllerBase
{
    private readonly ICalendarioServicio _servicio;

    public CalendarioController(ICalendarioServicio servicio) => _servicio = servicio;

    /// <summary>
    /// Vista unificada del calendario en el rango [desde, hasta]. Campañas y Actividades
    /// se listan una a una; Donaciones y Ayudas Sociales se agregan por día.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<EventoCalendarioDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ObtenerCalendario(
        [FromQuery] DateOnly? desde,
        [FromQuery] DateOnly? hasta)
    {
        if (desde is null || hasta is null)
            throw new ArgumentException("Los parámetros 'desde' y 'hasta' son obligatorios (formato yyyy-MM-dd).");

        var resultado = await _servicio.ObtenerAsync(desde.Value, hasta.Value);
        return Ok(resultado);
    }

    /// <summary>Detalle completo de las donaciones de un día específico.</summary>
    [HttpGet("{fecha}/donaciones")]
    [ProducesResponseType(typeof(IReadOnlyList<DonacionDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> ObtenerDonacionesDelDia(DateOnly fecha)
    {
        var resultado = await _servicio.ObtenerDonacionesPorDiaAsync(fecha);
        return Ok(resultado);
    }

    /// <summary>Detalle completo de las ayudas sociales de un día específico.</summary>
    [HttpGet("{fecha}/ayudas-sociales")]
    [ProducesResponseType(typeof(IReadOnlyList<AyudaSocialDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> ObtenerAyudasSocialesDelDia(DateOnly fecha)
    {
        var resultado = await _servicio.ObtenerAyudasSocialesPorDiaAsync(fecha);
        return Ok(resultado);
    }
}