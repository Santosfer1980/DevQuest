@echo off
chcp 65001 > nul
title Instalador DevQuest Academico - ADS
color 0b

echo ============================================================
echo   🚀 DevQuest Academico - Instalador Automatico (ADS)
echo   Autor: Fernando Santos
echo ============================================================
echo.

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] Python nao foi encontrado no seu sistema!
    echo Por favor instale o Python em https://python.org e marque 'Add Python to PATH'.
    pause
    exit /b
)

echo [OK] Python detectado! Iniciando instalador inteligente...
echo.
python setup_instalador.py

pause
