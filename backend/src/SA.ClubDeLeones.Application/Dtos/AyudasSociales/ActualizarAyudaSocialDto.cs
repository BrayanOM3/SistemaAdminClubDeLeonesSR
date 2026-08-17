using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.AyudasSociales;

public record ActualizarAyudaSocialDto(
    Guid BeneficiarioId,
    TipoAyuda Tipo,
    string Descripcion,
    DateTime FechaEntrega,
    decimal? Monto = null,
    Guid? CampanaId = null,
    Guid? VoluntarioId = null,
    EstadoAyuda Estado = EstadoAyuda.Pendiente
);