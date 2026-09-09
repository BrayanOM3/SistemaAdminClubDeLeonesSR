using SA.ClubDeLeones.Application.Dtos.AyudasSociales;
using SA.ClubDeLeones.Application.Dtos.Beneficiarios;
using SA.ClubDeLeones.Application.Dtos.Campanas;
using SA.ClubDeLeones.Application.Dtos.Donaciones;
using SA.ClubDeLeones.Application.Dtos.Voluntarios;
using SA.ClubDeLeones.Application.Dtos.Actividades;
using System.Collections.Generic;

namespace SA.ClubDeLeones.Application.Interfaces.Servicios;

public interface IServicioExcel
{
    byte[] GenerarReporteBeneficiarios(IEnumerable<BeneficiarioDto> datos);
    byte[] GenerarReporteDonaciones(IEnumerable<DonacionDto> datos);
    byte[] GenerarReporteCampanas(IEnumerable<CampanaDto> datos);
    byte[] GenerarReporteVoluntarios(IEnumerable<VoluntarioDto> datos);
    byte[] GenerarReporteAyudasSociales(IEnumerable<AyudaSocialDto> datos);
    byte[] GenerarReporteActividades(IEnumerable<ActividadDto> datos);
}