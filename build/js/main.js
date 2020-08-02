const questionsContent = document.querySelector(`.questions__content`);
const questionsArrows = document.querySelectorAll(`.questions__arrow`);
const questionsText = document.querySelectorAll(`.questions__item-text`);



questionsContent.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (evt.target.closest(`.questions__arrow`)) {
    questionsArrows.forEach(el => {
      el.classList.remove(`questions__arrow--active`);
    });
    evt.target.closest(`.questions__arrow`).classList.add(`questions__arrow--active`);

    questionsText.forEach(element => {
      element.classList.remove(`questions__item-text--active`);
    });

    if (evt.target.closest(`.questions__item`)) {
      console.log(evt.target.closest(`.questions__item`).querySelector(`.questions__item-text`));
      evt.target.closest(`.questions__item`).querySelector(`.questions__item-text`).classList.add(`questions__item-text--active`)
    }
  }
  document.querySelector(`#questions`).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
});