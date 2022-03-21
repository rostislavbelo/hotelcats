// Параметры карты Leaflet

(function () {
  //Вызов карты.............Запрет масшта-я прокруткой.........координаты...........масштаб исходный
  const map = L.map('map', { scrollWheelZoom: false }).setView([59.93891, 30.32537], 15.5);

  const basemaps = {
    //Базовый слой карты - обязательно
    StreetView: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }),
    //Топографический слой
    Topography: L.tileLayer.wms('http://ows.mundialis.de/services/service?', { layers: 'TOPO-WMS' }),
    //Слой мест
    Places: L.tileLayer.wms('http://ows.mundialis.de/services/service?', { layers: 'OSM-Overlay-WMS' }),
  };

  //Кнопка справа сверху - выбор слоя.
  L.control.layers(basemaps).addTo(map);

  //Выбор топографического слоя по умолчанию
  basemaps.StreetView.addTo(map);

  //Кастомная иконка-маркер, путь и размеры
  const basicBeachIcon = L.icon({
    iconUrl: 'img/icons/cat-in-map.svg', iconSize: [52, 78],
  });

  //Установка иконки-маркера на нужные координаты плюс подсказка по клику на маркер
  L.marker([59.93872, 30.32308], { icon: basicBeachIcon })
    .bindPopup('Гостиница для котов Котейка')
    .addTo(map);
}());

// Управление модальными окнами
(function () {
  const popuppBooking = document.querySelector('.js__booking');
  const buttonBookingSubmit = document.querySelector('.js__booking-form');
  const buttonBookingClose = document.querySelector('.js__booking-button-close-form');
  const popuppConfirm = document.querySelector('.js__popup-confirm');
  const buttonConfirm = document.querySelector('.js__button-confirm-ok');
  const buttonConfirmClose = document.querySelector('.js__button-confirm-close');
  const buttonOrder = document.querySelectorAll('.button-order');
  const inputActive = document.querySelector('.popup__booking-input-name-owner input');
  const body = document.querySelector('.js__body');

  if (popuppBooking, buttonBookingSubmit, buttonBookingClose, popuppConfirm, buttonConfirm, buttonConfirmClose) {
    popuppBooking.classList.add('js__booking--no-active');
    buttonBookingClose.classList.add('js__booking-button-close-form--active');

    buttonOrder.forEach((button) => {
      button.addEventListener('click', (evt) => {
        evt.preventDefault();
        popuppBooking.classList.add('js__popup--active');
        inputActive.focus();
        body.classList.add('js__body--no-scroll');
      });
    });

    const hiddenPopup = (popupp) => {
      popupp.classList.remove('js__popup--active');
      body.classList.remove('js__body--no-scroll');
    };

    buttonBookingClose.addEventListener('click', () => {
      hiddenPopup(popuppBooking);
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        hiddenPopup(popuppBooking);
        hiddenPopup(popuppConfirm);
      }
    });

    document.addEventListener('click', (evt) => {
      if (evt.target === popuppBooking || evt.target === popuppConfirm) {
        hiddenPopup(popuppBooking);
        hiddenPopup(popuppConfirm);
      }
    });

    buttonBookingSubmit.addEventListener('submit', (evt) => {
      evt.preventDefault();
      hiddenPopup(popuppBooking);
      popuppConfirm.classList.add('js__popup--active');
      body.classList.add('js__body--no-scroll');
    });

    buttonConfirmClose.addEventListener('click', () => {
      hiddenPopup(popuppConfirm);
    });

    buttonConfirm.addEventListener('click', () => {
      hiddenPopup(popuppConfirm);
    });
  }
}());

