@echo off
echo Configuration du pont COM pour Docker
echo ====================================

set /p COM_NUM="Entrez le numéro du port COM (ex: 4 pour COM4): "

rem Vérifier si ncat (netcat) est installé
where ncat >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Ncat (netcat) n'est pas installé. Installation via Chocolatey...
    powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"
    choco install nmap -y
) else (
    echo Ncat est déjà installé.
)

echo Création du pont pour COM%COM_NUM% vers TCP port 8442...
echo Ce processus doit rester en exécution tant que Docker est actif.
echo Appuyez sur Ctrl+C pour terminer.

ncat -v -l 8442 --sh-exec "ncat -v \\.\COM%COM_NUM% --ssl"

pause