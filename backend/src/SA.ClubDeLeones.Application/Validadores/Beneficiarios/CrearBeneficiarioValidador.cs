using FluentValidation;
using SA.ClubDeLeones.Application.Dtos.Beneficiarios;

namespace SA.ClubDeLeones.Application.Validadores.Beneficiarios;

public class CrearBeneficiarioValidador : AbstractValidator<CrearBeneficiarioDto>
{
    public CrearBeneficiarioValidador()
    {
        RuleFor(x => x.NombreCompleto)
            .NotEmpty().WithMessage("El nombre completo es obligatorio")
            .MaximumLength(120).WithMessage("El nombre completo no puede exceder 120 caracteres");

        RuleFor(x => x.Cedula)
            .NotEmpty().WithMessage("La cédula es obligatoria")
            .MaximumLength(20).WithMessage("La cédula no puede exceder 20 caracteres");

        RuleFor(x => x.Direccion)
            .NotEmpty().WithMessage("La dirección es obligatoria")
            .MaximumLength(200).WithMessage("La dirección no puede exceder 200 caracteres");

        RuleFor(x => x.SituacionNecesidad)
            .NotEmpty().WithMessage("La situación de necesidad es obligatoria")
            .MaximumLength(500).WithMessage("La situación de necesidad no puede exceder 500 caracteres");

        RuleFor(x => x.Telefono)
            .MaximumLength(20).WithMessage("El teléfono no puede exceder 20 caracteres")
            .When(x => !string.IsNullOrEmpty(x.Telefono));

        RuleFor(x => x.Correo)
            .MaximumLength(100).WithMessage("El correo no puede exceder 100 caracteres")
            .EmailAddress().WithMessage("El formato del correo no es válido")
            .When(x => !string.IsNullOrEmpty(x.Correo));

        RuleFor(x => x.Observaciones)
            .MaximumLength(500).WithMessage("Las observaciones no pueden exceder 500 caracteres")
            .When(x => !string.IsNullOrEmpty(x.Observaciones));
    }
}