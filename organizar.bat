@echo off
echo ===================================================
echo ==  Script de Reorganizacion de Archivos del Sitio Web  ==
echo ===================================================
echo.
echo Creando la nueva estructura de carpetas en 'assets'...

:: Crear carpetas principales
mkdir assets
mkdir assets\css
mkdir assets\js
mkdir assets\lang
mkdir assets\components
mkdir assets\images
mkdir assets\images\ui
mkdir assets\images\developments

echo.
echo Estructura de 'assets' creada.
echo.
echo Moviendo archivos a sus nuevas ubicaciones...

:: Mover archivos de estilo, scripts y componentes
move style.css assets\css\
move main.js assets\js\
move translations.js assets\js\
move _header.html assets\components\
move _footer.html assets\components\

:: Mover archivos de idioma
move lang assets\

:: Mover las carpetas de cada desarrollo
echo   - Moviendo imagenes de desarrollos...
if exist imagenes\esmeralda move imagenes\esmeralda assets\images\developments\
if exist imagenes\casablanca move imagenes\casablanca assets\images\developments\
if exist imagenes\sansebastian move imagenes\sansebastian assets\images\developments\

:: Mover imagenes de la interfaz de usuario (favicons, etc.)
echo   - Moviendo imagenes de UI (favicons y logos)...
move imagenes\favicon.ico assets\images\ui\
move imagenes\apple-touch-icon.png assets\images\ui\
move imagenes\favicon.png assets\images\ui\
move imagenes\favicon-96x96.png assets\images\ui\
move imagenes\favicon.svg assets\images\ui\
move imagenes\site.webmanifest assets\images\ui\
move imagenes\web-app-manifest-192x192.png assets\images\ui\
move imagenes\web-app-manifest-512x512.png assets\images\ui\

:: Limpiar la carpeta antigua de imagenes si esta vacia
rmdir imagenes /q /s

echo.
echo ===================================================
echo ==  ¡Reorganizacion completada exitosamente!  ==
echo ===================================================
echo.
echo IMPORTANTE: El siguiente paso es actualizar las rutas
echo            de los archivos dentro del codigo HTML, CSS y JS.
echo.
pause
