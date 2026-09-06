using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SA.ClubDeLeones.WebApi.Converters;

/// <summary>
/// Custom JSON converter for DateTime.
///
/// PostgreSQL mapea DateTime a 'timestamp with time zone', y Npgsql rechaza valores
/// con Kind=Unspecified ("only UTC is supported"). Los clientes (frontend) envían
/// fechas/horas locales sin offset (ej: "2024-06-15T09:00:00"), que System.Text.Json
/// deserializa como Kind=Unspecified, causando un error 500 al guardar.
///
/// Este converter normaliza cualquier DateTime sin zona horaria explícita a Kind=Utc,
/// de modo que siempre sea aceptado por Npgsql.
/// </summary>
public class UtcDateTimeJsonConverter : JsonConverter<DateTime>
{
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var fechaString = reader.GetString();
        if (string.IsNullOrEmpty(fechaString))
        {
            throw new JsonException("DateTime value cannot be null or empty");
        }

        // RoundtripKind preserva el Kind del string: 'Z' -> Utc, offset -> Local, sin sufijo -> Unspecified.
        var fecha = DateTime.Parse(fechaString, CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind);

        // Sin zona horaria explícita: tratamos la hora local como UTC.
        if (fecha.Kind == DateTimeKind.Unspecified)
        {
            return DateTime.SpecifyKind(fecha, DateTimeKind.Utc);
        }

        return fecha;
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString("O", CultureInfo.InvariantCulture));
    }
}

/// <summary>
/// Custom JSON converter for nullable DateTime
/// </summary>
public class NullableUtcDateTimeJsonConverter : JsonConverter<DateTime?>
{
    public override DateTime? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.Null)
        {
            return null;
        }

        var fechaString = reader.GetString();
        if (string.IsNullOrEmpty(fechaString))
        {
            return null;
        }

        var fecha = DateTime.Parse(fechaString, CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind);

        if (fecha.Kind == DateTimeKind.Unspecified)
        {
            return DateTime.SpecifyKind(fecha, DateTimeKind.Utc);
        }

        return fecha;
    }

    public override void Write(Utf8JsonWriter writer, DateTime? value, JsonSerializerOptions options)
    {
        if (value.HasValue)
        {
            writer.WriteStringValue(value.Value.ToString("O", CultureInfo.InvariantCulture));
        }
        else
        {
            writer.WriteNullValue();
        }
    }
}
