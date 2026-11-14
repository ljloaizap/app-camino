Proyecto: credencial digital del Camino de Santiago (regalo personal). Sitio estático para GitHub Pages: HTML + CSS + JS vanilla, sin build.

Rutas del repo: /Users/liliana.loaiza/G/lili/el_camino/app_el_camino

Idioma: código, archivos, clases, commits en inglés; contenido visible para la visitante en español.

## Fuente de verdad del contenido
- content.md: tabla | Capítulo | Sello | (31 sellos). Capítulos y títulos SOLO aquí.
- js/content.js: fetch + parse de content.md; buildChapters(); packChapter() para hojas de la credencial.
- Reglas hojas: cada capítulo empieza en hoja nueva; dentro del capítulo, 2–4 sellos por hoja, reparto lo más parejo; si no cuadra, las primeras hojas llevan más. Opcional: ### Hojas en content.md.
- js/stamps.js: solo stampPages — layouts completos por id (hoy 03 prep, 07 day). El resto es layout stub vía app.js.
- js/art.js: sellos SVG minimalistas (motifForStamp según título/capítulo).

## Páginas
index.html, credential.html, stamp-index.html, stamp.html?id=N, album.html, farewell.html

## Navegación y audio
- app.js intercepta enlaces internos (fetch + swap de <main>); reproductor YouTube en data-persist fuera de main — audio continuo.
- music.js: prepara player en silencio; play con click en “Activar sonido” o “Abrir credencial” (data-start-sound).
- Flechas laterales en credencial y sellos; swipe en móvil (≤899px) sobre .credential__book / .stamp__book.

## UI
- Paleta y tipografía: requirement.md. Sound-dock fijo arriba a la derecha.
- Índice: enlaces a los 31; “Borrador” vs “Abrir” (03/07).
- Sellos stub: foto placeholder, [Contenido pendiente], sello gráfico por título.

## Otros archivos
plan.md, requirement.md, .gitignore (ignora .cursor/), .cursor/rules/git-commit-draft.mdc: si el usuario escribe “commit”, solo proponer mensaje corto en inglés (~50 chars), sin ejecutar git salvo que lo pida explícito.

## Local
python3 -m http.server 8000 (o 8001 si 8000 ocupado). content.md requiere servidor (fetch).

## Pendiente / no inventar
- Textos y fotos reales de la propietaria.
- Completar stampPages para más sellos; afinar iconos en art.js.
- Sello de amistad solo en farewell (fuera de los 31).
- No backend, no historias inventadas.

Al trabajar: leer content.md y requirement.md; no hardcodear capítulos/títulos fuera de content.md; cambios mínimos; preguntar si falta algo crítico.