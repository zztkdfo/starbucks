const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

// search div 를 클릭하면 포커스 적용
searchEl.addEventListener('click', ()=>{
  searchInputEl.focus();
})

searchInputEl.addEventListener('focus', ()=>{
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
})

searchInputEl.addEventListener('blur', ()=>{
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
})

// badges controll
const badgeEl = document.querySelector('header .badges');
// throttle(함수, 시간) = 실행 함수를 시간 단위로 할 수 있도록 가능 
window.addEventListener('scroll', _.throttle(function (){
  if (window.scrollY > 500){
    // 배지 숨기기 (gsap 사용 전 부자연스러움)
    // badgeEl.style.display = 'none'
    // gsap 라이브러리 사용
    // gsap.to(요소, 지속시간, 옵션)
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // 버튼 보이기
    gsap.to('#to-top', .2, {
      x: 0
    })
  } else {
    // 배지 보이기 (gsap 사용 전 부자연스러움)
    // badgeEl.style.display = 'block'
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 버튼 숨기기
    gsap.to('#to-top', .2, {
      x: 100
    })
  }
}, 300))

const toTopEl = document.querySelector('#to-top')
toTopEl.addEventListener('click', () => {
  gsap.to(window, .7, {
    scrollTo: 0
  })
})

// visual 영역 fade-in 출력 하기
const fadeEls = document.querySelectorAll('.visual .fade-in')
fadeEls.forEach((el, index)=>{
  gsap.to(el, 1, {
    // 딜레이 index를 활용 0.7 > 1.4 > 2.1 > 2.8
    delay: (index + 1) * .7,
    opacity: 1
  })
})

// 공지사항 swiper 사용
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});

// 프로모션 swiper 사용
new Swiper('.promotion .swiper-container', {
  direction: 'horizontal',
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
})
new Swiper('.awards .swiper-container', {
  direction: 'horizontal',
  autoplay: true,
  loop: true,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
})

// 스타벅스 프로모션 클릭 시 프로모션 영역 숨김
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', () => {
  isHidePromotion = !isHidePromotion
  
  if(isHidePromotion) {
    // 숨김 처리
    promotionEl.classList.add('hide');
  } else {
    // 출력 처리
    promotionEl.classList.remove('hide');
  }
})

// 배경 떠다니는 효과 애니메이션 and Easing 효과(easeInOut)
// https://greensock.com/docs/ (ease 적용)
function floatingObject(selector, delay, size) {
  gsap.to(selector, 1, {
    y: size,
    repeat: -1, // 반복(-1: 무한)
    yoyo: true, // 한번 진행 후 돌아오기
    ease: "power2.outout",
    delay: delay
  });
}

floatingObject('.floating1', 1, 15)
floatingObject('.floating2', .5, 15)
floatingObject('.floating3', 1.5, 20)

// section 태그의 scroll-spy 클래스를 찾는다.
const spyEls = document.querySelectorAll('section.scroll-spy')
spyEls.forEach((el) => {
  new ScrollMagic
    .Scene({
      triggerElement: el, // 보여짐 여부를 감시 할 요소를 지정
      triggerHook: .8 // viewport (0: 제일 위쪽 화먄, 1:제일 아래쪽 화면, 0.5: 가운데, 따라서 스크롤이 0.5~1 사이 중간에쯤 오면 해당 section을 출력해라)
    })
    .setClassToggle(el, 'show')
    .addTo(new ScrollMagic.Controller())
})

// &copy Year
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()