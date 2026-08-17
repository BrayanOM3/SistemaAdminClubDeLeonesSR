using FluentValidation;
using SA.ClubDeLeones.Application.Dtos.Campanas;
using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Validadores.Campanas;

public class CrearCampanaValidador : AbstractValidator<CrearCampanaDto>
{
    public CrearCampanaValidador()
    {
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre es obligatorio")
            .MaximumLength(100).WithMessage("El nombre no puede exceder 100 caracteres");

        RuleFor(x => x.Descripcion)
            .NotEmpty().WithMessage("La descripción es obligatoria")
            .MaximumLength(500).WithMessage("La descripción no puede exceder 500 caracteres");

        RuleFor(x => x.FechaInicio)
            .NotEmpty().WithMessage("La fecha de inicio es obligatoria");

        RuleFor(x => x.FechaFin)
            .GreaterThanOrEqualTo(x => x.FechaInicio)
            .WithMessage("La fecha de fin debe ser posterior o igual a la fecha de inicio")
            .When(x => x.FechaFin.HasValue);

        RuleFor(x => x.ObjetivoMonto)
            .GreaterThan(0).WithMessage("El objetivo monetario debe ser mayor a cero")
            .When(x => x.ObjetivoMonto.HasValue);

        RuleFor(x => x.Tipo)
            .IsInEnum().WithMessage("El tipo de campaña no es válido");
    }
}