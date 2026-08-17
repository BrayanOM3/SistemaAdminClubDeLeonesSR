using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.AyudasSociales;

public record AyudaSocialDto(
    Guid Id,
    Guid BeneficiarioId,
    string NombreBeneficiario,
    TipoAyuda Tipo,
    string Descripcion,
    decimal? Monto,
    DateTime FechaEntrega,
    Guid? CampanaId,
    string? NombreCampana,
    Guid? VoluntarioId,
    string? NombreVoluntario,
    EstadoAyuda Estado
);