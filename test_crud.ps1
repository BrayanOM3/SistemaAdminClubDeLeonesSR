$body = '{"nombreUsuario":"admin","password":"Admin123!"}'
$loginResponse = Invoke-RestMethod -Uri 'http://localhost:5000/api/v1/autenticacion/login' -Method Post -ContentType 'application/json' -Body $body
$token = $loginResponse.Token
Write-Host "Token: $token"
$headers = @{ Authorization = "Bearer $token" }

# Test PUT beneficiario
$updateBody = '{"NombreCompleto":"Test Nuevo Beneficiario 2 ACTUALIZADO","Cedula":"88888888","FechaNacimiento":"2010-01-01","Telefono":"555-1111","Correo":"test2@nuevo.com","Direccion":"Calle Nueva 456 ACTUALIZADA","EstadoCivil":1,"SituacionNecesidad":"Test necesidad actualizada"}'
try {
    $result = Invoke-RestMethod -Uri 'http://localhost:5000/api/v1/beneficiarios/8d4f36e0-106d-4d68-b38a-ef8a090c74bb' -Method Put -ContentType 'application/json' -Headers $headers -Body $updateBody
    Write-Host "PUT Success:"
    $result | ConvertTo-Json
} catch {
    Write-Host "PUT Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody"
    }
}