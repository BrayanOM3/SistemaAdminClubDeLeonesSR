Start-Sleep 2
$body = '{"nombreUsuario":"admin","password":"Admin123!"}'
$loginResponse = Invoke-RestMethod -Uri 'http://localhost:5000/api/v1/autenticacion/login' -Method Post -ContentType 'application/json' -Body $body
$token = $loginResponse.Token
Write-Host "Token: $token"

$headers = @{ Authorization = "Bearer $token" }
$validateResponse = Invoke-RestMethod -Uri 'http://localhost:5000/api/v1/autenticacion/validar-token' -Method Get -Headers $headers
Write-Host "Token validation: $validateResponse"