const img = document.getElementById("rotatingImage");
let angle = 0;

if (img) {
  img.style.willChange = 'transform';
  
  function rotate() {
    angle = (angle + 0.5) % 360; // 0.5度ずつ回転（より滑らか）
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
