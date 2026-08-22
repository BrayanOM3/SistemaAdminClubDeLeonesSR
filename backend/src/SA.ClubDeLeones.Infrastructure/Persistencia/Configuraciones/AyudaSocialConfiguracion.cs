using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SA.ClubDeLeones.Domain.Entidades;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Configuraciones;

public class AyudaSocialConfiguracion : IEntityTypeConfiguration<AyudaSocial>
{
    public void Configure(EntityTypeBuilder<AyudaSocial> builder)
    {
        builder.ToTable("AyudasSociales");

        builder.HasKey(a => a.Id);

        builder.Property(a => a.BeneficiarioId)
            .IsRequired();

        builder.Property(a => a.Tipo)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(a => a.Descripcion)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(a => a.Monto)
            .HasColumnType("decimal(12,2)");

        builder.Property(a => a.FechaEntrega)
            .IsRequired();

        builder.Property(a => a.CampanaId);

        builder.Property(a => a.VoluntarioId);

        builder.Property(a => a.FechaCreacion)
            .IsRequired();

        builder.Property(a => a.FechaActualizacion)
            .IsRequired(false);

        builder.Property(a => a.Estado)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        // Relaciones
        builder.HasOne(a => a.Beneficiario)
            .WithMany(b => b.AyudasRecibidas)
            .HasForeignKey(a => a.BeneficiarioId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.Campana)
            .WithMany(c => c.AyudasGeneradas)
            .HasForeignKey(a => a.CampanaId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(a => a.Voluntario)
            .WithMany(v => v.AyudasEntregadas)
            .HasForeignKey(a => a.VoluntarioId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}