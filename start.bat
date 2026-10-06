@echo off
TITLE StudyBuddy - AI Lecture Summarizer Launcher
color 0b

echo ========================================================
echo        STUDYBUDDY - AI LECTURE SUMMARIZER
echo         Powered by Google Gemma & Node.js
echo ========================================================
echo.

:: Ensure local portable node is in PATH if present
IF EXIST "%LOCALAPPDATA%\Programs\nodejs" (
    SET "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"
)

echo [1/3] Checking Node.js installation...
where node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js was not found in PATH!
    echo Please install Node.js from https://nodejs.org or check AppData\Local\Programs\nodejs.
    pause
    exit /b 1
)

echo [2/3] Starting StudyBuddy Backend Server on http://localhost:5000...
start "StudyBuddy Backend" cmd /k "cd /d "%~dp0backend" && node server.js"

timeout /t 2 /nobreak >nul

echo [3/3] Starting StudyBuddy Frontend Vite Server on http://localhost:5173...
start "StudyBuddy Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ========================================================
echo [SUCCESS] Both servers are starting up!
echo - Backend API:  http://localhost:5000
echo - Web Dashboard: http://localhost:5173
echo.
echo Your default web browser will open in a few seconds...
echo ========================================================

timeout /t 3 /nobreak >nul
start http://localhost:5173/

echo.
echo You can keep these terminal windows open while studying.
pause
