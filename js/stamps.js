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
 *
 * layout `experience` — experiencias vividas (capítulo Experiencias):
 *   experienceType: etiqueta del tipo (ej. «Bellezas de la vida»)
 *   headline: título editorial opcional (si falta, usa el título del sello)
 *   intro: string o string[] opcional — párrafo breve antes de los momentos
 *   experiences: 2–4 entradas, cada una con:
 *     title?: nombre del momento (si falta y hay varias: «Momento 1», …)
 *     date: fecha de la experiencia (texto libre, ej. «12 de junio de 2025»)
 *     moment: { stage, place }
 *     photo: { src, alt, ratio, label, caption? }
 *     description: string[] o HTML (como `symbol`)
 *     senses?: string[] — etiquetas opcionales
 *     takeaway: { label?, text } — cierre de ese momento («Lo que me quedó»)
 *
 * layout `day` — etapas del Camino (capítulo El Camino):
 *   date: fecha del día
 *   heading: título editorial (si falta, usa el título del sello)
 *   route: { from, to, distance } — origen, destino y km (el sello gráfico usa `art.from` / `art.to` si coinciden)
 *   hero: foto panorámica del día
 *   description: string[] o HTML — relato del día
 *   highlights: { good?: { title?, items[] }, rough?: { title?, items[] } } — lo bueno y lo duro
 *   moments: { title, items[] } — 2–4 momentos memorables (línea de tiempo)
 *   facts: { label, value }[] — datos extra (alojamiento, clima, …)
 *   map: { src, alt, ratio, label, caption? } opcional — captura de ruta (no mapa interactivo)
 *   secret: foto + historia desplegable (sorpresa opcional)
 *   art: { shape: 'jacobean', from, to, day, km, … } — sello tipo credencial
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
      status: 'ready',
      layout: 'day',
      date: '24 de abril de 2026',
      route: { from: 'Sarria', to: 'Portomarín', distance: '22 kms' },
      art: {
        shape: 'jacobean',
        color: 'terra',
        route: 'Camino de Santiago',
        from: 'Sarria',
        to: 'Portomarín',
        day: '1',
        km: 'K.111',
      },
      hero: { 
        src: 'assets/photos/dia1.jpg', 
        alt: '', 
        ratio: 'panorama', 
        label: 'Fotografía panorámica del día' 
      },
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget lorem nisl. Mauris dui diam, faucibus quis ligula vel, tempor efficitur ante. Donec vulputate a sem sed rutrum. Mauris risus dui, volutpat id venenatis tincidunt, accumsan a enim. Duis auctor nibh vel eros rutrum euismod. Integer aliquet vel dolor quis malesuada. Nunc lectus lorem, pharetra non massa lobortis, porta vehicula erat.',
        '(Párrafo opcional): Donec finibus iaculis eros vitae fermentum. Vestibulum dignissim nulla sit amet consectetur pharetra.]',
      ],
      highlights: {
        good: {
          title: 'Lo que brilló',
          items: ['[Algo bueno de la etapa pendiente]', '[Otro detalle positivo pendiente]'],
        },
        rough: {
          title: 'Lo que costó',
          items: ['[Algo duro o incómodo pendiente]'],
        },
      },
      moments: {
        title: 'Momentos del día',
        items: [
          '[Momento significativo pendiente]',
          '[Momento significativo pendiente]',
          '[Momento significativo pendiente]',
        ],
      },
      facts: [
        { label: 'Alojamiento', value: '[Pendiente]' },
        { label: 'Clima', value: '[Pendiente]' },
        { label: 'Compañía', value: '[Pendiente]' },
        { label: 'Nota rápida', value: '[Pendiente]' },
      ],
      map: {
        src: null,
        alt: '',
        ratio: 'landscape',
        label: 'Mapa o esquema de la ruta',
        caption: '[Opcional: captura de Wikiloc, Google Maps o dibujo simple]',
      },
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

    27: {
      status: 'ready',
      layout: 'experience',
      experienceType: 'Bellezas de la vida',
      experiences: [
        {
          title: 'Pajaritos cantando',
          date: '24 de abril de 2026',
          moment: { stage: 'Sarria - Portomarín', place: 'Pensión Mar' },
          photo: {
            src: 'assets/photos/foto_bosque.jpg',
            alt: '',
            ratio: 'landscape',
            label: 'Fotografía del momento 1',
            caption: 'Pajaritos cantando',
          },
          description: ['Donec vulputate a sem sed rutrum. Mauris risus dui, volutpat id venenatis tincidunt, accumsan a enim.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget lorem nisl. Mauris dui diam, faucibus quis ligula vel, tempor efficitur ante. Donec vulputate a sem sed rutrum. Mauris risus dui, volutpat id venenatis tincidunt, accumsan a enim. Duis auctor nibh vel eros rutrum euismod. Integer aliquet vel dolor quis malesuada.'
          ],
          takeaway: {
            label: 'Lo que me quedó',
            text: 'Nunc condimentum nunc quis ante ornare aliquet.',
          },
        },
        {
          title: '[Título del momento 2 pendiente]',
          date: '[Fecha pendiente]',
          moment: { stage: '[Etapa pendiente]', place: '[Lugar pendiente]' },
          photo: {
            src: null,
            alt: '',
            ratio: 'portrait',
            label: 'Fotografía del momento 2',
            caption: '[Pie de foto pendiente]',
          },
          description: ['[Texto personal pendiente.]'],
          takeaway: {
            label: 'Lo que me quedó',
            text: '[Frase pendiente para el momento 2.]',
          },
        },
        {
          title: '[Título del momento 3 pendiente]',
          date: '[Fecha pendiente]',
          moment: { stage: '[Etapa pendiente]', place: '[Lugar pendiente]' },
          photo: {
            src: null,
            alt: '',
            ratio: 'square',
            label: 'Fotografía del momento 3',
            caption: '[Pie de foto pendiente]',
          },
          description: ['[Texto personal pendiente.]'],
          takeaway: {
            label: 'Lo que me quedó',
            text: '[Frase pendiente para el momento 3.]',
          },
        },
      ],
    },
  };
})();