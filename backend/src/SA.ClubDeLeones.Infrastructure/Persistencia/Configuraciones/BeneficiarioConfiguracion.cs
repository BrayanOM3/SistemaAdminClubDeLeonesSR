using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SA.ClubDeLeones.Domain.Entidades;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Configuraciones;

public class BeneficiarioConfiguracion : IEntityTypeConfiguration<Beneficiario>
{
    public void Configure(EntityTypeBuilder<Beneficiario> builder)
    {
        builder.ToTable("Beneficiarios");

        builder.HasKey(b => b.Id);

        builder.Property(b => b.NombreCompleto)
            .IsRequired()
            .HasMaxLength(120);

        builder.Property(b => b.Cedula)
            .IsRequired()
            .HasMaxLength(20);

        builder.HasIndex(b => b.Cedula)
            .IsUnique();

        builder.Property(b => b.FechaNacimiento)
            .HasColumnType("date");

        builder.Property(b => b.Telefono)
            .HasMaxLength(20);

        builder.Property(b => b.Correo)
            .HasMaxLength(100);

        builder.Property(b => b.Direccion)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(b => b.EstadoCivil)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(b => b.SituacionNecesidad)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(b => b.FechaCreacion)
            .IsRequired();

        builder.Property(b => b.FechaActualizacion)
            .IsRequired(false);

        builder.Property(b => b.Estado)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(b => b.Observaciones)
            .HasMaxLength(500);

        // Relaciones
        builder.HasMany(b => b.AyudasRecibidas)
            .WithOne(a => a.Beneficiario)
            .HasForeignKey(a => a.BeneficiarioId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(b => b.Campanas)
            .WithOne(cb => cb.Beneficiario)
            .HasForeignKey(cb => cb.BeneficiarioId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(b => b.Actividades)
            .WithOne(ab => ab.Beneficiario)
            .HasForeignKey(ab => ab.BeneficiarioId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}