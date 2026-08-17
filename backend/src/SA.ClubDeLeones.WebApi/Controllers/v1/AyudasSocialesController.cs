using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SA.ClubDeLeones.Application.Dtos.AyudasSociales;
using SA.ClubDeLeones.Application.Interfaces.Servicios;

namespace SA.ClubDeLeones.WebApi.Controllers.v1;

[ApiController]
[Route("api/v1/ayudas-sociales")]
[Authorize]
public class AyudasSocialesController : ControllerBase
{
    private readonly IAyudaSocialServicio _servicio;

    public AyudasSocialesController(IAyudaSocialServicio servicio)
    {
        _servicio = servicio;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<AyudaSocialDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> ObtenerTodos()
    {
        var resultado = await _servicio.ObtenerTodosAsync();
        return Ok(resultado);
    }

    [HttpGet("beneficiario/{beneficiarioId:guid}")]
    [ProducesResponseType(typeof(IReadOnlyList<AyudaSocialDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> ObtenerPorBeneficiario(Guid beneficiarioId)
    {
        var resultado = await _servicio.ObtenerPorBeneficiarioAsync(beneficiarioId);
        return Ok(resultado);
    }

    [HttpGet("campana/{campanaId:guid}")]
    [ProducesResponseType(typeof(IReadOnlyList<AyudaSocialDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> ObtenerPorCampana(Guid campanaId)
    {
        var resultado = await _servicio.ObtenerPorCampanaAsync(campanaId);
        return Ok(resultado);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(AyudaSocialDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ObtenerPorId(Guid id)
    {
        var resultado = await _servicio.ObtenerPorIdAsync(id);
        if (resultado == null)
            return NotFound();

        return Ok(resultado);
    }

    [HttpPost]
    [ProducesResponseType(typeof(AyudaSocialDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Crear([FromBody] CrearAyudaSocialDto dto)
    {
        var resultado = await _servicio.CrearAsync(dto);
        return CreatedAtAction(nameof(ObtenerPorId), new { id = resultado.Id }, resultado);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(AyudaSocialDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Actualizar(Guid id, [FromBody] ActualizarAyudaSocialDto dto)
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