# Plan: Credencial digital del Camino (primera entrega)

Documento de planificación derivado de `requirement.md`. No sustituye los requisitos; los refleja con decisiones de arquitectura acordadas.

## Estado del repositorio

Al inicio del proyecto: solo `requirement.md` y git. Sitio estático para GitHub Pages.

## Enfoque técnico

| Decisión | Elección | Motivo |
|----------|----------|--------|
| Arquitectura | **Varias páginas HTML ligeras** | Legibilidad al crecer a 31 sellos; contenido en datos, no HTML masivo (`requirement.md` §7). |
| Stack | HTML + CSS + JavaScript vanilla | Sin build ni frameworks. |
| Contenido de sellos | `stamps.js` (y opcionalmente JSON por sello más adelante) | Editar sellos sin tocar la lógica de navegación. |
| Plantilla de sello | **Un solo** `stamp.html` con `?id=` | No crear 31 archivos HTML. |
| Iconos | SVG inline (estilo sello + símbolos por tema) | Sin dependencias CDN innecesarias. |
| Tipografías | Google Fonts: Cormorant Garamond + Lato | Adecuado para GitHub Pages. |
| Audio | Reproductor persistente; navegación interna sin recarga (`app.js` reemplaza el contenido, no la página) | El sonido nunca se interrumpe al navegar (`requirement.md` §4). |

## Estructura de archivos

```
index.html              # Portada (credencial cerrada)
credential.html         # Credencial abierta + anterior/siguiente (?leaf=N)
stamp-index.html        # Índice de 31 sellos por capítulos
stamp.html              # Plantilla única (?id=5, ?id=13, …)
album.html              # Recuerdos del Camino (estructura inicial)
farewell.html           # Despedida + sello de amistad
css/
  styles.css            # tokens, textura papel, layout, componentes, responsive, a11y
js/
  app.js                # navegación, render de vistas, revelar/ocultar reutilizable
  stamps.js             # capítulos, hojas (leaves), contenido completo solo 05 y 13
  album.js              # categorías y fotos del álbum
  art.js                # sellos gráficos y vieira en SVG
  music.js              # YouTube ambiental, play/mute, sin autoplay, manejo de errores
assets/
  photos/               # fotos reales de la propietaria (.gitkeep)
  audio/                # reserva opcional
```

Nombres de archivos, código, clases, ids y comentarios en inglés. Español solo para el contenido visible.

## Modelo de datos (`stamps.js`)

- **Capítulos:** `{ id, title, stampIds[] }` (agrupación provisional).
- **Sellos:** `{ id, chapterId, title, editorialTitle?, date?, status: 'ready' | 'pending', layout: 'prep' | 'day1' | …, blocks? }`.
- Solo los sellos **05** y **13** llevan `blocks` y `status: 'ready'`.
- El resto aparece en el índice como pendiente, sin páginas ficticias.

## Fases de implementación

### Fase A — Sistema de diseño y base

- HTML semántico por página (`header`, `main`, `nav`, `section`, `article`, `footer`).
- Variables CSS (paleta §3), textura de papel sutil, tipografía.
- Estados interactivos: hover, focus, activo; `prefers-reduced-motion`.
- Control de sonido ambiental visible (mismo patrón en cada página).

### Fase B — Portada y credencial

- Portada: credencial cerrada, «El Camino de Santiago», vieira central, CTA «Abrir la credencial del peregrino».
- Credencial abierta: navegación simple (transición, no simulación física de hojas).
- Controles: anterior / siguiente, índice, volver a portada.

### Fase C — Índice (31 sellos)

- Capítulos con títulos provisionales alineados a la narrativa del Camino.
- Tiles de sello; solo **05** y **13** enlazan a contenido; otros indican contenido pendiente.

### Fase D — Sellos 05 y 13 (composiciones distintas)

**Sello 05 — Preparación física**

- Capítulo: Preparando al peregrino.
- Título editorial: «El cuerpo también hace el Camino».
- Placeholders: foto entrenamiento, texto personal, recomendaciones prácticas, nota de diario.
- Sello gráfico (botas / caminata).

**Sello 13 — El Camino: Día 1**

- Título y fecha (placeholder).
- Foto panorámica protagonista (placeholder).
- Momentos significativos, datos secundarios (distancia, recorrido, alojamiento).
- Fotografía adicional con historia oculta (mecanismo `reveal`).

### Fase E — Vieira y sorpresas

- Vieira clickeable: muestra reverso con mensaje de ejemplo (placeholder).
- Componente `reveal` reutilizable: clic, `aria-expanded`, teclado.

### Fase F — Sonido ambiental (`music.js`)

- Recurso: https://youtu.be/PvZUKykChFc
- API YouTube embebida; sin autoplay al cargar.
- Activar / silenciar; sin errores en consola si falla el enlace.
- El reproductor se prepara en silencio al cargar; suena con el primer clic («Activar sonido» o «Abrir credencial»).
- Navegación interna sin recarga: el audio nunca se interrumpe. Solo F5 o abrir una URL directa lo detienen.

### Fase G — Álbum y despedida (andamiaje)

- «Recuerdos del Camino»: una o dos categorías placeholder, ampliar foto + caption cuando existan.
- Despedida y sello de amistad (fuera de los 31): solo placeholders.

### Fase H — Aceptación y pulido

- Escritorio primero; móvil vertical cuando haga falta.
- Teclado: foco visible, botones activables.
- Prueba sin errores en consola en flujo habitual.
- Listo para publicar en GitHub Pages.

## Alcance de la primera entrega (checklist)

1. Portada con credencial cerrada.
2. Apertura de la credencial.
3. Índice con 31 sellos agrupados provisionalmente.
4. Navegación entre vistas / páginas.
5. Página del sello 05.
6. Página del sello 13.
7. Vieira interactiva con contenido oculto de ejemplo.
8. Reproductor YouTube con activación manual.
9. Estructura inicial del álbum.
10. Despedida provisional.

## Fuera de alcance (esta entrega)

- 29 sellos con contenido completo.
- Álbum con todas las categorías.
- Textos y fotos definitivos.
- Backend, persistencia, imágenes IA o stock.
- Historias personales inventadas.

## Puntos abiertos (confirmar con la propietaria)

1. Copy de UI en español (asumido sí).
2. Lista definitiva de capítulos para los 31 sellos (hasta entonces: agrupación provisional).
3. Fotos reales en `assets/photos/` cuando estén disponibles.

## Criterios de aceptación (resumen)

Ver `requirement.md` §10. Destacar decisiones de este plan:

- Varios HTML pequeños + `stamps.js` para escalar sin un `index.html` gigante.
- Audio continuo durante toda la navegación interna.
- Dos sellos con layouts visualmente diferentes; resto pendiente en índice.
- Calidad visual, legibilidad y simplicidad por encima de efectos innecesarios.