// Функционал мобильного меню
(function () {
  const navButton = document.querySelector('.js__nav-button');
  const nav = document.querySelector('.js__nav');
  const header = document.querySelector('.js__header');
  const blockHidden = document.querySelectorAll('.js__block-hidden');
  const navElement = document.querySelectorAll('.js__nav-element');

  if (navButton, nav) {
    nav.classList.add('js__nav--no--active');
    navButton.classList.add('js__nav-button--active');

    navButton.addEventListener('click', () => {
      nav.classList.toggle('js__nav--no--active');
      header.classList.toggle('js__header-full-size');
      navButton.classList.toggle('hamburger--active');

      blockHidden.forEach((block) => {
        block.classList.toggle('visually-hidden');
      });

      navElement.forEach((element) => {
        element.addEventListener('click', () => {
          nav.classList.add('js__nav--no--active');
          blockHidden.forEach((block) => {
            block.classList.remove('visually-hidden');
          });
          header.classList.remove('js__header-full-size');
          navButton.classList.remove('hamburger--active');

        });
      });
    });
  }
}());

// Тогглер типов гостиничных номеров

(function () {
  const roomSection = document.querySelector('.rooms');

  if (roomSection) {
    const room = roomSection.querySelectorAll('.rooms__item');
    const room1 = roomSection.querySelector('.rooms__item-1');
    const room2 = roomSection.querySelector('.rooms__item-2');
    const room3 = roomSection.querySelector('.rooms__item-3');
    const bullet = roomSection.querySelectorAll('.slider-buttons__bullet');
    const bullet1 = roomSection.querySelector('.slider-buttons__bullet-1');
    const bullet2 = roomSection.querySelector('.slider-buttons__bullet-2');
    const bullet3 = roomSection.querySelector('.slider-buttons__bullet-3');
    const buttonBack = roomSection.querySelector('.slider-buttons__button-back');
    const buttonNext = roomSection.querySelector('.slider-buttons__button-next');

    if (room, room1, room2, room3, bullet, bullet1, bullet2, bullet3, buttonBack, buttonNext) {

      const selectionsSliderBullet = (roomArg, bulletArg) => {
        bulletArg.addEventListener('click', () => {
          room.forEach((element) => {
            element.classList.remove('rooms__item--active');
          });
          roomArg.classList.add('rooms__item--active');
          bullet.forEach((element) => {
            element.classList.remove('slider-buttons__bullet--active');
          });
          bulletArg.classList.add('slider-buttons__bullet--active');
        });
      };
      selectionsSliderBullet(room1, bullet1);
      selectionsSliderBullet(room2, bullet2);
      selectionsSliderBullet(room3, bullet3);

      buttonNext.addEventListener('click', () => {
        if (room1.classList.contains('rooms__item--active')) {
          room1.classList.remove('rooms__item--active');
          room2.classList.add('rooms__item--active');
          bullet1.classList.remove('slider-buttons__bullet--active');
          bullet2.classList.add('slider-buttons__bullet--active');
        } else {
          if (room2.classList.contains('rooms__item--active')) {
            room2.classList.remove('rooms__item--active');
            room3.classList.add('rooms__item--active');
            bullet2.classList.remove('slider-buttons__bullet--active');
            bullet3.classList.add('slider-buttons__bullet--active');
          } else {
            if (room3.classList.contains('rooms__item--active')) {
              room3.classList.remove('rooms__item--active');
              room1.classList.add('rooms__item--active');
              bullet3.classList.remove('slider-buttons__bullet--active');
              bullet1.classList.add('slider-buttons__bullet--active');
            }
          }
        }
      });

      buttonBack.addEventListener('click', () => {
        if (room1.classList.contains('rooms__item--active')) {
          room1.classList.remove('rooms__item--active');
          room3.classList.add('rooms__item--active');
          bullet1.classList.remove('slider-buttons__bullet--active');
          bullet3.classList.add('slider-buttons__bullet--active');
        } else {
          if (room2.classList.contains('rooms__item--active')) {
            room2.classList.remove('rooms__item--active');
            room1.classList.add('rooms__item--active');
            bullet2.classList.remove('slider-buttons__bullet--active');
            bullet1.classList.add('slider-buttons__bullet--active');
          } else {
            if (room3.classList.contains('rooms__item--active')) {
              room3.classList.remove('rooms__item--active');
              room2.classList.add('rooms__item--active');
              bullet3.classList.remove('slider-buttons__bullet--active');
              bullet2.classList.add('slider-buttons__bullet--active');
            }
          }
        }
      });
    }
  }
}());

