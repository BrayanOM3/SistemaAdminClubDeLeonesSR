using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Actividades;

public record ActualizarActividadDto(
    string Nombre,
    string Descripcion,
    TipoActividad Tipo,
    DateTime Fecha,
    string? Lugar = null,
    Guid? CampanaId = null
);