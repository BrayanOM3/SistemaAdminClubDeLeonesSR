namespace SA.ClubDeLeones.Application.Dtos.Calendario;

/// <summary>
/// Tipos de evento que unifica el calendario. Es una taxonomía de respuesta
/// (composición), no persiste en ninguna entidad de dominio.
/// </summary>
public enum TipoEventoCalendario
{
    Campana = 1,
    Actividad = 2,
    Donacion = 3,
    AyudaSocial = 4
}