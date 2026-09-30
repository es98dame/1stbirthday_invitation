// ========== Flower Rain Animation ==========
function createFlowerLeaves() {
  const container = document.getElementById('flower-rain');
  for (let i = 0; i < 12; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'flower-leaf';

    const fallDelay = (12 * Math.random()) + 's';
    const shakeDelay = (3 * Math.random()) + 's';
    const shakeDegree = (360 * Math.random()) + 'deg';
    const leftPosition = (100 * Math.random()) + '%';
    const translateX = (60 * Math.random() + 20) + 'px';
    const fallDuration = (7 * Math.random() + 9) + 's';
    const shakeDuration = (1 * Math.random() + 2) + 's';

    leaf.style.setProperty('--fall-delay', fallDelay);
    leaf.style.setProperty('--shake-delay', shakeDelay);
    leaf.style.setProperty('--shake-degree', shakeDegree);
    leaf.style.setProperty('--left-position', leftPosition);
    leaf.style.setProperty('--translate-x', translateX);
    leaf.style.setProperty('--fall-duration', fallDuration);
    leaf.style.setProperty('--shake-duration', shakeDuration);

    const num = Math.floor(5 * Math.random() + 1);
    leaf.innerHTML = '<img src="./img/floral-leaf/floral-leaf-' + num + '.png" alt="">';
    container.appendChild(leaf);
  }
}

// ========== Gallery Carousel ==========
var gallery = {
  curPos: 0,
  startX: 0,
  slides: null,
  track: null,
  slideWidth: 166, // 150px + 16px margin
  totalImages: 9
};

function initGallery() {
  gallery.track = document.querySelector('.gallery-track');
  gallery.slides = document.querySelectorAll('.gallery-slide');
  if (!gallery.track || !gallery.slides.length) return;
  gallery.totalImages = gallery.slides.length;

  gallery.track.addEventListener('touchstart', function(e) {
    gallery.startX = e.touches[0].pageX;
  });

  gallery.track.addEventListener('touchend', function(e) {
    var diff = gallery.startX - e.changedTouches[0].pageX;
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        galleryNext();
      } else {
        galleryPrev();
      }
    }
  });

  // 클릭: active면 라이트박스, 아니면 해당 슬라이드로 이동
  gallery.slides.forEach(function(slide, index) {
    slide.addEventListener('click', function() {
      if (slide.classList.contains('active')) {
        openLightbox(index);
      } else {
        goToSlide(index);
      }
    });
  });

  goToSlide(0);
}

function goToSlide(index) {
  if (index < 0 || index >= gallery.totalImages) return;
  gallery.curPos = index;

  var offset = -(index * gallery.slideWidth);
  gallery.track.style.transform = 'translateX(' + offset + 'px)';

  gallery.slides.forEach(function(slide, i) {
    slide.classList.remove('active', 'adjacent');
    if (i === index) {
      slide.classList.add('active');
    } else if (Math.abs(i - index) === 1) {
      slide.classList.add('adjacent');
    }
  });

  updateDots();
}

function galleryPrev() {
  if (gallery.curPos > 0) goToSlide(gallery.curPos - 1);
}

function galleryNext() {
  if (gallery.curPos < gallery.totalImages - 1) goToSlide(gallery.curPos + 1);
}

function updateDots() {
  var dots = document.querySelectorAll('.gallery-dots .dot');
  dots.forEach(function(dot, index) {
    dot.classList.toggle('active', index === gallery.curPos);
  });
}

// ========== Map Navigation ==========
function openNaverMap() {
  window.location.href = 'nmap://search?query=서울특별시 서초구 강남대로 213 엘타워&appname=invitation.damikim.site';
}

function openKakaoMap() {
  window.location.href = 'kakaomap://search?q=서울특별시 서초구 강남대로 213 엘타워';
}

function openTmap() {
  window.location.href = 'tmap://search?name=서울특별시 서초구 강남대로 213 엘타워';
}

function openKakaoTaxi() {
  window.location.href = 'https://t.kakao.com/launch?type=taxi&dest_lat=37.4888739&dest_lng=126.7552879&ref=localweb';
}

// ========== Scroll Animation ==========
function initScrollAnimation() {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('[data-animate]').forEach(function(el) {
    observer.observe(el);
  });
}

// ========== Kakao Map ==========
var kakaoMapInstance = null;

