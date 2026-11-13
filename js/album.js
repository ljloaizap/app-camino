/*
 * Memories album.
 * Each photo: { src: 'assets/photos/…', alt: required description, ratio: 'landscape' | 'portrait' | 'square' | 'panorama', caption }
 * While src is null, a placeholder with the label is shown.
 */
(function () {
  'use strict';
  const C = (window.CAMINO = window.CAMINO || {});

  C.album = [
    {
      id: 'landscapes',
      title: 'Paisajes y naturaleza',
      photos: [
        { src: null, alt: '', ratio: 'landscape', label: 'Fotografía horizontal', caption: '[Caption pendiente]' },
        { src: null, alt: '', ratio: 'portrait', label: 'Fotografía vertical', caption: null },
        { src: null, alt: '', ratio: 'square', label: 'Fotografía cuadrada', caption: null },
      ],
    },
    {
      id: 'stages',
      title: 'Caminos y etapas',
      photos: [
        { src: null, alt: '', ratio: 'square', label: 'Fotografía cuadrada', caption: null },
        { src: null, alt: '', ratio: 'landscape', label: 'Fotografía horizontal', caption: '[Caption pendiente]' },
        { src: null, alt: '', ratio: 'portrait', label: 'Fotografía vertical', caption: null },
      ],
    },
  ];
})();
