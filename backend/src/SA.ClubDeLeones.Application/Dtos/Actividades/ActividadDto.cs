using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Actividades;

public record ActividadDto(
    Guid Id,
    string Nombre,
    string Descripcion,
    TipoActividad Tipo,
    DateTime Fecha,
    string? Lugar,
    Guid? CampanaId,
    string? NombreCampana
);