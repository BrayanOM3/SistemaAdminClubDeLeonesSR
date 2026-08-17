using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SA.ClubDeLeones.Application.Dtos.Campanas;
using SA.ClubDeLeones.Application.Interfaces.Servicios;

namespace SA.ClubDeLeones.WebApi.Controllers.v1;

[ApiController]
[Route("api/v1/campanas")]
[Authorize]
public class CampanasController : ControllerBase
{
    private readonly ICampanaServicio _servicio;

    public CampanasController(ICampanaServicio servicio)
    {
        _servicio = servicio;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<CampanaDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> ObtenerTodos()
    {
        var resultado = await _servicio.ObtenerTodosAsync();
        return Ok(resultado);
    }

    [HttpGet("activas")]
    [ProducesResponseType(typeof(IReadOnlyList<CampanaDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> ObtenerActivas()
    {
        var resultado = await _servicio.ObtenerActivasAsync();
        return Ok(resultado);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(CampanaDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ObtenerPorId(Guid id)
    {
        var resultado = await _servicio.ObtenerPorIdAsync(id);
        if (resultado == null)
            return NotFound();

        return Ok(resultado);
    }

    [HttpGet("{id:guid}/monto-recaudado")]
    [ProducesResponseType(typeof(decimal), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ObtenerMontoRecaudado(Guid id)
    {
        var monto = await _servicio.ObtenerMontoRecaudadoAsync(id);
        return Ok(monto);
    }

    [HttpPost]
    [ProducesResponseType(typeof(CampanaDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Crear([FromBody] CrearCampanaDto dto)
    {
        var resultado = await _servicio.CrearAsync(dto);
        return CreatedAtAction(nameof(ObtenerPorId), new { id = resultado.Id }, resultado);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(CampanaDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Actualizar(Guid id, [FromBody] ActualizarCampanaDto dto)
    {
        var resultado = await _servicio.ActualizarAsync(id, dto);
        return Ok(resultado);
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Eliminar(Guid id)
    {
        var eliminado = await _servicio.EliminarAsync(id);
        if (!eliminado)
            return NotFound();

        return NoContent();
    }
}