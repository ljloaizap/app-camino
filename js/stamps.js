/*
 * Stamp page layouts only (photos, texts, layout type).
 * Chapters, titles and index come from content.md via content.js.
 */
(function () {
  'use strict';
  const C = (window.CAMINO = window.CAMINO || {});

  C.stampPages = {
    3: {
      status: 'ready',
      layout: 'prep',
      editorialTitle: 'El cuerpo también hace el Camino',
      art: { shape: 'circle', icon: 'boot', top: 'Preparación', bottom: 'Sello', color: 'blue' },
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

    7: {
      status: 'ready',
      layout: 'day',
      date: '[Fecha pendiente]',
      art: {
        shape: 'jacobean',
        color: 'terra',
        route: 'Camino de Santiago',
        from: 'Sarria',
        to: 'Portomarín',
        day: '1',
        km: 'K.111',
      },
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