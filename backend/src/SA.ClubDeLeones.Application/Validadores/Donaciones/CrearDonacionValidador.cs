using FluentValidation;
using SA.ClubDeLeones.Application.Dtos.Donaciones;
using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Validadores.Donaciones;

public class CrearDonacionValidador : AbstractValidator<CrearDonacionDto>
{
    public CrearDonacionValidador()
    {
        RuleFor(x => x.DonanteNombre)
            .NotEmpty().WithMessage("El nombre del donante es obligatorio")
            .MaximumLength(120).WithMessage("El nombre del donante no puede exceder 120 caracteres");

        RuleFor(x => x.Tipo)
            .IsInEnum().WithMessage("El tipo de donación no es válido");

        RuleFor(x => x.Monto)
            .GreaterThan(0).WithMessage("El monto debe ser mayor a cero")
            .When(x => x.Tipo == TipoDonacion.Monetaria)
            .NotNull().WithMessage("El monto es obligatorio para donaciones monetarias")
            .When(x => x.Tipo == TipoDonacion.Monetaria);

        RuleFor(x => x.Descripcion)
            .NotEmpty().WithMessage("La descripción es obligatoria para donaciones en especie")
            .MaximumLength(500).WithMessage("La descripción no puede exceder 500 caracteres")
            .When(x => x.Tipo == TipoDonacion.EnEspecie);

        RuleFor(x => x.Fecha)
            .NotEmpty().WithMessage("La fecha es obligatoria");

        RuleFor(x => x.ReciboNumero)
            .MaximumLength(50).WithMessage("El número de recibo no puede exceder 50 caracteres")
            .When(x => !string.IsNullOrEmpty(x.ReciboNumero));

        RuleFor(x => x.CampanaId)
            .NotEmpty().WithMessage("La campaña es obligatoria cuando se proporciona")
            .When(x => x.CampanaId.HasValue);

        RuleFor(x => x.VoluntarioId)
            .NotEmpty().WithMessage("El voluntario es obligatorio cuando se proporciona")
            .When(x => x.VoluntarioId.HasValue);
    }
}