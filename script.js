// ローディング画面
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  if (loading) {
    setTimeout(() => {
      loading.classList.add('hidden');
    }, 500);
  }
});

// スクロールインジケーター
const scrollIndicator = document.querySelector('.scroll-indicator');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollIndicator) {
    if (scrollTop > 100) {
      scrollIndicator.classList.add('hidden');
    } else {
      scrollIndicator.classList.remove('hidden');
    }
  }
  
  lastScrollTop = scrollTop;
});

// 画像回転アニメーション
const img = document.getElementById("rotatingImage");
let angle = 0;
if (img) {
  img.style.willChange = 'transform';
  img.style.transformOrigin = 'center center';
  
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
    a.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
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
    
    if (this.totalSlides > 0) {
      this.init();
    }
  }
  
  init() {
    if (this.totalSlides > 1) {
      this.createIndicators();
      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
      this.updateCarousel();
    } else {
      // スライドが1つだけの場合はボタンとインジケーターを非表示
      if (this.prevBtn) this.prevBtn.style.display = 'none';
      if (this.nextBtn) this.nextBtn.style.display = 'none';
      if (this.indicatorsContainer) this.indicatorsContainer.style.display = 'none';
    }
  }
  
  createIndicators() {
    if (!this.indicatorsContainer) return;
    
    this.indicatorsContainer.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => this.goToSlide(i));
      this.indicatorsContainer.appendChild(indicator);
    }
  }
  
  updateCarousel() {
    if (this.slides) {
      this.slides.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
    
    const indicators = this.indicatorsContainer?.querySelectorAll('.indicator');
    if (indicators) {
      indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === this.currentIndex);
      });
    }
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
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// WORKSカテゴリーフィルター
const worksCategoryTabs = document.querySelectorAll('.works-section .category-tab');
const workCards = document.querySelectorAll('.works-section .work-card');

worksCategoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.getAttribute('data-category');
    
    // アクティブタブの更新
    worksCategoryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // カードのフィルタリング
    workCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// SHOPカテゴリーフィルター
const shopCategoryTabs = document.querySelectorAll('.shop-section .category-tab');
const shopItems = document.querySelectorAll('.shop-section .shop-item');

shopCategoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.getAttribute('data-shop-category');
    
    shopCategoryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // ここで将来のショップアイテムをフィルタリングできるように準備
    shopItems.forEach(item => {
      const itemCategory = item.getAttribute('data-shop-category');
      if (category === 'all' || !itemCategory || itemCategory === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// NEWSカテゴリーフィルター
const newsCategoryTabs = document.querySelectorAll('.news-section .category-tab');
const newsItems = document.querySelectorAll('.news-section .news-item');

newsCategoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.getAttribute('data-news-category');
    
    newsCategoryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    newsItems.forEach(item => {
      const itemCategory = item.getAttribute('data-news-category');
      if (category === 'all' || itemCategory === category) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// フォーム送信処理（簡易版）
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('お問い合わせありがとうございます。メールアドレスにご連絡いたします。');
    contactForm.reset();
  });
}

// スクロール時のヘッダー表示制御
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.style.boxShadow = 'none';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }
  
  lastScroll = currentScroll;
});
