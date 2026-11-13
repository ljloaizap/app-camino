# Proyecto: Credencial digital del Camino de Santiago

Actúa como un desarrollador frontend senior con criterio de diseño UI/UX. Necesito construir una web estática, responsive e interactiva que funcione como una credencial digital del Camino de Santiago.

El proyecto es un regalo de cumpleaños para una amiga. Debe transmitir una experiencia personal, íntima y cuidada: una mezcla entre la credencial auténtica del peregrino y un diario de viaje.

## 1. Antes de comenzar

- Inspecciona el repositorio y su estructura actual.
- Si está vacío, crea una estructura sencilla y organizada.
- No introduzcas frameworks, dependencias ni herramientas de compilación innecesarias.
- Prioriza HTML, CSS y JavaScript vanilla.
- No implementes backend, bases de datos ni persistencia de información.
- El despliegue final será mediante GitHub Pages.
- No generes imágenes mediante IA ni utilices fotografías de stock. Las fotografías serán aportadas por la propietaria del proyecto.
- No inventes contenido personal, fotografías, fechas ni anécdotas.

Antes de modificar archivos existentes, identifica qué hay y evita sobrescribir trabajo previo sin necesidad.

## 2. Concepto y experiencia

La web tendrá cinco grandes componentes:

1. Portada de bienvenida.
2. Credencial interactiva con 31 sellos.
3. Contenido personal y práctico asociado a cada sello.
4. Álbum independiente de recuerdos del Camino.
5. Despedida y sello especial de amistad.

La visitante debe sentir que está explorando una credencial real que alguien utilizó durante su peregrinación, no navegando por una web convencional.

### Portada

- Mostrar inicialmente la credencial cerrada.
- Debe tener una apariencia física, como una pequeña libreta de peregrino.
- Incluir el título «Mi Camino de Santiago».
- Incorporar una vieira como elemento gráfico central.
- Tener un botón «Abrir la credencial del peregrino».
- Al pulsarlo, mostrar la credencial abierta.

### Credencial

- Representar una credencial abierta, con navegación por páginas.
- No implementar un acordeón horizontal.
- No hace falta simular físicamente el movimiento de las hojas: una transición sencilla es suficiente.
- Permitir navegar entre páginas mediante controles de anterior y siguiente.
- Incluir acceso al índice de sellos en cualquier momento.
- Permitir volver a la portada.
- En el índice, mostrar los 31 sellos agrupados por capítulos.
- Cada sello debe poder abrirse individualmente.
- La navegación debe ser intuitiva tanto en escritorio como en móvil.

No es necesario distribuir todos los sellos en cantidades idénticas por página. Las agrupaciones deben respetar la narrativa y mantener un equilibrio visual razonable.

La experiencia debe ser cómoda y fluida, no una simulación física que dificulte la navegación. La estética de credencial tiene prioridad sobre los efectos de animación.

### Sellos

Cada sello representa un tema, momento o experiencia del Camino.

Hay 31 sellos principales y un sello adicional de amistad que no cuenta dentro de los 31.

Los sellos deben compartir un lenguaje gráfico, pero no ser copias de una misma plantilla.

Algunos tendrán más texto, otros más fotografías y otros una combinación de ambos. La composición debe variar para evitar monotonía.

La primera implementación solo necesita dos sellos de ejemplo:

**Sello 05 — Preparación física**
- Capítulo: Preparando al peregrino.
- Título editorial: «El cuerpo también hace el Camino».
- Espacio para una fotografía de entrenamiento.
- Texto personal sobre la preparación física.
- Sección de recomendaciones prácticas.
- Espacio para una pequeña anotación o detalle de diario.
- Sello gráfico relacionado con botas o caminata.

**Sello 13 — El Camino: Día 1**
- Capítulo: El Camino.
- Título y fecha del día.
- Fotografía panorámica protagonista.
- Espacio para contar los momentos más significativos.
- Pequeños datos secundarios: distancia, recorrido, alojamiento o anécdotas.
- Posibilidad de incluir una fotografía adicional con una historia oculta.

El contenido será provisional. Utiliza textos claramente identificados como placeholders, sin inventar historias personales.

Los demás sellos deben aparecer en el índice como elementos pendientes de contenido, sin desarrollar páginas ficticias.

## 3. Identidad visual

Concepto: credencial auténtica de peregrino + diario personal de viaje.

Debe parecer una credencial que efectivamente acompañó a una persona durante varios días de Camino.

### Paleta

