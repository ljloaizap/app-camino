/*
 * Credential content.
 * - chapters: thematic grouping shown in the stamp index (provisional).
 * - leaves: stamps shown on each credential leaf (2 to 4 per leaf).
 * - stamps: content of developed stamps. Any stamp not listed here is shown as pending.
 */
(function () {
  'use strict';
  const C = (window.CAMINO = window.CAMINO || {});

  C.TOTAL_STAMPS = 31;

  C.chapters = [
    { id: 'chapter-1', title: 'Capítulo pendiente', stamps: [1, 2, 3, 4] },
    { id: 'chapter-2', title: 'Preparando al peregrino', stamps: [5, 6, 7, 8] },
    { id: 'chapter-3', title: 'Capítulo pendiente', stamps: [9, 10, 11, 12] },
    { id: 'chapter-4', title: 'El Camino', stamps: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] },
    { id: 'chapter-5', title: 'Capítulo pendiente', stamps: [25, 26, 27, 28, 29, 30, 31] },
  ];

  C.leaves = [
    [1, 2],
    [3, 4],
    [5, 6, 7, 8],
    [9, 10],
    [11, 12],
    [13, 14, 15],
    [16, 17, 18, 19],
    [20, 21],
    [22, 23, 24],
    [25, 26, 27],
    [28, 29, 30, 31],
  ];

  C.stamps = {
    5: {
      title: 'Preparación física',
      status: 'ready',
      layout: 'prep',
      editorialTitle: 'El cuerpo también hace el Camino',
      art: { shape: 'circle', icon: 'boot', top: 'Preparación física', bottom: 'Sello 05', color: 'blue' },
      photo: { src: null, alt: '', ratio: 'portrait', label: 'Fotografía de entrenamiento' },
      text: [
        '[Texto personal pendiente: cómo fue la preparación física antes del Camino.]',
        '[Párrafo opcional pendiente.]',
      ],
      tips: {
        title: 'Recomendaciones prácticas',
        items: ['[Recomendación pendiente]', '[Recomendación pendiente]', '[Recomendación pendiente]'],
      },
      note: { label: 'Nota del diario', text: '[Anotación pendiente]' },
    },

    13: {
      title: 'El Camino: Día 1',
      status: 'ready',
      layout: 'day',
      heading: 'Día 1',
      date: '[Fecha pendiente]',
      art: { shape: 'rect', icon: 'arrow', top: 'El Camino', label: 'Día 1', color: 'terra' },
      hero: { src: null, alt: '', ratio: 'panorama', label: 'Fotografía panorámica del día' },
      moments: {
        title: 'Momentos del día',
        items: [
          '[Momento significativo pendiente]',
          '[Momento significativo pendiente]',
          '[Momento significativo pendiente]',
        ],
      },
      facts: [
        { label: 'Distancia', value: '[Pendiente]' },
        { label: 'Recorrido', value: '[Pendiente]' },
        { label: 'Alojamiento', value: '[Pendiente]' },
        { label: 'Anécdota', value: '[Pendiente]' },
      ],
      secret: {
        photo: { src: null, alt: '', ratio: 'square', label: 'Fotografía con historia' },
        button: 'Hay una historia detrás de esta foto',
        buttonOpen: 'Ocultar la historia',
        story: '[Historia oculta pendiente]',
      },
    },
  };
})();
