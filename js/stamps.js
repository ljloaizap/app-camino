/*
 * Stamp page layouts only (photos, texts, layout type).
 * Chapters, titles and index come from content.md via content.js.
 *
 * layout `symbol` — field `description` accepts trusted HTML, e.g.:
 *   <strong>negrilla</strong>
 *   <span class="text-blue">azul</span>
 *   <span class="text-terra">terracota</span>
 *   <span class="text-marker">destaque tipo flecha</span>
 *
 *   photo: { src: 'assets/photos/13/archivo.jpg', alt: '…', ratio, label } — debajo de «Símbolo #»
 */
(function () {
  'use strict';
  const C = (window.CAMINO = window.CAMINO || {});

  C.stampPages = {
    3: {
      status: 'draft',
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
      status: 'draft',
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

    13: {
      status: 'ready',
      layout: 'symbol',
      symbolNumber: '#1',
      name: 'Flecha amarilla',
      photo: {
        src: 'assets/photos/camino_symbols/flecha_amarilla.jpeg',
        alt: 'Flecha amarilla en el Camino de Santiago',
        ratio: 'landscape',
        label: 'Flecha amarilla',
      },
      description: [
        'Nos indican la <strong>dirección</strong> del Camino y de no ser por ellas, a veces no sabríamos a dónde ir.',
        'Al encontrarlas, recuperamos la <span class="text-blue">confianza</span> de saber que vamos en la dirección correcta.',
        '<br />',
        '<br />',
        '<strong>¡Cuánto ayuda que en el Camino alguien haya pintado las <span class="text-marker">flechas amarillas</span></strong>!',
        '<br />',
        '<br />',
        'En ocasiones nos sentimos <span class="text-terra">perdidos</span> y nos frustramos al no encontrar dirección, ni referencias que nos den seguridad.',
      ].join(' '),
      question: '¿Qué flechas sigues? ¿A quién o qué miras para encontrar orientación?',
      quote: {
        text: '"YO SOY EL CAMINO, LA VERDAD Y LA VIDA"',
        attribution: 'JESÚS DE NAZARET - LA BIBLIA',
      },
    },
  };
})();