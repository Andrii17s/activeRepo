/* Створює колекцію всих слайдерів на сторінці */
let sliders = document.querySelectorAll(".ah-slider");

/* Прописує та запускає логіку функціоналу для кожного слайдеру на основі його ID */
for (let x = 0; x < sliders.length; x++) {

  /* Отримуєм ID слайдера */
  let sliderId = sliders[x].getAttribute("id");

  /* Індекс слайда по замовчанню */
  let slideIndex = 1;

  /* Запуск основної функції слайдера */
  showSlides(slideIndex, sliderId);

  /* Додаємо таймер зміни слайдів */
  let timerId = setInterval(() => nextSlide(sliderId), 3000);

  /* Функція збільшує індекс на 1, показує наступний слайд */
  function nextSlide(sliderId) {
    showSlides(slideIndex += 1, sliderId);
  }

  /* Функция зменшує индекс на 1, показує попередній слайд */
  function prevSlide(sliderId) {
    showSlides(slideIndex -= 1, sliderId);
  }

  /* Встановлює поточний слайд */
  function currentSlide(n, sliderId) {
    showSlides(slideIndex = n, sliderId);
  }

  /* Додає функціонал по кліку на "next", зупиняє автогортання */
  document.querySelector(`#${sliderId} [data-bs-slide="next"]`).addEventListener('click', function () {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    nextSlide(sliderId);
  });

  /* Додає функціонал по кліку на "prev", зупиняє автогортання*/
  document.querySelector(`#${sliderId} [data-bs-slide="prev"]`).addEventListener('click', function () {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    prevSlide(sliderId);
  });

  /*Додає функціонал по кліку для індикаторів, зупиняє автогортання*/
  const dots = document.querySelectorAll(`#${sliderId} .ah-slider_dots__item`);
  dots.forEach(el => {
    let attrTo = el.getAttribute("data-bs-slide-to");
    el.addEventListener('click', function () {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      currentSlide(attrTo, sliderId);
    })
  });

  /* Основна функція слайдера */
  function showSlides(n, sliderId) {
    let i;

    //* Отримуєм колекцію слайдів слайдера з sliderId */
    let slides = document.querySelectorAll(`#${sliderId} .ah-slider_item`);

    //* Отримуєм колекцію індикаторів слайдера з sliderId */
    let dots = document.querySelectorAll(`#${sliderId} [data-bs-slide-to]`);

    /* При кліку next на останньому слайді переход на перший */
    if (n > slides.length) {
      slideIndex = 1
    }

    /* При кліку prev першому слайді переход на останній */
    if (n < 1) {
      slideIndex = slides.length
    }

    /* Не відображати всі слайди */
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    /* Не відображати активними всі індикатори */
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" ah-active", "");
    }

    /* Відображає поточний слайд */
    slides[slideIndex - 1].style.display = "block";

    /* Відображає активним індикатор поточного слайду */
    dots[slideIndex - 1].classList.toggle("ah-active");
  }
}




