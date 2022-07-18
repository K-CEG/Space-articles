let showList = document.getElementById("result");
const get = localStorage.getItem("textvalues");
let localArr = JSON.parse(get);
function createField(name) {
  const li = document.createElement("li");
  li.innerHTML = name;
  return li;
}
function createhyperLinkButton(name) {
  const button = document.createElement("a");
  button.setAttribute("href", name);
  button.classList.add("link-button");
  button.innerHTML = "<button>Read article</button>";
  return button;
}
function createCard(value) {
  const card = document.createElement("div");
  card.setAttribute("class", "cards");
  card.appendChild(createField(`<strong>ID:</strong> ${value.id}`));
  card.appendChild(
    createField(`<strong>Title:</strong> <div>${value.title}</div>`)
  );
  card.appendChild(
    createField(`<strong>News Site:</strong> ${value.newsSite}`)
  );
  card.appendChild(
    createField(
      `<strong>Published at:</strong> <div>${value.publishedAt}</div>`
    )
  );
  if (value.summary.length > 200) {
    card.appendChild(
      createField(
        `<strong>Summary:</strong> <div>${value.summary.substring(
          0,
          200
        )}</div>`
      )
    );
  } else {
    card.appendChild(
      createField(`<strong>Summary:</strong> <div>${value.summary}</div>`)
    );
  }
  card.appendChild(createhyperLinkButton(value.url));
  return card;
}
function sortByDate() {
  localArr.sort((a, b) => {
    if (a.publishedAt > b.publishedAt) {
      return -1;
    } else if (a.publishedAt < b.publishedAt) {
      return 1;
    }
  });
  showList.innerHTML = "";
  getData();
}
function sortByReverseDate() {
  localArr.sort((a, b) => {
    if (a.publishedAt < b.publishedAt) {
      return -1;
    } else if (a.publishedAt > b.publishedAt) {
      return 1;
    }
  });
  showList.innerHTML = "";
  getData();
}
function sortByTitle() {
  localArr.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    } else if (a.title > b.title) {
      return 1;
    }
  });
  showList.innerHTML = "";
  getData();
}
function sortByReverseTitle() {
  localArr.sort((a, b) => {
    if (b.title < a.title) {
      return -1;
    } else if (b.title > a.title) {
      return 1;
    }
  });
  showList.innerHTML = "";
  getData();
}
function getData() {
  localArr.map((value) => {
    const card = createCard(value);
    showList.appendChild(card);
  });
}

getData();
