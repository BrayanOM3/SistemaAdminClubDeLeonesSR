using SA.ClubDeLeones.Domain.Common;
using SA.ClubDeLeones.Domain.Enums;
using SA.ClubDeLeones.Domain.Entidades.Relaciones;

namespace SA.ClubDeLeones.Domain.Entidades;

public class Actividad : EntidadBase
{
    public string Nombre { get; private set; } = string.Empty;
    public string Descripcion { get; private set; } = string.Empty;
    public TipoActividad Tipo { get; private set; }
    public DateTime Fecha { get; private set; }
    public string? Lugar { get; private set; }
    public Guid? CampanaId { get; private set; }

    // Relaciones
    public Campana? Campana { get; private set; }
    public ICollection<ActividadBeneficiario> Beneficiarios { get; private set; } = new List<ActividadBeneficiario>();
    public ICollection<ActividadVoluntario> Voluntarios { get; private set; } = new List<ActividadVoluntario>();

    protected Actividad()
    {
        Fecha = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
    }

    public Actividad(
        string nombre,
        string descripcion,
        TipoActividad tipo,
        DateTime fecha,
        string? lugar = null,
        Guid? campanaId = null)
    {
        Nombre = nombre;
        Descripcion = descripcion;
        Tipo = tipo;
        Fecha = fecha;
        Lugar = lugar;
        CampanaId = campanaId;
    }

    public void Actualizar(
        string nombre,
        string descripcion,
        TipoActividad tipo,
        DateTime fecha,
        string? lugar,
        Guid? campanaId)
    {
        Nombre = nombre;
        Descripcion = descripcion;
        Tipo = tipo;
        Fecha = fecha;
        Lugar = lugar;
        CampanaId = campanaId;
        MarcarActualizado();
    }
}