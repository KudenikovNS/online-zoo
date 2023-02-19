window.addEventListener("load", () => {
  const headerBurger = document.querySelector(".header-burger");
  const burgerNav = document.querySelector(".burger-nav");
  const burgerNavLinks = document.querySelectorAll(".burger-nav__link");
  const testimonialsInput = document.querySelector(".testimonials__input");
  const testimonialsInner = document.querySelector(".testimonials__inner");
  const testimonialsItem = document.querySelector(".testimonials__item");
  const popupElem = document.querySelector(".popup");
  const popupImg = document.querySelector(".popup__top-avatar img");
  const popupItemName = document.querySelector(".popup__top-name");
  const popupItemLocal = document.querySelector(".popup__top-local-country");
  const popupItemTime = document.querySelector(".popup__top-local-time");

  let canOpenBurger = true;

  burgerNav.addEventListener("click", (e) => {
    if (!e.target.closest(".burger-nav__inner")) {
      closeMenuBurger();
    }
  });

  burgerNavLinks.forEach((item) => {
    item.addEventListener("click", () => {
      closeMenuBurger();
    });
  });

  headerBurger.addEventListener("click", (e) => {
    if (canOpenBurger) {
      canOpenBurger = false;
      if (headerBurger.classList.contains("active--button")) {
        closeMenuBurger();
      } else {
        let anim = animNav(0, 1);
        burgerNav.classList.add("active--nav");
        headerBurger.classList.toggle("active--button");
        document.documentElement.classList.add("_lock");
      }
      setTimeout(() => (canOpenBurger = true), 500);
    }
  });

  function closeMenuBurger() {
    headerBurger.classList.remove("active--button");
    let anim = animNav(1, 0);
    anim.addEventListener("finish", () => {
      burgerNav.classList.remove("active--nav");
      setTimeout(() => {
        document.documentElement.classList.remove("_lock");
      }, 100);
    });
  }

  function animNav(opacityStart, opacityEnd) {
    return burgerNav.animate(
      [
        {
          opacity: opacityStart,
        },
        {
          opacity: opacityEnd,
        },
      ],
      {
        duration: 500,
      }
    );
  }

  let testimonialsItemGap = 29;
  let testimonialsItemWidth = 267.73;

  let isLessThan1280Testimonials = false;
  let isMoreThan1280Testimonials = false;
  let isLessThan980Testimonials = false;

  function updateTestimonials() {
    if (document.documentElement.clientWidth <= 1280) {
      testimonialsItemGap = 27;
      testimonialsItemWidth = 295;
      testimonialsInput.max = 8;
      if (!isLessThan1280Testimonials) {
        scrollTestimonials();
        isLessThan1280Testimonials = true;
        isMoreThan1280Testimonials = false;
        isLessThan980Testimonials = false;
      }
    }

    if (document.documentElement.clientWidth >= 1280) {
      testimonialsItemGap = 29;
      testimonialsItemWidth = 267.73;
      testimonialsInput.max = 7;

      if (!isMoreThan1280Testimonials) {
        scrollTestimonials();
        isLessThan1280Testimonials = false;
        isMoreThan1280Testimonials = true;
        isLessThan980Testimonials = false;
      }
    }

    if (document.documentElement.clientWidth <= 980) {
      testimonialsInput.max = 9;
      if (!isLessThan980Testimonials) {
        scrollTestimonials();
        isLessThan1280Testimonials = false;
        isMoreThan1280Testimonials = false;
        isLessThan980Testimonials = true;
      }
    }

    if (document.documentElement.clientWidth <= 767) {
      testimonialsInner.style.transform = "translateX(0px)";

      testimonialsInner.addEventListener("click", (e) => {
        const el = e.target;
        if (el.classList.contains("testimonials__item")) {
          const imgSrc = el.querySelector(".testimonials__item-avatar img").src;
          const itemName = el.querySelector(
            ".testimonials__item-name"
          ).textContent;
          const itemCountry = el.querySelector(".local-country").textContent;
          const itemTime = el.querySelector(".local-time").textContent;

          popupImg.src = imgSrc;
          popupItemName.textContent = itemName;
          popupItemLocal.textContent = itemCountry;
          popupItemTime.textContent = itemTime;

          showPopup(imgSrc, itemName, itemCountry, itemTime);
        }
      });
    }
  }

  let resizeTimeoutTestimonials;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeoutTestimonials);
    resizeTimeoutTestimonials = setTimeout(updateTestimonials, 100);
  });

  function scrollTestimonials() {
    const value = testimonialsInput.value;
    testimonialsInner.style.transform = `translateX(-${
      value * (testimonialsItemWidth + testimonialsItemGap)
    }px)`;
  }

  testimonialsInput.addEventListener("input", (e) => {
    scrollTestimonials();
  });

  if (document.documentElement.clientWidth <= 767) {
    testimonialsInner.addEventListener("click", (e) => {
      const el = e.target;
      if (el.classList.contains("testimonials__item")) {
        const imgSrc = el.querySelector(".testimonials__item-avatar img").src;
        const itemName = el.querySelector(
          ".testimonials__item-name"
        ).textContent;
        const itemCountry = el.querySelector(".local-country").textContent;
        const itemTime = el.querySelector(".local-time").textContent;

        popupImg.src = imgSrc;
        popupItemName.textContent = itemName;
        popupItemLocal.textContent = itemCountry;
        popupItemTime.textContent = itemTime;

        showPopup(imgSrc, itemName, itemCountry, itemTime);
      }
    });
  }

  function showPopup(imgSrc, itemName, itemCountry, itemTime) {
    popupImg.src = imgSrc;
    popupItemName.textContent = itemName;
    popupItemLocal.textContent = itemCountry;
    popupItemTime.textContent = itemTime;
    popupElem.style.display = "block";

    popupElem.animate(
      [
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      ],
      { duration: 500 }
    );

    document.documentElement.classList.add("_lock");
  }

  function closePopup() {
    let anim = popupElem.animate(
      [
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
      ],
      { duration: 500 }
    );

    anim.addEventListener("finish", (e) => {
      popupElem.style.display = "none";
      document.documentElement.classList.remove("_lock");
    });
  }

  popupElem.addEventListener("click", (e) => {
    const el = e.target;
    if (el.classList.contains("popup__close")) {
      closePopup();
    }

    if (!el.closest(".popup__content")) {
      closePopup();
    }
  });

  let petsArr = [
    `<div class="pets__item">
                <div class="pets__item-top">
                  <picture>
                    <source srcset='../../assets/images/pets8.webp' type='image/webp'>
                    <img src='../../assets/images/pets8.jpg' width='366' height='366' alt='Pet'>
                  </picture>
                </div>
                <div class="pets__item-bottom">
                  <div class="pets__item-info">
                    <h3 class="pets__item-title">Gorillas</h3>
                    <div class="pets__item-native">Native to Congo</div>
                  </div>
                  <img src="../../assets/icons/banana.png" class="img-banana" alt="banana.png">
                </div>
              </div>
		`,
    `<div class="pets__item">
                <div class="pets__item-top">
                  <picture>
                    <source srcset='../../assets/images/pets7.webp' type='image/webp'>
                    <img src='../../assets/images/pets7.jpg' width='366' height='366' alt='Pet'>
                  </picture>
                </div>
                <div class="pets__item-bottom">
                  <div class="pets__item-info">
                    <h3 class="pets__item-title">Alligators</h3>
                    <div class="pets__item-native">Native to Southeastern U. S.</div>
                  </div>
                  <img src="../../assets/icons/fish.png" class="img-fish" alt="fish">
                </div>
              </div>
		`,
    `
							<div class="pets__item">
                <div class="pets__item-top">
                  <picture>
                    <source srcset='../../assets/images/pets6.webp' type='image/webp'>
                    <img src='../../assets/images/pets6.jpg' width='366' height='366' alt='Pet'>
                  </picture>
                </div>
                <div class="pets__item-bottom">
                  <div class="pets__item-info">
                    <h3 class="pets__item-title">Penguins</h3>
                    <div class="pets__item-native">Native to Antarctica</div>
                  </div>
                  <img src="../../assets/icons/fish.png" class="img-fish" alt="fish">
                </div>
              </div>
		`,
    `<div class="pets__item">
                <div class="pets__item-top">
                  <picture>
                    <source srcset='../../assets/images/pets5.webp' type='image/webp'>
                    <img src='../../assets/images/pets5.jpg' width='366' height='366' alt='Pet'>
                  </picture>
                </div>
                <div class="pets__item-bottom">
                  <div class="pets__item-info">
                    <h3 class="pets__item-title">Cheetahs</h3>
                    <div class="pets__item-native">Native to Africa</div>
                  </div>
                  <img src="../../assets/icons/fish.png" class="img-fish" alt="fish">
                </div>
              </div>
		`,
    `<div class="pets__item">
                <div class="pets__item-top">
                  <picture>
                    <source srcset='../../assets/images/pets4.webp' type='image/webp'>
                    <img src='../../assets/images/pets4.jpg' width='366' height='366' alt='Pet'>
                  </picture>
                </div>
                <div class="pets__item-bottom">
                  <div class="pets__item-info">
                    <h3 class="pets__item-title">Two-toed Sloth</h3>
                    <div class="pets__item-native">Mesoamerica, South America</div>
                  </div>
                  <img src="../../assets/icons/banana.png" class="img-banana" alt="banana">
                </div>
              </div>
		`,
    `<div class="pets__item">
                <div class="pets__item-top">
                  <picture>
                    <source srcset='../../assets/images/pets3.webp' type='image/webp'>
                    <img src='../../assets/images/pets3.jpg' width='366' height='366' alt='Pet'>
                  </picture>
                </div>
                <div class="pets__item-bottom">
                  <div class="pets__item-info">
                    <h3 class="pets__item-title">Gorillas</h3>
                    <div class="pets__item-native">Native to Congo</div>
                  </div>
                  <img src="../../assets/icons/banana.png" class="img-banana" alt="banana">
                </div>
              </div>
		`,
    `<div class="pets__item">
                <div class="pets__item-top">
                  <picture>
                    <source srcset='../../assets/images/pets2.webp' type='image/webp'>
                    <img src='../../assets/images/pets2.jpg' width='366' height='366' alt='Pet'>
                  </picture>
                </div>
                <div class="pets__item-bottom">
                  <div class="pets__item-info">
                    <h3 class="pets__item-title">Eagles</h3>
                    <div class="pets__item-native">Native to South America</div>
                  </div>
                  <img src="../../assets/icons/fish.png" class="img-fish" alt="fish ">
                </div>
              </div>
		`,
    `<div class="pets__item">
                <div class="pets__item-top">
                  <picture>
                    <source srcset='../../assets/images/pets1.webp' type='image/webp'>
                    <img src='../../assets/images/pets1.jpg' width='366' height='366' alt='Pet'>
                  </picture>
                </div>
                <div class="pets__item-bottom">
                  <div class="pets__item-info">
                    <h3 class="pets__item-title">Giant Pandas</h3>
                    <div class="pets__item-native">Native to Southwest China</div>
                  </div>
                  <img src="../../assets/icons/banana.png" class="img-banana" alt="banana">
                </div>
              </div>
		`,
  ];

  const pestInner = document.querySelector(".pets__inner");
  const arrowLeft = document.querySelector(".pets__nav-btn.arrow-left");
  const arrowRight = document.querySelector(".pets__nav-btn.arrow-right");

  let canAnimate = true;
  let petsNumber = 6;
  let isLessThan980 = false;
  let isMoreThan980 = false;

  if (document.documentElement.clientWidth <= 980) petsNumber = 4;
  if (document.documentElement.clientWidth >= 980) petsNumber = 6;

  function updatePets() {
    if (document.documentElement.clientWidth <= 980) {
      petsNumber = 4;
      if (!isLessThan980) {
        createPetsItems();
        isLessThan980 = true;
        isMoreThan980 = false;
      }
    }

    if (document.documentElement.clientWidth >= 980) {
      petsNumber = 6;
      if (!isMoreThan980) {
        createPetsItems();
        isLessThan980 = false;
        isMoreThan980 = true;
      }
    }
  }

  arrowRight.addEventListener("click", () => {
    if (canAnimate) {
      canAnimate = false;
      createPetsItems();
      animatePets("10%", "-1%", 0);
      setTimeout(() => (canAnimate = true), 750);
    }
  });

  arrowLeft.addEventListener("click", () => {
    if (canAnimate) {
      canAnimate = false;
      createPetsItems();
      animatePets("-10%", "1%", 0);
      setTimeout(() => (canAnimate = true), 750);
    }
  });

  function animatePets(startX, middleX, endX) {
    pestInner.animate(
      [
        {
          transform: `translateX(${startX})`,
          opacity: "0",
        },
        {
          transform: `translateX(${middleX})`,
          opacity: "0.5",
        },
        {
          transform: `translateX(${endX})`,
          opacity: "1",
        },
      ],
      { duration: 500, easing: "linear" }
    );
  }

  function createPetsItems() {
    pestInner.innerHTML = ``;
    let content = [];

    for (let i = 0; content.length < petsNumber; i++) {
      let item = getRandomPet();
      if (!content.includes(item)) {
        content.push(item);
      }
    }

    pestInner.innerHTML = `
		${content.join("")}
		`;
  }

  function getRandomPet() {
    return petsArr[getRandomNumber(petsArr.length)];
  }

  function getRandomNumber(number) {
    return Math.floor(Math.random() * number);
  }

  createPetsItems();

  let resizeTimeout;

  window.addEventListener("resize", (e) => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updatePets, 100);
  });
});
