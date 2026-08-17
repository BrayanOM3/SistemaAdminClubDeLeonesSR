using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SA.ClubDeLeones.Domain.Entidades.Relaciones;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Configuraciones;

public class ActividadVoluntarioConfiguracion : IEntityTypeConfiguration<ActividadVoluntario>
{
    public void Configure(EntityTypeBuilder<ActividadVoluntario> builder)
    {
        builder.ToTable("ActividadVoluntarios");

        builder.HasKey(av => new { av.ActividadId, av.VoluntarioId });

        builder.Property(av => av.ActividadId)
            .IsRequired();

        builder.Property(av => av.VoluntarioId)
            .IsRequired();

        builder.Property(av => av.FechaParticipacion)
            .IsRequired();

        builder.Property(av => av.RolEnActividad)
            .HasMaxLength(100);

        builder.Property(av => av.FechaCreacion)
            .IsRequired();

        builder.Property(av => av.FechaActualizacion)
            .IsRequired();

        // Relaciones
        builder.HasOne(av => av.Actividad)
            .WithMany(a => a.Voluntarios)
            .HasForeignKey(av => av.ActividadId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(av => av.Voluntario)
            .WithMany(v => v.Actividades)
            .HasForeignKey(av => av.VoluntarioId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}