- Crema papel: #F3EBDD
- Marfil: #FAF7F0
- Azul peregrino: #263F56
- Terracota: #A6533D
- Marrón carbón: #393630
- Gris cálido: #A49B8C
- Verde oliva: #747B59

El azul será el color principal. Terracota y verde oliva se utilizarán como acentos puntuales.

### Texturas y envejecimiento

El papel debe tener un envejecimiento muy sutil:

- Grano fino de papel.
- Pequeñas variaciones de tonalidad.
- Bordes apenas más oscuros.
- Imperfecciones discretas de tinta.
- Algunas marcas tenues de uso.

Evitar manchas grandes, roturas, quemaduras, amarillos intensos y efectos exagerados de antigüedad.

La textura no debe perjudicar la legibilidad ni competir con las fotografías.

### Tipografías

Utilizar únicamente dos familias principales:

- Cormorant Garamond: títulos, capítulos y frases destacadas.
- Lato: textos, instrucciones, fechas y navegación.

Las tipografías manuscritas pueden aparecer excepcionalmente como anotaciones decorativas, nunca como fuente principal.

### Sellos gráficos

- Inspirarse en los sellos tradicionales de las credenciales de peregrino.
- Crear diseños originales, no copiar sellos institucionales.
- Utilizar símbolos relacionados con cada tema.
- Variar formas y composiciones manteniendo una identidad común.
- Incorporar detalles de impresión ligeramente imperfecta.

Se pueden utilizar iconos SVG de bibliotecas como Lucide. No incorporar imágenes externas innecesarias.

### Fotografías

- Las fotografías serán exclusivamente aportadas por la propietaria.
- Preparar componentes y estilos para imágenes horizontales, verticales y cuadradas.
- Permitir fotografías protagonistas de gran tamaño.
- Alternar composiciones fotográficas y textuales.
- No aplicar filtros fuertes ni alterar los colores originales.
- Utilizar placeholders visuales mientras no existan fotografías reales.

## 4. Elementos interactivos

### Vieira

La vieira será un motivo recurrente.

Al hacer clic sobre ella, debe revelar su reverso con un pequeño mensaje, anécdota o sorpresa.

La interacción debe ser sencilla: mostrar y ocultar contenido mediante clic.

No implementar animaciones complejas ni efectos tridimensionales.

### Sorpresas

A lo largo de la experiencia habrá aproximadamente 5 o 6 sorpresas.

Pueden ser:
- Fotografías con una pequeña historia oculta.
- Anécdotas que se revelan al hacer clic.
- Mensajes escondidos en determinados elementos gráficos.

Implementar un mecanismo reutilizable para revelar contenido. No desarrollar sistemas complejos de animación.

### Sonido ambiental

Incluir un único reproductor de sonido ambiental de naturaleza con pájaros cantando.

Requisitos:
- Reproducir el siguiente recurso de youtube: https://youtu.be/PvZUKykChFc?si=enwI8oNb9-DAm_vt
- Control visible para activar y silenciar.
- No reproducir automáticamente al cargar la página.
- El sonido no debe interrumpirse ni reiniciarse al navegar entre vistas o sellos. La navegación interna se hace sin recargar la página (solo se reemplaza el contenido principal), manteniendo el reproductor vivo.
- Comenzar a sonar con el primer clic de la visitante: en «Activar sonido» o en «Abrir credencial».
- Solo una recarga manual del navegador o abrir una URL directamente detiene el sonido (limitación de los navegadores).
- No utilizar otros servicios externos de música. Aplicar el principio DRY.

Si todavía no existe el archivo de audio, dejar preparado el componente sin errores.

## 5. Álbum de recuerdos

Debe existir una sección independiente de la credencial llamada «Recuerdos del Camino».

Será una galería de fotografías adicionales, organizadas por categorías.

Categorías tentativas:
- Paisajes y naturaleza.
- Caminos y etapas.
- Pequeños descubrimientos.
- Personas.
- Comida y momentos cotidianos.
- Lugares especiales.
- Fotografías aparentemente pequeñas pero significativas.

No es necesario implementar todas las categorías desde el principio.

La galería debe permitir ampliar las fotografías y mostrar captions o pequeñas historias cuando existan.

Evitar duplicar innecesariamente las fotografías que ya aparecen en los sellos.

## 6. Despedida y sello de amistad

Al terminar la credencial, mostrar una despedida personal y un sello especial de amistad.

No forma parte de los 31 sellos.

