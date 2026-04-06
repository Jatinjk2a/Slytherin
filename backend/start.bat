@echo off
echo.
echo ========================================
echo  README AI — Backend Server
echo  FastAPI + Uvicorn on port 5000
echo ========================================
echo.
cd /d %~dp0
uvicorn main:app --host 0.0.0.0 --port 5000 --reload
