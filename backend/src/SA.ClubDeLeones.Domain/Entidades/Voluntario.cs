using SA.ClubDeLeones.Domain.Common;
using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Domain.Entidades;

public class Voluntario : EntidadBase
{
    public string NombreCompleto { get; private set; } = string.Empty;
    public string Cedula { get; private set; } = string.Empty;
    public string? Telefono { get; private set; }
    public string? Correo { get; private set; }
    public DateOnly FechaIngreso { get; private set; }
    public string? Disponibilidad { get; private set; }
    public string? Especialidad { get; private set; }
    public EstadoUsuario Estado { get; private set; } = EstadoUsuario.Activo;

    // Relaciones
    public Usuario? Usuario { get; private set; }
    public ICollection<Donacion> DonacionesRegistradas { get; private set; } = new List<Donacion>();
    public ICollection<AyudaSocial> AyudasEntregadas { get; private set; } = new List<AyudaSocial>();
    public ICollection<CampanaVoluntario> Campanas { get; private set; } = new List<CampanaVoluntario>();
    public ICollection<ActividadVoluntario> Actividades { get; private set; } = new List<ActividadVoluntario>();

    private Voluntario() { }

    public Voluntario(
        string nombreCompleto,
        string cedula,
        DateOnly fechaIngreso,
        string? telefono = null,
        string? correo = null,
        string? disponibilidad = null,
        string? especialidad = null)
    {
        NombreCompleto = nombreCompleto;
        Cedula = cedula;
        FechaIngreso = fechaIngreso;
        Telefono = telefono;
        Correo = correo;
        Disponibilidad = disponibilidad;
        Especialidad = especialidad;
    }

    public void Actualizar(
        string nombreCompleto,
        string cedula,
        DateOnly fechaIngreso,
        string? telefono,
        string? correo,
        string? disponibilidad,
        string? especialidad,
        EstadoUsuario estado)
    {
        NombreCompleto = nombreCompleto;
        Cedula = cedula;
        FechaIngreso = fechaIngreso;
        Telefono = telefono;
        Correo = correo;
        Disponibilidad = disponibilidad;
        Especialidad = especialidad;
        Estado = estado;
        MarcarActualizado();
    }

    public void CambiarEstado(EstadoUsuario estado)
    {
        Estado = estado;
        MarcarActualizado();
    }
}