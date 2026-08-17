using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SA.ClubDeLeones.Domain.Entidades;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Configuraciones;

public class DonacionConfiguracion : IEntityTypeConfiguration<Donacion>
{
    public void Configure(EntityTypeBuilder<Donacion> builder)
    {
        builder.ToTable("Donaciones");

        builder.HasKey(d => d.Id);

        builder.Property(d => d.DonanteNombre)
            .IsRequired()
            .HasMaxLength(120);

        builder.Property(d => d.Tipo)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(d => d.Monto)
            .HasColumnType("decimal(12,2)");

        builder.Property(d => d.Descripcion)
            .HasMaxLength(500);

        builder.Property(d => d.Fecha)
            .IsRequired();

        builder.Property(d => d.ReciboNumero)
            .HasMaxLength(50);

        builder.Property(d => d.CampanaId);

        builder.Property(d => d.VoluntarioId);

        builder.Property(d => d.FechaCreacion)
            .IsRequired();

        builder.Property(d => d.FechaActualizacion)
            .IsRequired();

        // Relaciones
        builder.HasOne(d => d.Campana)
            .WithMany(c => c.Donaciones)
            .HasForeignKey(d => d.CampanaId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(d => d.Voluntario)
            .WithMany(v => v.DonacionesRegistradas)
            .HasForeignKey(d => d.VoluntarioId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}