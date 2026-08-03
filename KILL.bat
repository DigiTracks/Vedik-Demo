@echo off
title VEDIK School ERP - Kill Server
echo ============================================
echo   Stopping all Node.js processes...
echo ============================================
echo.
taskkill /F /IM node.exe 2>nul
if %errorlevel%==0 (
    echo [OK] Node.js processes stopped.
) else (
    echo [INFO] No Node.js processes found.
)
echo.
pause
