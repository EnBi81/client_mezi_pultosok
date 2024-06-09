@echo off

REM Define the path to the build.gradle file
set "GRADLE_FILE=node_modules\react-native-os\android\build.gradle"

REM Check if the file exists
if not exist "%GRADLE_FILE%" (
    echo The file %GRADLE_FILE% does not exist.
    exit /b 1
)

REM https://stackoverflow.com/questions/72951365/could-not-find-method-compile-for-arguments-com-facebook-reactreact-native
powershell -Command "(Get-Content -Path '%GRADLE_FILE%') -replace 'compile ', 'implementation ' | Set-Content -Path '%GRADLE_FILE%'"

echo Replacement successful.
