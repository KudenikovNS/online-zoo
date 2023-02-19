const trackButton = document.querySelector(".donation__amount-track");
const pointsSpan = document.querySelectorAll(".donation__amount-point");
const buttonsActive = document.querySelectorAll(".donation__amount-button");
const dollars = document.querySelectorAll(".donation__amount-dollar");
const donationForm = document.querySelector(".donation__form");
const headerBurger = document.querySelector(".header-burger");
const burgerNav = document.querySelector(".burger-nav");
const burgerNavLinks = document.querySelectorAll(".burger-nav__link");
const inputAmount = document.querySelector(".donation__form-amount");

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

donationForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

trackButton.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("donation__amount-button")) {
    dollarInputChange(target);
  }
});

function dollarInputChange(target) {
  let btnIdx = 0;
  pointsSpan.forEach((item) => item.classList.remove("point--active"));
  target
    .querySelector(".donation__amount-point")
    .classList.add("point--active");
  buttonsActive.forEach((item, i) => {
    if (item === target) {
      btnIdx = i;
    }
  });
  dollars.forEach((item) => item.classList.remove("dollar--active"));
  dollars[btnIdx].classList.add("dollar--active");

  const dollarNumber = +document
    .querySelector(".dollar--active")
    .textContent.replace(/\D+/g, "");
  inputAmount.value = dollarNumber;
}

if (window.innerWidth < 767) {
  pointsSpan.forEach((item) => item.classList.remove("point--active"));
  dollars.forEach((item) => item.classList.remove("dollar--active"));
  dollars[5].classList.add("dollar--active");
  pointsSpan[5].classList.add("point--active");
}

const maxLength = +inputAmount.dataset.maxlength;

inputAmount.addEventListener("input", (e) => {
  inputAmount.value = inputAmount.value.replace(/[^0-9]/g, "");
  if (inputAmount.value.length >= maxLength - 1) {
    inputAmount.value = inputAmount.value.substring(0, maxLength);
  }

  pointsSpan.forEach((item) => item.classList.remove("point--active"));
  dollars.forEach((item) => item.classList.remove("dollar--active"));

  switch (inputAmount.value) {
    case "25":
      dollarInputChange(buttonsActive[7]);
      break;
    case "50":
      dollarInputChange(buttonsActive[6]);
      break;
    case "100":
      dollarInputChange(buttonsActive[5]);
      break;
    case "250":
      dollarInputChange(buttonsActive[4]);
      break;
    case "500":
      dollarInputChange(buttonsActive[3]);
      break;
    case "1000":
      dollarInputChange(buttonsActive[2]);
      break;
    case "2000":
      dollarInputChange(buttonsActive[1]);
      break;
    case "5000":
      dollarInputChange(buttonsActive[0]);
      break;
  }
});

buttonsActive[5].click();
