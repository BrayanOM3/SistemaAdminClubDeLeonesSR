using FluentValidation;
using SA.ClubDeLeones.Application.Dtos.AyudasSociales;
using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Validadores.AyudasSociales;

public class CrearAyudaSocialValidador : AbstractValidator<CrearAyudaSocialDto>
{
    public CrearAyudaSocialValidador()
    {
        RuleFor(x => x.BeneficiarioId)
            .NotEmpty().WithMessage("El beneficiario es obligatorio");

        RuleFor(x => x.Tipo)
            .IsInEnum().WithMessage("El tipo de ayuda no es válido");

        RuleFor(x => x.Descripcion)
            .NotEmpty().WithMessage("La descripción es obligatoria")
            .MaximumLength(500).WithMessage("La descripción no puede exceder 500 caracteres");

        RuleFor(x => x.Monto)
            .GreaterThan(0).WithMessage("El monto debe ser mayor a cero")
            .When(x => x.Monto.HasValue);

        RuleFor(x => x.CampanaId)
            .NotEmpty().WithMessage("La campaña es obligatoria cuando se proporciona")
            .When(x => x.CampanaId.HasValue);

        RuleFor(x => x.VoluntarioId)
            .NotEmpty().WithMessage("El voluntario es obligatorio cuando se proporciona")
            .When(x => x.VoluntarioId.HasValue);
    }
}