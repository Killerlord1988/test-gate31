'use strict';

// get запрос

const requestUrl = 'https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7',
  list = document.querySelector('.list__wrapper'),
  searchBtn = document.querySelector('input[type=submit]');
let hash = document.location.hash;


function sendRequest(method, url) {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(error => {
      const e = new Error('Что-то пошло не так');
      e.data = error;
      throw e;
    });
  });
}

sendRequest('GET', requestUrl)
  .then(data => render(data))
  .catch(err => console.log(err));


function renderCard(elements) {
  list.innerHTML = '';

  elements.forEach(card => {
    list.innerHTML += `
      <div class="list__card" id="${card.id}">
        <h3>${card.title}</h3>
        <p>${card.body}</p>
        <input type="checkbox" name="" id="">
      </div>
      `;
  });
  addListener();
}

function addListener() {
  const cards = list.querySelectorAll('.list__card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const checkbox = card.querySelector('input[type=checkbox]');
      if (checkbox.checked) {
        card.classList.add('list__card--dark');
      } else {
        card.classList.remove('list__card--dark');
      }
    });
  });
}

function render(data) {
  renderCard(data);
  if (document.location.hash.length > 1) {
    renderCard(data);
    const cards = list.querySelectorAll('.list__card');
    data.forEach((card, i) => {
      if (card.title.indexOf(document.location.hash.substring(1)) === -1) {
        cards[i].remove();
      }
    });
  }


  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    renderCard(data);

    const cards = list.querySelectorAll('.list__card');
    const searchText = document.querySelector('input[type=search]').value;
    hash = searchText;
    document.location.hash = searchText;
    console.log(document.location.hash);
    data.forEach((card, i) => {
      if (card.title.indexOf(document.location.hash.substring(1)) === -1) {
        cards[i].remove();
      }
    });
  });
}