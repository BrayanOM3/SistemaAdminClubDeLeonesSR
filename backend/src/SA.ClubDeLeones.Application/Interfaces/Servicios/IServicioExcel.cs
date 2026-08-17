using System.Collections.Generic;

namespace SA.ClubDeLeones.Application.Interfaces.Servicios;

public interface IServicioExcel
{
    byte[] GenerarReporteBeneficiarios(IEnumerable<object> datos);
    byte[] GenerarReporteDonaciones(IEnumerable<object> datos);
    byte[] GenerarReporteCampanas(IEnumerable<object> datos);
    byte[] GenerarReporteVoluntarios(IEnumerable<object> datos);
}
