const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 5,
  autoplay: {
    duration: 3000,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// render swiper
const swiperWrapper = document.querySelector("#swiper-wrapper");

(async function () {
  const res = await fetch(`https://639c0ef864fcf9c11caa1a4a.mockapi.io/trends`);
  const data = await res.json();
  fetchSlide(data);
})();

function fetchSlide(arr) {
  arr.forEach((item) => {
    const slider = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("h4");

    slider.className = "swiper-slide slides";
    title.className = 'slide__title'
    image.src = item.avatar;
    title.textContent = item.name
    slider.append(image, title);
    swiperWrapper.appendChild(slider);
  });
}
