using Microsoft.EntityFrameworkCore;
using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Entidades.Relaciones;
using SA.ClubDeLeones.Infrastructure.Persistencia.Configuraciones;

namespace SA.ClubDeLeones.Infrastructure.Persistencia;

public class AppDbContext : DbContext
{
    public DbSet<Beneficiario> Beneficiarios { get; set; } = null!;
    public DbSet<AyudaSocial> AyudasSociales { get; set; } = null!;
    public DbSet<Campana> Campanas { get; set; } = null!;
    public DbSet<Donacion> Donaciones { get; set; } = null!;
    public DbSet<Voluntario> Voluntarios { get; set; } = null!;
    public DbSet<Usuario> Usuarios { get; set; } = null!;
    public DbSet<Actividad> Actividades { get; set; } = null!;

    public DbSet<CampanaBeneficiario> CampanaBeneficiarios { get; set; } = null!;
    public DbSet<CampanaVoluntario> CampanaVoluntarios { get; set; } = null!;
    public DbSet<ActividadBeneficiario> ActividadBeneficiarios { get; set; } = null!;
    public DbSet<ActividadVoluntario> ActividadVoluntarios { get; set; } = null!;

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new BeneficiarioConfiguracion());
        modelBuilder.ApplyConfiguration(new AyudaSocialConfiguracion());
        modelBuilder.ApplyConfiguration(new CampanaConfiguracion());
        modelBuilder.ApplyConfiguration(new DonacionConfiguracion());
        modelBuilder.ApplyConfiguration(new VoluntarioConfiguracion());
        modelBuilder.ApplyConfiguration(new UsuarioConfiguracion());
        modelBuilder.ApplyConfiguration(new ActividadConfiguracion());

        modelBuilder.ApplyConfiguration(new CampanaBeneficiarioConfiguracion());
        modelBuilder.ApplyConfiguration(new CampanaVoluntarioConfiguracion());
        modelBuilder.ApplyConfiguration(new ActividadBeneficiarioConfiguracion());
        modelBuilder.ApplyConfiguration(new ActividadVoluntarioConfiguracion());

        // Configurar propiedad calculada para que no se mapee a BD
        modelBuilder.Entity<Campana>()
            .Ignore(c => c.MontoRecaudado);
    }
}