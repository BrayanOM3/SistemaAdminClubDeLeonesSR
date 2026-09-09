using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SA.ClubDeLeones.Application.Interfaces.Servicios;

namespace SA.ClubDeLeones.WebApi.Controllers.v1;

[ApiController]
[Route("api/v1/reportes")]
[Authorize]
public class ReportesController : ControllerBase
{
    private const string TipoContenidoExcel =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    private readonly IServicioExcel _servicioExcel;
    private readonly IBeneficiarioServicio _beneficiarios;
    private readonly IDonacionServicio _donaciones;
    private readonly ICampanaServicio _campanas;
    private readonly IVoluntarioServicio _voluntarios;
    private readonly IAyudaSocialServicio _ayudasSociales;
    private readonly IActividadServicio _actividades;

    public ReportesController(
        IServicioExcel servicioExcel,
        IBeneficiarioServicio beneficiarios,
        IDonacionServicio donaciones,
        ICampanaServicio campanas,
        IVoluntarioServicio voluntarios,
        IAyudaSocialServicio ayudasSociales,
        IActividadServicio actividades)
    {
        _servicioExcel = servicioExcel;
        _beneficiarios = beneficiarios;
        _donaciones = donaciones;
        _campanas = campanas;
        _voluntarios = voluntarios;
        _ayudasSociales = ayudasSociales;
        _actividades = actividades;
    }

    [HttpGet("beneficiarios")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DescargarBeneficiarios()
    {
        var datos = await _beneficiarios.ObtenerTodosAsync();
        return EntregarReporte(_servicioExcel.GenerarReporteBeneficiarios(datos), "beneficiarios");
    }

    [HttpGet("donaciones")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DescargarDonaciones()
    {
        var datos = await _donaciones.ObtenerTodosAsync();
        return EntregarReporte(_servicioExcel.GenerarReporteDonaciones(datos), "donaciones");
    }

    [HttpGet("campanas")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DescargarCampanas()
    {
        var datos = await _campanas.ObtenerTodosAsync();
        return EntregarReporte(_servicioExcel.GenerarReporteCampanas(datos), "campanas");
    }

    [HttpGet("voluntarios")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DescargarVoluntarios()
    {
        var datos = await _voluntarios.ObtenerTodosAsync();
        return EntregarReporte(_servicioExcel.GenerarReporteVoluntarios(datos), "voluntarios");
    }

    [HttpGet("ayudas-sociales")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DescargarAyudasSociales()
    {
        var datos = await _ayudasSociales.ObtenerTodosAsync();
        return EntregarReporte(_servicioExcel.GenerarReporteAyudasSociales(datos), "ayudasSociales");
    }

    [HttpGet("actividades")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DescargarActividades()
    {
        var datos = await _actividades.ObtenerTodosAsync();
        return EntregarReporte(_servicioExcel.GenerarReporteActividades(datos), "actividades");
    }

    private FileContentResult EntregarReporte(byte[] bytes, string nombre)
    {
        var fecha = DateTime.Now.ToString("yyyy-MM-dd");
        return File(bytes, TipoContenidoExcel, $"reporte-{nombre}-{fecha}.xlsx");
    }
}