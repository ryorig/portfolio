// 画像回転アニメーション
const img = document.getElementById("rotatingImage");
let angle = 0;
if (img) {
  img.style.willChange = 'transform';
  
  function rotate() {
    angle = (angle + 0.5) % 360;
    img.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    requestAnimationFrame(rotate);
  }
  
  rotate();
}

// ハンバーガーメニュー
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => { navLinks.classList.remove('active'); });
  });
}

// カルーセル機能
class Carousel {
  constructor(container) {
    this.container = container;
    this.slides = container.querySelector('.carousel-slides');
    this.slideElements = container.querySelectorAll('.carousel-slide');
    this.prevBtn = container.querySelector('.prev');
    this.nextBtn = container.querySelector('.next');
    this.indicatorsContainer = container.querySelector('.carousel-indicators');
    this.currentIndex = 0;
    this.totalSlides = this.slideElements.length;
    
    this.init();
  }
  
  init() {
    this.createIndicators();
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    this.updateCarousel();
  }
  
  createIndicators() {
    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => this.goToSlide(i));
      this.indicatorsContainer.appendChild(indicator);
    }
  }
  
  updateCarousel() {
    this.slides.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    
    const indicators = this.indicatorsContainer.querySelectorAll('.indicator');
    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === this.currentIndex);
    });
  }
  
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarousel();
  }
  
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }
}

// 全てのカルーセルを初期化
document.querySelectorAll('.carousel-container').forEach(container => {
  new Carousel(container);
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
