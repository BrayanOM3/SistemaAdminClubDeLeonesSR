using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SA.ClubDeLeones.Application.Dtos.Voluntarios;
using SA.ClubDeLeones.Application.Interfaces.Servicios;

namespace SA.ClubDeLeones.WebApi.Controllers.v1;

[ApiController]
[Route("api/v1/voluntarios")]
[Authorize]
public class VoluntariosController : ControllerBase
{
    private readonly IVoluntarioServicio _servicio;

    public VoluntariosController(IVoluntarioServicio servicio)
    {
        _servicio = servicio;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<VoluntarioDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> ObtenerTodos()
    {
        var resultado = await _servicio.ObtenerTodosAsync();
        return Ok(resultado);
    }

    [HttpGet("activos")]
    [ProducesResponseType(typeof(IReadOnlyList<VoluntarioDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> ObtenerActivos()
    {
        var resultado = await _servicio.ObtenerActivosAsync();
        return Ok(resultado);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(VoluntarioDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ObtenerPorId(Guid id)
    {
        var resultado = await _servicio.ObtenerPorIdAsync(id);
        if (resultado == null)
            return NotFound();

        return Ok(resultado);
    }

    [HttpPost]
    [ProducesResponseType(typeof(VoluntarioDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Crear([FromBody] CrearVoluntarioDto dto)
    {
        var resultado = await _servicio.CrearAsync(dto);
        return CreatedAtAction(nameof(ObtenerPorId), new { id = resultado.Id }, resultado);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(VoluntarioDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Actualizar(Guid id, [FromBody] ActualizarVoluntarioDto dto)
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