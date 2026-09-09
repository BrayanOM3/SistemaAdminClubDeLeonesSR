using SA.ClubDeLeones.Application.Dtos.AyudasSociales;
using SA.ClubDeLeones.Application.Dtos.Calendario;
using SA.ClubDeLeones.Application.Dtos.Donaciones;

namespace SA.ClubDeLeones.Application.Interfaces.Servicios;

public interface ICalendarioServicio
{
    Task<IReadOnlyList<EventoCalendarioDto>> ObtenerAsync(DateOnly desde, DateOnly hasta);
    Task<IReadOnlyList<DonacionDto>> ObtenerDonacionesPorDiaAsync(DateOnly fecha);
    Task<IReadOnlyList<AyudaSocialDto>> ObtenerAyudasSocialesPorDiaAsync(DateOnly fecha);
}