import React from 'react';
import { render, screen } from '@testing-library/react';
import Carousel from './Carousel';

describe('Carousel Component', () => {
  describe('Renderizado básico', () => {
    it('debe renderizar el contenedor principal del carousel', () => {
      render(<Carousel />);
      const carousel = document.querySelector('#carouselExampleIndicators');
      expect(carousel).toBeTruthy();
    });

    it('debe tener 3 indicadores', () => {
      render(<Carousel />);
      const indicators = document.querySelectorAll('.carousel-indicators li');
      expect(indicators.length).toBe(3);
    });

    it('debe tener 3 elementos en el carrusel', () => {
      render(<Carousel />);
      const items = document.querySelectorAll('.carousel-item');
      expect(items.length).toBe(3);
    });

    it('el primer elemento debe tener la clase "active"', () => {
      render(<Carousel />);
      const firstItem = document.querySelector('.carousel-item.active');
      expect(firstItem).toBeTruthy();
    });
  });

  describe('Imágenes y enlaces', () => {
    it('debe renderizar las imágenes con sus alt correctos', () => {
      render(<Carousel />);
      expect(screen.getByAltText('Ofertas gamer')).toBeTruthy();
      expect(screen.getByAltText('Rog Ally x')).toBeTruthy();
      expect(screen.getByAltText('Asus rog strix')).toBeTruthy();
    });

    it('cada imagen debe estar dentro de un enlace a /productos', () => {
      render(<Carousel />);
      const links = document.querySelectorAll('.carousel-item a[href="/productos"]');
      expect(links.length).toBe(3);
    });
  });

  describe('Controles de navegación', () => {
    it('debe tener botón de "anterior"', () => {
      render(<Carousel />);
      const prevButton = document.querySelector('.carousel-control-prev');
      expect(prevButton).toBeTruthy();
      expect(prevButton.getAttribute('data-bs-slide')).toBe('prev');
    });

    it('debe tener botón de "siguiente"', () => {
      render(<Carousel />);
      const nextButton = document.querySelector('.carousel-control-next');
      expect(nextButton).toBeTruthy();
      expect(nextButton.getAttribute('data-bs-slide')).toBe('next');
    });
  });
});