// Слайдер отзывов

(function () {
  const blockSliderButtons = document.querySelectorAll('.slider-buttons');
  const commentsSection = document.querySelector('#comments');

  if (blockSliderButtons, commentsSection) {
    const sliderList = commentsSection.querySelector('.comments__list');
    const bullet = commentsSection.querySelectorAll('.slider-buttons__bullet');
    const bullet1 = commentsSection.querySelector('.slider-buttons__bullet-1');
    const bullet2 = commentsSection.querySelector('.slider-buttons__bullet-2');
    const bullet3 = commentsSection.querySelector('.slider-buttons__bullet-3');
    const buttonBack = commentsSection.querySelector('.slider-buttons__button-back');
    const buttonNext = commentsSection.querySelector('.slider-buttons__button-next');
    let offset = 0;

    if (bullet, bullet1, bullet2, bullet3, buttonBack, buttonNext) {
      blockSliderButtons.forEach((block) => {
        block.classList.add('slider-buttons--active');
      });

      const setImageBullet = (offsetValue, position1, position2, position3, position4, position5, position6) => {
        offset = offsetValue;
        sliderList.style.left = `${offset}px`;
        position1.style.pointerEvents = 'none';
        position2.classList.add('slider-buttons__bullet--active');
        position3.style.pointerEvents = 'auto';
        position4.style.pointerEvents = 'auto';
        position5.classList.remove('slider-buttons__bullet--active');
        position6.classList.remove('slider-buttons__bullet--active');
      };

      const setBulletRelation = () => {
        if (offset === 0) {
          setImageBullet(0, bullet1, bullet1, bullet2, bullet3, bullet2, bullet3);
        }

        if (offset === -1020) {
          setImageBullet(-1020, bullet2, bullet2, bullet1, bullet3, bullet1, bullet3);
        }

        if (offset === -2040) {
          setImageBullet(-2040, bullet3, bullet3, bullet1, bullet2, bullet1, bullet2);
        }
      };

      const activateButtonBack = (cursor, opacity) => {
        buttonBack.style.pointerEvents = cursor;
        buttonBack.style.opacity = opacity;
      };

      const activateButtonNext = (cursor, opacity) => {
        buttonNext.style.pointerEvents = cursor;
        buttonNext.style.opacity = opacity;
      };

      bullet1.addEventListener('click', () => {
        setImageBullet(0, bullet1, bullet1, bullet2, bullet3, bullet2, bullet3);
        activateButtonBack('none', '0.65');
        activateButtonNext('auto', '1');
      });

      bullet2.addEventListener('click', () => {
        setImageBullet(-1020, bullet2, bullet2, bullet1, bullet3, bullet1, bullet3);
        activateButtonBack('auto', '1');
        activateButtonNext('auto', '1');
      });

      bullet3.addEventListener('click', () => {
        setImageBullet(-2040, bullet3, bullet3, bullet1, bullet2, bullet1, bullet2);
        activateButtonBack('auto', '1');
        activateButtonNext('none', '0.65');
      });

      buttonNext.addEventListener('click', () => {
        offset -= 340;
        sliderList.style.left = `${offset}px`;
        if (offset === -2040) {
          buttonNext.style.pointerEvents = 'none';
          buttonNext.style.opacity = '0.65';
        }
        if (offset < 0) {
          buttonBack.style.pointerEvents = 'auto';
          buttonBack.style.opacity = '1';
        }
        setBulletRelation();
      });

      buttonBack.addEventListener('click', () => {
        offset += 340;
        sliderList.style.left = `${offset}px`;
        if (offset > -2040) {
          buttonNext.style.pointerEvents = 'auto';
          buttonNext.style.opacity = '1';
        }
        if (offset >= 0) {
          buttonBack.style.pointerEvents = 'none';
          buttonBack.style.opacity = '0.65';
        }
        setBulletRelation();
      });
    }
  }
}());

// Псевдоселект карточек номеров

