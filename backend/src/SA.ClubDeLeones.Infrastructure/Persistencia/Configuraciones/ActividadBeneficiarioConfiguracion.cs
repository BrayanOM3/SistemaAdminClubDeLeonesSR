using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SA.ClubDeLeones.Domain.Entidades.Relaciones;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Configuraciones;

public class ActividadBeneficiarioConfiguracion : IEntityTypeConfiguration<ActividadBeneficiario>
{
    public void Configure(EntityTypeBuilder<ActividadBeneficiario> builder)
    {
        builder.ToTable("ActividadBeneficiarios");

        builder.HasKey(ab => new { ab.ActividadId, ab.BeneficiarioId });

        builder.Property(ab => ab.ActividadId)
            .IsRequired();

        builder.Property(ab => ab.BeneficiarioId)
            .IsRequired();

        builder.Property(ab => ab.FechaAsistencia)
            .IsRequired();

        builder.Property(ab => ab.Asistio)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(ab => ab.Observaciones)
            .HasMaxLength(500);

        builder.Property(ab => ab.FechaCreacion)
            .IsRequired();

        builder.Property(ab => ab.FechaActualizacion)
            .IsRequired(false);

        // Relaciones
        builder.HasOne(ab => ab.Actividad)
            .WithMany(a => a.Beneficiarios)
            .HasForeignKey(ab => ab.ActividadId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(ab => ab.Beneficiario)
            .WithMany(b => b.Actividades)
            .HasForeignKey(ab => ab.BeneficiarioId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}