@echo off
echo.
echo ========================================
echo  README AI — Frontend Server
echo  Serving static files on port 3000
echo ========================================
echo.
cd /d %~dp0\frontend
python -m http.server 3000