(function () {
  const select = document.querySelector('.offers__pseudo-select');
  const filter = document.querySelector('.offers__filter-select');
  const optionDefault = document.querySelector('.offers__option-default');

  if (filter, select, optionDefault) {
    for (let i = 0; i < select.children.length; i++) {
      select.children[i].addEventListener('click', function () {
        optionDefault.innerHTML = this.innerHTML;
      });

      select.children[i].addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') {
          optionDefault.innerHTML = select.children[i].innerHTML;
        }
      });
    }

    filter.addEventListener('click', () => {
      select.classList.toggle('offers__pseudo-select--active');
      filter.classList.toggle('offers__filter-select--hidden');
    });

    filter.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        select.classList.toggle('offers__pseudo-select--active');
        filter.classList.toggle('offers__filter-select--hidden');
      }
    });

    document.addEventListener('click', (evt) => {
      if (evt.target !== select && evt.target !== filter && evt.target !== optionDefault) {
        select.classList.remove('offers__pseudo-select--active');
        filter.classList.remove('offers__filter-select--hidden');
      }
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        select.classList.remove('offers__pseudo-select--active');
        filter.classList.remove('offers__filter-select--hidden');
      }
    });
  }
}());

// Переключение клавишей TAB и переключение кастомизированных Input

(function () {
  const label = document.querySelectorAll('.offers__fiters-item');

  if (label) {

    label.forEach((element) => {
      element.addEventListener('keydown', (evt) => {
        if (evt.keyCode === 32 || evt.key === 'Enter') {
          evt.preventDefault();
          const input = element.querySelector('input');
          input.toggleAttribute('checked');
        }
      });
    });
  }
}());

// Работа фильтров страницы каталога

(function () {

  const filterArea = document.querySelectorAll('.offers__fiters-area-item label');
  const filterEquipment = document.querySelectorAll('.offers__fiters-equipment-item label');
  const resetButton = document.querySelector('.offers__main-form');
  const cardOffer = document.querySelectorAll('.offers__item');
  const minPrice = document.querySelector('.offers__fiters-minprice input');
  const maxPrice = document.querySelector('.offers__fiters-maxprice input');
  const message = document.querySelector('.offers__list-message');

  if (filterArea, filterEquipment, resetButton, cardOffer, minPrice, maxPrice) {

    const showMessage = () => {
      const arrayCardHidden = [];
      cardOffer.forEach((card) => {
        // Проверка отсутсвия display:none у каждой карточки
        if (getComputedStyle(card).display !== 'none') {
          arrayCardHidden.push(card);
        }
      });

      if (arrayCardHidden.length === 0) {
        message.classList.add('offers__list-message--active');
      }
      if (arrayCardHidden.length > 0) {
        message.classList.remove('offers__list-message--active');
      }
    };

    filterArea.forEach((filter) => {
      filter.addEventListener('click', () => {
        const attrFilter = filter.getAttribute('data-value');
        const classToggler = document.querySelector(`.offers__item[data-area='${attrFilter}']`);
        classToggler.classList.toggle('offers__item--hidden');
        showMessage();
      });
    });

    filterEquipment.forEach((filter) => {
      filter.addEventListener('click', () => {
        const filterValue = filter.textContent;
        const attrHidden = filter.getAttribute('data-hidden');
        const offerCard = document.querySelectorAll('.offers__item');
        offerCard.forEach((card) => {
          const ppp = card.querySelector(`[data-title = '${filterValue}']`);
          if (ppp !== null) {
            card.classList.toggle(`offers__item--hidden-${attrHidden}`);
          }
        });
        showMessage();
      });
    });

    resetButton.addEventListener('reset', () => {
      cardOffer.forEach((card) => {
        card.classList.remove('offers__item--hidden');
        card.classList.remove('offers__item--hidden-type1');
        card.classList.remove('offers__item--hidden-type2');
        card.classList.remove('offers__item--hidden-type3');
        card.classList.remove('offers__item--hidden-type4');
        card.classList.remove('offers__item--hidden-type5');
        card.classList.remove('offers__item--hidden-type6');
      });
      showMessage();
    });

    minPrice.addEventListener('change', () => {
      cardOffer.forEach((card) => {
        const price = card.querySelector('.offers__booking-price span');
        const priceNumber = parseInt(price.textContent, 10);
        if (priceNumber < minPrice.value) {
          card.classList.add('offers__item--hidden-type6');
        }
        if (priceNumber >= minPrice.value) {
          card.classList.remove('offers__item--hidden-type6');
        }
      });
      showMessage();
    });

    maxPrice.addEventListener('change', () => {
      cardOffer.forEach((card) => {
        const price = card.querySelector('.offers__booking-price span');
        const priceNumber = parseInt(price.textContent, 10);
        if (priceNumber > maxPrice.value) {
          card.classList.add('offers__item--hidden-type6');
        }
        if (priceNumber <= maxPrice.value) {
          card.classList.remove('offers__item--hidden-type6');
        }
      });
      showMessage();
    });
  }
}());

