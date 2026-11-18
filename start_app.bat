@echo off
setlocal
cd /d "%~dp0"
if not defined NEXT_BUILD_DIR set "NEXT_BUILD_DIR=.next"
if not exist "logs" mkdir "logs"
"C:\Program Files\nodejs\node.exe" scripts\run-next.mjs 3003 >> "logs\nextjs.log" 2>&1
exit /b %ERRORLEVEL%
