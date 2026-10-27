# Inicio — Dr. Tony Bustos

Portada estática basada en la captura proporcionada: imagen protagonista, navegación oscura, marca centrada, título inferior izquierdo y tarjeta clara inferior derecha. No incluye el marco del navegador ni los controles del reproductor presentes en la captura.

Abrir `index.html` directamente o servir esta carpeta con un servidor HTTP estático. No requiere instalar dependencias.

## Estado

- Subsección de credenciales: carrusel continuo con los tres logotipos proporcionados (AMCPER, CMCPER y hospital), marcos iguales y tinta azul `#012150` mediante filtro SVG. Incluye pausa manual, pausa al pasar el cursor o enfocar controles y desplazamiento manual con movimiento reducido. La sección 2 crece para alojar el carrusel. Se mantienen las indicaciones existentes de credenciales pendientes de confirmar. Sintaxis y estructura verificadas; la revisión visual automática está pendiente porque el navegador bloquea el acceso a la URL local `file://`.

- Contacto y ubicación: sección de una pantalla de alto con el iframe de Google Maps proporcionado para Hospital San Ángel Inn Universidad. Horario indicado por el usuario: lunes a viernes, 9:00 a. m. a 6:00 p. m. Teléfono de muestra `55 0000 0000`, marcado como provisional y sin enlace de llamada/WhatsApp. El botón Cómo llegar abre Google Maps. La carga remota del iframe no se ha comprobado en navegador.
- Los botones de consulta y el menú Contacto ahora llevan a esta sección; la respuesta sobre agenda en las FAQ también se actualizó. La ubicación y el horario ya están disponibles, pero no se reciben solicitudes de cita hasta contar con un canal real de contacto.

- La portada, Credenciales y Preguntas frecuentes ocupan exactamente la altura visible (`100dvh`, con respaldo `100vh`), con espacios internos adaptables. Si el contenido supera el espacio disponible, se permite desplazamiento interno para mantenerlo accesible. Artículos ocupa como mínimo una pantalla y puede crecer con su contenido.


- Se añadió Artículos conforme a la cuarta referencia: fondo blanco, título y enlace Ver todos, tres tarjetas fotográficas cuadradas con títulos superpuestos, una columna en móvil. Las tarjetas abren borradores de lectura y Ver todos abre un índice navegable.
- Artículos ya está habilitado en el menú. Textos editoriales provisionales sin atribución de autoría al doctor, pendientes de revisión. Las fotografías son ilustraciones sintéticas y no muestran pacientes reales.
- Imagen de artículos generada con imagegen integrado (sin CLI), guardada en `assets/articles-triptych.png`; se usa cada tercio mediante CSS. Prompt documentado en `assets/articles-image-prompt.txt`.

- Se añadió Preguntas frecuentes, siguiendo la tercera captura: fondo #012150, título a la izquierda y cuatro preguntas a la derecha. Usa elementos nativos details/summary con la primera respuesta abierta y grupo exclusivo; en móvil se muestra una columna. El enlace Pacientes lleva a esta sección.
- Las preguntas cubren primera consulta, preparación, recuperación y agenda. El contenido es general y requiere revisión del consultorio antes de publicación; no incluye plazos ni instrucciones médicas específicas. La disponibilidad del contacto sigue pendiente.

- Se añadió una sección de credenciales bajo la portada, basada en la segunda captura: franja de información profesional, texto a la izquierda y dos tarjetas escalonadas. Paleta principal #012150 con fondos #E2EEFF y detalles #B8DAFF.
- Campos solicitados: formación, certificaciones, años de experiencia, cédula, AMCPER y CMCPER. Los valores y vínculos profesionales siguen pendientes de confirmación; no se incluyen logotipos ni cifras inventadas.
- El enlace del doctor en la navegación lleva a esta nueva sección. Las tarjetas se apilan en móvil.

- Se creó una implementación nueva porque la carpeta contenía únicamente la grabación, sin código previo.
- Menú móvil y paneles informativos accesibles mediante teclado. Artículos queda para una segunda etapa.
- Los textos de las secciones son provisionales. Faltan la biografía, credenciales, catálogo de procedimientos, material clínico autorizado, indicaciones revisadas y contacto real.
- Los botones de consulta abren información de contacto pendiente; no agendan citas ni envían formularios.
- Se utiliza Arial como aproximación; la captura no permite identificar con certeza la fuente original.
- La fotografía `assets/hero.png` es una imagen editorial sintética provisional. No representa al doctor, a una paciente real ni un resultado clínico.
- La grabación no se ha analizado. La referencia visual empleada fue la imagen adjunta del usuario.

## Imagen

Generada con la herramienta integrada imagegen, no con CLI. Archivo: `assets/hero.png`.

Prompt utilizado:

> Use case: photorealistic-natural. Asset type: wide homepage background photo for medical practice, temporary editorial imagery. Create a natural editorial photograph of a smiling adult woman with loosely tied curly brown hair, wearing an ivory blouse, hand gently near her cheek, positioned near center-right. Dark muted olive charcoal interior background with soft warm daylight across her face. Wide landscape 3:2 composition, generous dark negative space on the left for white website heading, head fully visible in upper middle, shoulders lower middle. Authentic skin texture. Quiet warm atmosphere. No medical personnel, no implied treatment outcome, no before-after, no text, no logos, no interface elements, no watermark.

## Verificación

JavaScript comprobado con `node --check app.js`. El navegador integrado no logró conectarse al servidor local, por lo que no se generaron capturas ni se confirmó visualmente el resultado desktop/mobile. Los ajustes responsive están implementados en CSS, pendientes de revisión en navegador.
