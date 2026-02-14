$files = @('accueil.html', 'apropos.html', 'Formation.html', 'contact&faq.html', 'doc&tarifs.html', 'realisation.html')

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
        $newContent = $content -replace 'Mahousso', 'Mahoussé'
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($file, $newContent, $utf8NoBom)
        Write-Host "Updated: $file"
    }
}