//Сортировка карточек по цене и по площади. Код заимствован (https://qna.habr.com/q/577900), доделан под задачу, разобран по пунктам.

(function () {
  //определяем опорный элемент (родительский блок карточек)
  const parent = document.querySelector('.offers__list');
  // собираем карточки в кучу
  const items = document.querySelectorAll('.offers__item');
  //определяем зоны-кнопки нажатия
  const buttonSortAreaIncrease = document.querySelector('.offers__pseudo-option-1');
  const buttonSortAreaDecrease = document.querySelector('.offers__pseudo-option-2');
  const buttonSortPriceIncrease = document.querySelector('.offers__pseudo-option-3');
  const buttonSortPriceDecrease = document.querySelector('.offers__pseudo-option-4');

  if (parent, items) {

    const sortingCards = (directionSort) => {
      // заводим пустой объект
      const SortElements = new Object();

      // проходим по карточкам форичом
      items.forEach((item, indx) => {

        // находим строку с данными о цене и приводим её к числу, удаляем текстовый мусор, заносим в переменную
        const itemValue = parseInt(item.querySelector('.offers__booking-price span').textContent.replace('₽', ''), 10);

        //вариант для сортировки по площади
        /* const itemValue = parseInt(item.querySelector('.offers__booking-area span').textContent.replace('м2', ''), 10); */

        // Получаем объект вот такой формы: 100: {element: li.offers__item, index: 0}, 200: {element: li.offers__item, index: 1} и так далее
        SortElements[itemValue] = { 'element': item, 'index': indx };
      });

      // Из объекта методом keys получаем массив с коллекцией ключей, вот- ['100', '200', '250', '350', '500', '600']
      const keys = Object.keys(SortElements);

      //Объявляем функцию, которая получает на вход строки a и b, парсит на всякий случай их в числа, сравнивает и возвращет 1 или -1 для метода sort
      function compareNumeric(a, b) {
        a = parseInt(a, 10);
        b = parseInt(b, 10);
        if (a < b) { return 1; }
        if (a > b) { return -1; }
      }

      // сортируем массив ключей по убыванию (в данном случае), типа array.sort((a, b) => a - b);
      keys.sort(compareNumeric);
      // мапим массив по отсортированным в нужном порядку ключам
      keys.map((key) => {
        //методом  insertAdjacentElement расставляем карточки в отсортированном порядке внутрь, в конец опорного элемента - 'beforeend' или 'afterBegin'
        parent.insertAdjacentElement(directionSort, SortElements[key]['element']);
      });
    };

    //Обработчики на сортировку по клику.

    buttonSortPriceIncrease.addEventListener('click', () => {
      sortingCards('afterBegin');
    });

    buttonSortPriceDecrease.addEventListener('click', () => {
      sortingCards('beforeend');
    });

    buttonSortAreaIncrease.addEventListener('click', () => {
      sortingCards('afterBegin');
    });

    buttonSortAreaDecrease.addEventListener('click', () => {
      sortingCards('beforeend');
    });
  }
}());
