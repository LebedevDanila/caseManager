class CaseManager {
  constructor() {
    this.app = document.querySelector('#app');
    this.containerCards = document.querySelector('.cm-cards');
    this.cards = JSON.parse(localStorage.getItem('cards') || '[]');

    /* Инициализация проекта */
    this.init();
  }
  init = () => {
    this.render();
    
    // Дегелирование событий с нашими карточками
    this.app.addEventListener('click', this.actionsСard);
  }
  actionsСard = (event) => {
    const target = event.target;

    event.preventDefault();

    if(target.closest('.cm-form__submit')) {
      this.addCard();
    }
    else if(target.closest('.close')) {
      this.deleteCard(target);
    }
    else if(target.closest('.cm-card form input[type="submit"]')) {
      this.addTask(target);
    }
    else {
      return false;
    }

    this.render();

    this.recordToLocalStorage(this.cards);
  }
  addCard() {
    const field = document.querySelector('.cm-form__text');
    const title = field.value.trim();

    if(!title) {
      alert('Поле не может быть пустым!');
      return false;
    }

    this.cards.unshift({title: title, tasks: []});

    field.value = '';
  }
  deleteCard(target) {
    const id = target.getAttribute('data-id');
    this.cards.splice(id, 1);
  }
  addTask(target) {
    const id = target.getAttribute('data-id');
    const field = document.querySelector(`.cm-card form input[data-id="${id}"]`);
    const title = field.value.trim();

    if(!title) {
      alert('Поле не может быть пустым!');
      return false;
    }

    this.cards[id].tasks.unshift(title);

    field.value = '';
  }
  render() {
    this.containerCards.innerHTML = '';
    
    this.cards.forEach((card, index) => {
      this.containerCards.innerHTML += `
        <div class="cm-card">
          <img src="img/icons/close.svg" data-id="${index}" alt="close" class="close">
          <h3>${card.title}</h3>
          <form>
              <input type="text" data-id="${index}">
              <input type="submit" value="Добавить" data-id="${index}">
          </form>
          <ul>${card.tasks.map((task, index) => `<li data-id="${index}">${task}</li>`).join('')}</ul>
        </div>
      `;
    }); 
  }
  recordToLocalStorage(cards) {
    const cardsJSON = JSON.stringify(cards || '[]');
    localStorage.setItem('cards', cardsJSON);
  }
}