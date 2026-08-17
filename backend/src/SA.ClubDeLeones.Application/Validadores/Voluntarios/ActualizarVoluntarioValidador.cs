using FluentValidation;
using SA.ClubDeLeones.Application.Dtos.Voluntarios;
using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Validadores.Voluntarios;

public class ActualizarVoluntarioValidador : AbstractValidator<ActualizarVoluntarioDto>
{
    public ActualizarVoluntarioValidador()
    {
        RuleFor(x => x.NombreCompleto)
            .NotEmpty().WithMessage("El nombre completo es obligatorio")
            .MaximumLength(120).WithMessage("El nombre completo no puede exceder 120 caracteres");

        RuleFor(x => x.Cedula)
            .NotEmpty().WithMessage("La cédula es obligatoria")
            .MaximumLength(20).WithMessage("La cédula no puede exceder 20 caracteres");

        RuleFor(x => x.FechaIngreso)
            .NotEmpty().WithMessage("La fecha de ingreso es obligatoria");

        RuleFor(x => x.Telefono)
            .MaximumLength(20).WithMessage("El teléfono no puede exceder 20 caracteres")
            .When(x => !string.IsNullOrEmpty(x.Telefono));

        RuleFor(x => x.Correo)
            .MaximumLength(100).WithMessage("El correo no puede exceder 100 caracteres")
            .EmailAddress().WithMessage("El formato del correo no es válido")
            .When(x => !string.IsNullOrEmpty(x.Correo));

        RuleFor(x => x.Disponibilidad)
            .MaximumLength(200).WithMessage("La disponibilidad no puede exceder 200 caracteres")
            .When(x => !string.IsNullOrEmpty(x.Disponibilidad));

        RuleFor(x => x.Especialidad)
            .MaximumLength(200).WithMessage("La especialidad no puede exceder 200 caracteres")
            .When(x => !string.IsNullOrEmpty(x.Especialidad));

        RuleFor(x => x.Estado)
            .IsInEnum().WithMessage("El estado no es válido");
    }
}