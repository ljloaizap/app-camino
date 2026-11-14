# Contenido de la credencial

Tabla maestra para capítulos y sellos (31). La app carga este archivo al iniciar (`js/content.js`): índice, credencial e hojas usan solo estos datos.

Los textos largos y diseños de cada sello listo viven en `js/stamps.js` (`stampPages`), referenciados por número de sello.

**Leyenda:** títulos entre corchetes son provisionales hasta que los completes tú.

| Capítulo | Sello |
| --- | --- |
| ¿Quejeso? | 01 — ¿Qué es "El Camino de Santiago"?|
| ¿Quejeso? | 02 — ¿Quién es Santiago?|
| Preparando al peregrino | 03 — Preparación física, mental y espiritual |
| Preparando al peregrino | 04 — Preparación económica – Presupuesto / Gastos |
| Preparando al peregrino | 05 — Equipaje |
| Preparando al peregrino | 06 — Itinerario |
| El Camino | 07 — Día 1 (Sarria – Portomarín) |
| El Camino | 08 — Día 2 (Portomarín – Palas de Rei) |
| El Camino | 09 — Día 3 (Palas de Rei – Melide) |
| El Camino | 10 — Día 4 (Melide – Arzúa) |
| El Camino | 11 — Día 5 (Arzúa – O Pedrouzo) |
| El Camino | 12 — Día 6 (O Pedrouzo – Santiago) |
| Símbolos del Camino | 13 — Flecha Amarilla |
| Símbolos del Camino | 14 — Mochila |
| Símbolos del Camino | 15 — Curita / Tirita |
| Símbolos del Camino | 16 — Bastón |
| Símbolos del Camino | 17 — Concha de la vieira |
| La Meta: Santiago | 18 — Llegando a La catedral |
| La Meta: Santiago | 19 — La credencial con sus sellitos |
| La Meta: Santiago | 20 — La compostela |
| La Meta: Santiago | 21 — Misa de peregrinos + Botafumeiro |
| La Meta: Santiago | 22 — Turisteando por Santi |
| Amigos del Camino | 23 — Los japonesitos |
| Amigos del Camino | 24 — Young Lady |
| Amigos del Camino | 25 — Amigos por el mundo |
| Epílogo | 26 — El regreso: volver a casa |
| Epílogo | 27 — Lo que permanece |
| Capítulo pendiente | 28 — [Pendiente] |
| Capítulo pendiente | 29 — [Pendiente] |
| Capítulo pendiente | 30 — [Pendiente] |
| Capítulo pendiente | 31 — [Pendiente] |

---

*Fuera de esta tabla:* sello de amistad (despedida), no cuenta entre los 31.

*Hojas de la credencial:* por defecto hay **una hoja por capítulo** (todos sus sellos en la misma hoja). Para repartir en varias hojas, añade una sección `### Hojas` con la misma tabla (capítulo + sello por fila; cada capítulo puede repetirse en varias filas agrupando sellos).