using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SA.ClubDeLeones.Domain.Entidades;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Configuraciones;

public class CampanaConfiguracion : IEntityTypeConfiguration<Campana>
{
    public void Configure(EntityTypeBuilder<Campana> builder)
    {
        builder.ToTable("Campanas");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Nombre)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(c => c.Descripcion)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(c => c.FechaInicio)
            .IsRequired()
            .HasColumnType("date");

        builder.Property(c => c.FechaFin)
            .HasColumnType("date");

        builder.Property(c => c.ObjetivoMonto)
            .HasColumnType("decimal(12,2)");

        builder.Property(c => c.Estado)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(c => c.Tipo)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(c => c.FechaCreacion)
            .IsRequired();

        builder.Property(c => c.FechaActualizacion)
            .IsRequired(false);

        // Relaciones
        builder.HasMany(c => c.Donaciones)
            .WithOne(d => d.Campana)
            .HasForeignKey(d => d.CampanaId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(c => c.AyudasGeneradas)
            .WithOne(a => a.Campana)
            .HasForeignKey(a => a.CampanaId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(c => c.Beneficiarios)
            .WithOne(cb => cb.Campana)
            .HasForeignKey(cb => cb.CampanaId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Voluntarios)
            .WithOne(cv => cv.Campana)
            .HasForeignKey(cv => cv.CampanaId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Actividades)
            .WithOne(a => a.Campana)
            .HasForeignKey(a => a.CampanaId)
            .OnDelete(DeleteBehavior.SetNull);

        // Ignorar propiedad calculada
        builder.Ignore(c => c.MontoRecaudado);
    }
}