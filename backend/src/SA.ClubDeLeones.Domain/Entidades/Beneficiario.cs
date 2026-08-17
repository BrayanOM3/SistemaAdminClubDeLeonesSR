using SA.ClubDeLeones.Domain.Common;
using SA.ClubDeLeones.Domain.Enums;
using SA.ClubDeLeones.Domain.Entidades.Relaciones;

namespace SA.ClubDeLeones.Domain.Entidades;

public class Beneficiario : EntidadBase
{
    public string NombreCompleto { get; private set; } = string.Empty;
    public string Cedula { get; private set; } = string.Empty;
    public DateOnly? FechaNacimiento { get; private set; }
    public string? Telefono { get; private set; }
    public string? Correo { get; private set; }
    public string Direccion { get; private set; } = string.Empty;
    public EstadoCivil EstadoCivil { get; private set; }
    public string SituacionNecesidad { get; private set; } = string.Empty;
    public EstadoBeneficiario Estado { get; private set; } = EstadoBeneficiario.Activo;
    public string? Observaciones { get; private set; }

    // Relaciones
    public ICollection<AyudaSocial> AyudasRecibidas { get; private set; } = new List<AyudaSocial>();
    public ICollection<CampanaBeneficiario> Campanas { get; private set; } = new List<CampanaBeneficiario>();
    public ICollection<ActividadBeneficiario> Actividades { get; private set; } = new List<ActividadBeneficiario>();

    // Constructor para EF Core
    private Beneficiario() { }

    public Beneficiario(
        string nombreCompleto,
        string cedula,
        string direccion,
        EstadoCivil estadoCivil,
        string situacionNecesidad,
        DateOnly? fechaNacimiento = null,
        string? telefono = null,
        string? correo = null,
        string? observaciones = null)
    {
        NombreCompleto = nombreCompleto;
        Cedula = cedula;
        Direccion = direccion;
        EstadoCivil = estadoCivil;
        SituacionNecesidad = situacionNecesidad;
        FechaNacimiento = fechaNacimiento;
        Telefono = telefono;
        Correo = correo;
        Observaciones = observaciones;
    }

    public void ActualizarDatos(
        string nombreCompleto,
        string cedula,
        string direccion,
        EstadoCivil estadoCivil,
        string situacionNecesidad,
        DateOnly? fechaNacimiento,
        string? telefono,
        string? correo,
        string? observaciones)
    {
        NombreCompleto = nombreCompleto;
        Cedula = cedula;
        Direccion = direccion;
        EstadoCivil = estadoCivil;
        SituacionNecesidad = situacionNecesidad;
        FechaNacimiento = fechaNacimiento;
        Telefono = telefono;
        Correo = correo;
        Observaciones = observaciones;
        MarcarActualizado();
    }

    public void CambiarEstado(EstadoBeneficiario estado)
    {
        Estado = estado;
        MarcarActualizado();
    }
}