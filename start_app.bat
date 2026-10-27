@echo off
:restart
cd /d C:\inetpub\apps\seedlingschools-node
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3003 "') do taskkill /F /PID %%a 2>NUL
timeout /t 2 /nobreak >NUL
"C:\Program Files\nodejs\node.exe" node_modules\next\dist\bin\next start -p 3003
timeout /t 5 /nobreak >NUL
goto restart
