using FluentValidation;
using SA.ClubDeLeones.Application.Dtos.Actividades;
using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Validadores.Actividades;

public class CrearActividadValidador : AbstractValidator<CrearActividadDto>
{
    public CrearActividadValidador()
    {
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre es obligatorio")
            .MaximumLength(100).WithMessage("El nombre no puede exceder 100 caracteres");

        RuleFor(x => x.Descripcion)
            .NotEmpty().WithMessage("La descripción es obligatoria")
            .MaximumLength(500).WithMessage("La descripción no puede exceder 500 caracteres");

        RuleFor(x => x.Tipo)
            .IsInEnum().WithMessage("El tipo de actividad no es válido");

        RuleFor(x => x.Fecha)
            .NotEmpty().WithMessage("La fecha es obligatoria");

        RuleFor(x => x.Lugar)
            .MaximumLength(200).WithMessage("El lugar no puede exceder 200 caracteres")
            .When(x => !string.IsNullOrEmpty(x.Lugar));

        RuleFor(x => x.CampanaId)
            .NotEmpty().WithMessage("La campaña es obligatoria cuando se proporciona")
            .When(x => x.CampanaId.HasValue);
    }
}