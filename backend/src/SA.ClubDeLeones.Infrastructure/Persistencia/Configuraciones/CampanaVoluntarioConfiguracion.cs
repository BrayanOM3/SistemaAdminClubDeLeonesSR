using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SA.ClubDeLeones.Domain.Entidades.Relaciones;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Configuraciones;

public class CampanaVoluntarioConfiguracion : IEntityTypeConfiguration<CampanaVoluntario>
{
    public void Configure(EntityTypeBuilder<CampanaVoluntario> builder)
    {
        builder.ToTable("CampanaVoluntarios");

        builder.HasKey(cv => new { cv.CampanaId, cv.VoluntarioId });

        builder.HasOne(cv => cv.Campana)
            .WithMany(c => c.Voluntarios)
            .HasForeignKey(cv => cv.CampanaId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(cv => cv.Voluntario)
            .WithMany(v => v.Campanas)
            .HasForeignKey(cv => cv.VoluntarioId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}