function initKakaoMap() {
  var section = document.querySelector('.map-section');
  var container = document.getElementById('kakao-map');
  if (!section || !container) return;

  function buildMap() {
    if (typeof kakao === 'undefined' || !kakao.maps) return;

    kakao.maps.load(function() {
      if (kakaoMapInstance) {
        kakaoMapInstance.relayout();
        return;
      }

      var position = new kakao.maps.LatLng(37.48224367567564, 127.03560349216255);
      kakaoMapInstance = new kakao.maps.Map(container, {
        center: position,
        level: 3
      });

      var marker = new kakao.maps.Marker({ position: position });
      marker.setMap(kakaoMapInstance);

      setTimeout(function() {
        if (kakaoMapInstance) kakaoMapInstance.relayout();
      }, 300);
    });
  }

  var mapObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        buildMap();
      }
    });
  }, { threshold: 0.15 });

  mapObserver.observe(section);
}

// ========== D-Day Counter ==========
function updateDday() {
  var el = document.getElementById('dday-counter');
  if (!el) return;

  var birthday = new Date('2026-02-15T12:00:00+09:00');
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  birthday.setHours(0, 0, 0, 0);

  var diff = Math.ceil((birthday - today) / (1000 * 60 * 60 * 24));

  if (diff > 0) {
    el.innerHTML = '루나, 루미의 첫돌까지 <span class="dday-num">' + diff + '</span>일';
  } else if (diff === 0) {
    el.innerHTML = '오늘은 루나, 루미의 <span class="dday-num">첫돌</span>입니다!';
  } else {
    el.innerHTML = '루나, 루미의 첫돌 <span class="dday-num">+' + Math.abs(diff) + '</span>일';
  }
}

// ========== Background Music ==========
var bgMusic = null;
var musicBtn = null;
var musicStarted = false;

function initMusic() {
  bgMusic = document.getElementById('bg-music');
  musicBtn = document.getElementById('music-btn');

  // 사용자 첫 터치/클릭 시 자동 재생 시도
  function startMusic() {
    if (musicStarted) return;
    musicStarted = true;
    bgMusic.volume = 0.4;
    bgMusic.play().then(function() {
      musicBtn.classList.add('playing');
      musicBtn.classList.remove('paused');
    }).catch(function() {
      musicBtn.classList.add('paused');
    });
    document.removeEventListener('touchstart', startMusic);
    document.removeEventListener('click', startMusic);
  }

  document.addEventListener('touchstart', startMusic, { once: true });
  document.addEventListener('click', startMusic, { once: true });
}

function toggleMusic() {
  if (!bgMusic) return;
  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.classList.add('playing');
    musicBtn.classList.remove('paused');
  } else {
    bgMusic.pause();
    musicBtn.classList.remove('playing');
    musicBtn.classList.add('paused');
  }
}

// ========== Lightbox ==========
var lightboxIndex = 0;
var lightboxImages = [
  './gallery/1.jpg',
  './gallery/2.jpg',
  './gallery/3.jpg',
  './gallery/4.jpg',
  './gallery/5.jpg',
  './gallery/6.jpg',
  './gallery/7.jpg',
  './gallery/8.jpg',
  './gallery/9.jpg'
];

function openLightbox(index) {
  lightboxIndex = index;
  var lb = document.getElementById('lightbox');
  var img = document.getElementById('lightbox-img');
  img.src = lightboxImages[index];
  document.getElementById('lightbox-index').textContent = index + 1;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('lightbox-close')) return;
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function lightboxPrev(e) {
  if (e) e.stopPropagation();
  if (lightboxIndex > 0) openLightbox(lightboxIndex - 1);
}

function lightboxNext(e) {
  if (e) e.stopPropagation();
  if (lightboxIndex < lightboxImages.length - 1) openLightbox(lightboxIndex + 1);
}

function initLightbox() {
  var lb = document.getElementById('lightbox');
  var startX = 0;
  lb.addEventListener('touchstart', function(e) {
    startX = e.touches[0].pageX;
  });
  lb.addEventListener('touchend', function(e) {
    var diff = startX - e.changedTouches[0].pageX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) lightboxNext();
      else lightboxPrev();
    }
  });
}

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', function() {
  createFlowerLeaves();
  initGallery();
  initScrollAnimation();
  initKakaoMap();
  initMusic();
  initLightbox();
});
