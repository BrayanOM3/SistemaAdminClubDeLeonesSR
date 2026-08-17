using ClosedXML.Excel;
using SA.ClubDeLeones.Application.Interfaces.Servicios;

namespace SA.ClubDeLeones.Infrastructure.Exportacion;

public sealed class ServicioExcel : IServicioExcel
{
    public byte[] GenerarReporteBeneficiarios(IEnumerable<object> datos)
    {
        using var workbook = new XLWorkbook();
        var worksheet = workbook.Worksheets.Add("Beneficiarios");

        worksheet.Cell(1, 1).Value = "ID";
        worksheet.Cell(1, 2).Value = "Nombre Completo";
        worksheet.Cell(1, 3).Value = "Cédula";
        worksheet.Cell(1, 4).Value = "Fecha Nacimiento";
        worksheet.Cell(1, 5).Value = "Teléfono";
        worksheet.Cell(1, 6).Value = "Correo";
        worksheet.Cell(1, 7).Value = "Dirección";
        worksheet.Cell(1, 8).Value = "Estado Civil";
        worksheet.Cell(1, 9).Value = "Situación Necesidad";
        worksheet.Cell(1, 10).Value = "Fecha Registro";
        worksheet.Cell(1, 11).Value = "Estado";
        worksheet.Cell(1, 12).Value = "Observaciones";

        var fila = 2;
        foreach (var item in datos)
        {
            var props = item.GetType().GetProperties();
            for (var i = 0; i < props.Length; i++)
            {
                var valor = props[i].GetValue(item);
                worksheet.Cell(fila, i + 1).Value = valor?.ToString() ?? string.Empty;
            }
            fila++;
        }

        worksheet.Columns().AdjustToContents();
        using var stream = new MemoryStream();
        workbook.SaveAs(stream);
        return stream.ToArray();
    }

    public byte[] GenerarReporteDonaciones(IEnumerable<object> datos)
    {
        using var workbook = new XLWorkbook();
        var worksheet = workbook.Worksheets.Add("Donaciones");

        worksheet.Cell(1, 1).Value = "ID";
        worksheet.Cell(1, 2).Value = "Donante";
        worksheet.Cell(1, 3).Value = "Tipo";
        worksheet.Cell(1, 4).Value = "Monto";
        worksheet.Cell(1, 5).Value = "Descripción";
        worksheet.Cell(1, 6).Value = "Fecha";
        worksheet.Cell(1, 7).Value = "Número Recibo";
        worksheet.Cell(1, 8).Value = "Campaña";
        worksheet.Cell(1, 9).Value = "Voluntario";

        var fila = 2;
        foreach (var item in datos)
        {
            var props = item.GetType().GetProperties();
            for (var i = 0; i < props.Length; i++)
            {
                var valor = props[i].GetValue(item);
                worksheet.Cell(fila, i + 1).Value = valor?.ToString() ?? string.Empty;
            }
            fila++;
        }

        worksheet.Columns().AdjustToContents();
        using var stream = new MemoryStream();
        workbook.SaveAs(stream);
        return stream.ToArray();
    }

    public byte[] GenerarReporteCampanas(IEnumerable<object> datos)
    {
        using var workbook = new XLWorkbook();
        var worksheet = workbook.Worksheets.Add("Campañas");

        worksheet.Cell(1, 1).Value = "ID";
        worksheet.Cell(1, 2).Value = "Nombre";
        worksheet.Cell(1, 3).Value = "Descripción";
        worksheet.Cell(1, 4).Value = "Fecha Inicio";
        worksheet.Cell(1, 5).Value = "Fecha Fin";
        worksheet.Cell(1, 6).Value = "Objetivo Monto";
        worksheet.Cell(1, 7).Value = "Estado";
        worksheet.Cell(1, 8).Value = "Tipo";

        var fila = 2;
        foreach (var item in datos)
        {
            var props = item.GetType().GetProperties();
            for (var i = 0; i < props.Length; i++)
            {
                var valor = props[i].GetValue(item);
                worksheet.Cell(fila, i + 1).Value = valor?.ToString() ?? string.Empty;
            }
            fila++;
        }

        worksheet.Columns().AdjustToContents();
        using var stream = new MemoryStream();
        workbook.SaveAs(stream);
        return stream.ToArray();
    }

    public byte[] GenerarReporteVoluntarios(IEnumerable<object> datos)
    {
        using var workbook = new XLWorkbook();
        var worksheet = workbook.Worksheets.Add("Voluntarios");

        worksheet.Cell(1, 1).Value = "ID";
        worksheet.Cell(1, 2).Value = "Nombre Completo";
        worksheet.Cell(1, 3).Value = "Cédula";
        worksheet.Cell(1, 4).Value = "Teléfono";
        worksheet.Cell(1, 5).Value = "Correo";
        worksheet.Cell(1, 6).Value = "Fecha Ingreso";
        worksheet.Cell(1, 7).Value = "Disponibilidad";
        worksheet.Cell(1, 8).Value = "Especialidad";
        worksheet.Cell(1, 9).Value = "Estado";

        var fila = 2;
        foreach (var item in datos)
        {
            var props = item.GetType().GetProperties();
            for (var i = 0; i < props.Length; i++)
            {
                var valor = props[i].GetValue(item);
                worksheet.Cell(fila, i + 1).Value = valor?.ToString() ?? string.Empty;
            }
            fila++;
        }

        worksheet.Columns().AdjustToContents();
        using var stream = new MemoryStream();
        workbook.SaveAs(stream);
        return stream.ToArray();
    }
}