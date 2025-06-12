# Script para validar e corrigir arquivos JSON do k6
# Uso: powershell -ExecutionPolicy Bypass -File .\valida-json-k6.ps1 -Path "caminho\para\resultado.json"

param(
    [string]$Path
)

if (-not (Test-Path $Path)) {
    Write-Host "Arquivo não encontrado: $Path" -ForegroundColor Red
    exit 1
}

$content = Get-Content $Path -Raw

# Tenta encontrar o primeiro objeto JSON válido
try {
    $jsonMatch = $content | Select-String -Pattern "\{[\s\S]*\}" -AllMatches | ForEach-Object { $_.Matches[0].Value }
    if ($jsonMatch.Count -eq 0) {
        Write-Host "Nenhum objeto JSON encontrado no arquivo." -ForegroundColor Red
        exit 1
    }
    $json = $jsonMatch[0]
    $parsed = $null
    try {
        $parsed = $json | ConvertFrom-Json
        Write-Host "Arquivo JSON válido!" -ForegroundColor Green
        # Se houver conteúdo extra após o JSON, salva apenas o JSON válido
        if ($content.Trim() -ne $json.Trim()) {
            $backup = "$Path.bak"
            Copy-Item $Path $backup -Force
            Set-Content $Path $json
            Write-Host "Arquivo corrigido! Backup salvo em $backup" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "O arquivo contém um objeto JSON, mas está mal formatado." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Erro ao processar o arquivo: $_" -ForegroundColor Red
    exit 1
}
