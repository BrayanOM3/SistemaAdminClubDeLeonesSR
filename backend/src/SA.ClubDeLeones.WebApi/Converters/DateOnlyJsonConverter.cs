using System.Text.Json;
using System.Text.Json.Serialization;

namespace SA.ClubDeLeones.WebApi.Converters;

/// <summary>
/// Custom JSON converter for DateOnly to handle serialization/deserialization
/// Format: yyyy-MM-dd (ISO 8601 date format)
/// </summary>
public class DateOnlyJsonConverter : JsonConverter<DateOnly>
{
    private const string DateFormat = "yyyy-MM-dd";

    public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var dateString = reader.GetString();
        if (string.IsNullOrEmpty(dateString))
        {
            throw new JsonException("DateOnly value cannot be null or empty");
        }

        if (DateOnly.TryParseExact(dateString, DateFormat, out var date))
        {
            return date;
        }

        // Fallback to standard parsing
        return DateOnly.Parse(dateString);
    }

    public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(DateFormat));
    }
}

/// <summary>
/// Custom JSON converter for nullable DateOnly
/// </summary>
public class NullableDateOnlyJsonConverter : JsonConverter<DateOnly?>
{
    private const string DateFormat = "yyyy-MM-dd";

    public override DateOnly? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.Null)
        {
            return null;
        }

        var dateString = reader.GetString();
        if (string.IsNullOrEmpty(dateString))
        {
            return null;
        }

        if (DateOnly.TryParseExact(dateString, DateFormat, out var date))
        {
            return date;
        }

        return DateOnly.Parse(dateString);
    }

    public override void Write(Utf8JsonWriter writer, DateOnly? value, JsonSerializerOptions options)
    {
        if (value.HasValue)
        {
            writer.WriteStringValue(value.Value.ToString(DateFormat));
        }
        else
        {
            writer.WriteNullValue();
        }
    }
}