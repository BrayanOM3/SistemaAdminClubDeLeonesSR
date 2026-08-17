using System.Collections.Generic;

namespace SA.ClubDeLeones.Application.Interfaces.Servicios;

public interface IServicioPdf
{
    byte[] GenerarReporteBeneficiarios(IEnumerable<object> datos, string titulo = "Reporte de Beneficiarios");
    byte[] GenerarReporteDonaciones(IEnumerable<object> datos, string titulo = "Reporte de Donaciones");
    byte[] GenerarReporteCampanas(IEnumerable<object> datos, string titulo = "Reporte de Campañas");
    byte[] GenerarReporteVoluntarios(IEnumerable<object> datos, string titulo = "Reporte de Voluntarios");
}