Debe transmitir cariño, animar a la destinataria a vivir su propio Camino y cerrar la experiencia de forma emotiva, sin resultar excesivamente cursi.

El contenido definitivo se proporcionará posteriormente. No inventes nada, deja un placeholder.

## 7. Arquitectura y organización del código

Buscar un equilibrio entre legibilidad y simplicidad.

No quiero un único HTML gigantesco con todo embebido, pero tampoco una arquitectura empresarial fragmentada en decenas de archivos.

Puede usarse **varias páginas HTML** (por ejemplo portada, credencial, índice, plantilla de sello, álbum, despedida) si mantiene los archivos legibles. El contenido de los 31 sellos debe vivir en datos (`stamps.js` o archivos de contenido), no duplicado como marcado masivo en HTML.

Como punto de partida, considerar:

- index.html (y, si conviene, otras páginas HTML ligeras)
- css/styles.css
- js/app.js
- js/stamps.js
- js/music.js
- assets/photos/
- assets/audio/
- assets/icons/ (solo si resulta necesario)

Se pueden ajustar los archivos si existe una razón concreta.

Responsabilidades sugeridas:

- app.js: navegación, apertura de la credencial, índice y control de vistas.
- stamps.js: contenido y configuración de los sellos.
- music.js: reproductor ambiental.
- styles.css: estilos generales y componentes visuales.

Evitar duplicar estructuras HTML innecesariamente. Los componentes visuales reutilizables deben tener una implementación sencilla.

El contenido de cada sello debe poder editarse sin tener que modificar la lógica de navegación.

No introducir gestores de estado, enrutadores ni bibliotecas de componentes para este proyecto.

Los nombres de los archivos y el código en general, debe ser en inglés. Solo se usará español para el contenido que, posteriormente, será agregado manualmente por el usuario.

## 8. Responsive y accesibilidad

- Diseñar primero una experiencia de escritorio tipo credencial abierta.
- Adaptar la navegación a dispositivos móviles.
- En móvil, utilizar una página vertical cuando sea necesario, conservando la identidad visual.
- No reducir el contenido hasta volverlo ilegible.
- Usar HTML semántico. -- Utilizar etiquetas HTML semánticas según la función de cada elemento (header, nav, main, section, article, footer, etc.), evitando utilizar div para todo.
- Incluir textos alternativos en las fotografías.
- Garantizar contraste suficiente.
- Permitir navegación mediante teclado.
- Respetar la preferencia de movimiento reducido del sistema.

## 9. Alcance de esta primera entrega

No desarrollar todavía toda la web.

Primero construir una versión funcional que incluya:

1. Portada con credencial cerrada.
2. Apertura de la credencial.
3. Índice con los 31 sellos agrupados provisionalmente.
4. Navegación entre vistas.
5. Página del sello 05: preparación física.
6. Página del sello 13: primer día del Camino.
7. Vieira interactiva con contenido oculto de ejemplo.
8. Reproductor de sonido ambiental integrado con YouTube, con funcionalidad de  activación manual.
9. Estructura inicial del álbum de recuerdos.
10. Despedida provisional.

El diseño debe permitir ampliar progresivamente el proyecto sin reescribir la aplicación.

## 10. Criterios de aceptación

La primera entrega estará lista cuando:

- La portada se vea como una credencial cerrada.
- Se pueda abrir y explorar la credencial.
- El índice permita acceder a los dos sellos desarrollados.
- Se pueda navegar entre los sellos y volver al índice.
- Las dos páginas tengan composiciones visuales diferentes.
- La vieira revele su contenido al hacer clic.
- El reproductor de sonido funcione correctamente, gestione los bloqueos de autoplay y permita activar/silenciar el audio.
- El control de sonido esté preparado y no produzca errores si falta el audio por una posible falla del enlace de Youtube.
- El audio no se interrumpa ni se reinicie al navegar dentro de la web.
- La interfaz funcione correctamente en escritorio y móvil.
- No existan dependencias de backend.
- El proyecto pueda publicarse en GitHub Pages.
- Los controles interactivos tengan estados visuales claros (hover, focus y activo).
- No haya errores en consola durante la navegación habitual.
- La visitante debe sentir que está explorando una credencial real
- La interfaz funcione correctamente en escritorio y móvil.

**Importante:** prioriza la calidad visual, la legibilidad y la sencillez. No añadas funcionalidades que no hayan sido solicitadas. Si consideras que una decisión requiere complejidad adicional, explícala antes de implementarla.