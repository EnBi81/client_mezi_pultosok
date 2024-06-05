@echo off
setlocal enabledelayedexpansion

REM Read APK_VERSION from .env
for /f "tokens=2 delims==" %%A in ('findstr "APK_VERSION=" .env') do set "APK_VERSION=%%A"

REM Read version from package.json
for /f "delims=" %%A in ('powershell -Command "(Get-Content package.json | Out-String | ConvertFrom-Json).version"') do set "PACKAGE_VERSION=%%A"

REM Check if versions match
if "%APK_VERSION%"=="%PACKAGE_VERSION%" (
    echo Versions match.
    exit 0
)

echo Versions do not match.
echo Updating package.json and build.gradle...

REM Update version in package.json
powershell -Command "(Get-Content package.json) -replace '\"version\": \"%PACKAGE_VERSION%\"', '\"version\": \"%APK_VERSION%\"' | Set-Content package.json"

REM Read and increment versionCode in build.gradle
set "versionCode="
for /f "tokens=2" %%A in ('findstr "versionCode" android\app\build.gradle') do (
    set "versionCode=%%A"
)


if "%versionCode%"=="" (
    echo Error: Could not find versionCode in build.gradle.
    exit /b 1
)

set /a newVersionCode=!versionCode! + 1

REM Update versionCode and versionName in build.gradle
powershell -Command "(Get-Content android/app/build.gradle) -replace 'versionCode \d+', 'versionCode %newVersionCode%' | Set-Content android/app/build.gradle"
powershell -Command "(Get-Content android/app/build.gradle) -replace 'versionName \".*\"', 'versionName \"%APK_VERSION%\"' | Set-Content android/app/build.gradle"

REM Stage changes for commit
git add package.json android/app/build.gradle

echo Versions are synchronized and versionCode is incremented to %newVersionCode%.

endlocal
