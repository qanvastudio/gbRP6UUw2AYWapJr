# Revisión de producción — 11 de noviembre de 2026

- Eliminados 13 recursos obsoletos (10.414.375 bytes) y 67 ramas de selectores CSS sin uso.
- Originales necesarios para regeneración conservados en source-assets/, fuera del paquete público.
- Verificadas ocho páginas, 227 enlaces y 38 recursos públicos: sin archivos ni anclas locales faltantes y sin recursos públicos sin referencia.
- WhatsApp y los dos destinos de Google Maps respondieron HTTP 200. Esto comprueba disponibilidad HTTP, no la atención del número de WhatsApp.
- Pruebas de carga del hero, videos de procedimientos, filtros de trayectoria y sintaxis JavaScript aprobadas.
- Corregido el encabezado principal de Trayectoria. Retirados filtros SVG obsoletos.
- Paquete dist/: 56 archivos, 2.996.922 bytes. No incluye herramientas, originales ni metadatos Git.

Pendiente antes de publicar: revisión visual en navegador de escritorio y móvil y verificación del alojamiento real (HTTPS, tipos de contenido, caché y solicitudes parciales de video). Esta auditoría no incluye una medición en dispositivo real ni una publicación. No se ha configurado un dominio de producción.
