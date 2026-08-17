using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SA.ClubDeLeones.Domain.Entidades.Relaciones;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Configuraciones;

public class CampanaBeneficiarioConfiguracion : IEntityTypeConfiguration<CampanaBeneficiario>
{
    public void Configure(EntityTypeBuilder<CampanaBeneficiario> builder)
    {
        builder.ToTable("CampanaBeneficiarios");

        builder.HasKey(cb => new { cb.CampanaId, cb.BeneficiarioId });

        builder.HasOne(cb => cb.Campana)
            .WithMany(c => c.Beneficiarios)
            .HasForeignKey(cb => cb.CampanaId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(cb => cb.Beneficiario)
            .WithMany(b => b.Campanas)
            .HasForeignKey(cb => cb.BeneficiarioId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
