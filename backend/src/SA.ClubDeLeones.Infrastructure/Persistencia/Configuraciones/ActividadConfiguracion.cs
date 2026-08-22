using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SA.ClubDeLeones.Domain.Entidades;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Configuraciones;

public class ActividadConfiguracion : IEntityTypeConfiguration<Actividad>
{
    public void Configure(EntityTypeBuilder<Actividad> builder)
    {
        builder.ToTable("Actividades");

        builder.HasKey(a => a.Id);

        builder.Property(a => a.Nombre)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(a => a.Descripcion)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(a => a.Tipo)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(a => a.Fecha)
            .IsRequired();

        builder.Property(a => a.Lugar)
            .HasMaxLength(200);

        builder.Property(a => a.CampanaId);

        builder.Property(a => a.FechaCreacion)
            .IsRequired();

        builder.Property(a => a.FechaActualizacion)
            .IsRequired(false);

        // Relaciones
        builder.HasOne(a => a.Campana)
            .WithMany(c => c.Actividades)
            .HasForeignKey(a => a.CampanaId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(a => a.Beneficiarios)
            .WithOne(ab => ab.Actividad)
            .HasForeignKey(ab => ab.ActividadId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(a => a.Voluntarios)
            .WithOne(av => av.Actividad)
            .HasForeignKey(av => av.ActividadId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}