const numberOfArticle = document.getElementById("article-number");
const stickyInfo = document.getElementById("sticky-info");
let articleLimit = 15;
const showList = document.getElementById("create-list");
const loading = document.querySelector(".loading");
let changer = false;
let arr = [];
let arrAddArticle = [];
let articleNumber;
async function getISS() {
  const articleCountResponse = await fetch(
    `https://api.spaceflightnewsapi.net/v3/articles/count`
  );
  const articleCount = await articleCountResponse.json();
  if (changer == false) {
    const response = await fetch(
      `https://api.spaceflightnewsapi.net/v3/articles?_start=${
        articleCount - articleLimit
      }&_limit=${articleCount}&_sort=id`
    );
    const data = await response.json();
    arr = [...data];
    arr.sort((a, b) => {
      if (a.id < b.id) {
        return 1;
      } else if (a.id > b.id) {
        return -1;
      }
    });
  } else if (changer == true) {
    const newArticleNumber = await fetch(
      `https://api.spaceflightnewsapi.net/v3/articles?_start=${
        articleCount - articleLimit - 15
      }&_limit=15&_sort=id`
    );
    arrAddArticle = await newArticleNumber.json();
    arrAddArticle.sort((a, b) => {
      if (a.id < b.id) {
        return 1;
      } else if (a.id > b.id) {
        return -1;
      }
    });
  }
  function createField(name) {
    const li = document.createElement("li");
    li.innerHTML = name;
    return li;
  }
  function createhyperLinkButton(name) {
    const button = document.createElement("a");
    button.setAttribute("href", name);
    button.setAttribute("class", "link-button");
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
    const button = document.createElement("button");
    button.setAttribute("class", "article-button");
    button.setAttribute("enabled", "enabled");
    button.innerText = "Add to Library";

    button.addEventListener("click", (e) => {
      e.target.enabled = !e.target.enabled;
      if (button.enabled == true) {
        button.innerHTML = "Remove from Library";
        card.style.borderColor = "white";
        addArticle(value);
      } else {
        button.innerHTML = "Add to Library";
        card.style.borderColor = "black";
        removeArticle(value);
      }
    });
    card.appendChild(button);
    return card;
  }

  if (!changer) {
    arr.map((value, index, array) => {
      const card = createCard(value, index, array);
      showList.appendChild(card);
    });
  } else {
    arrAddArticle.map((value) => {
      const card = createCard(value);
      showList.appendChild(card);
    });
    articleLimit = articleLimit + 15;
  }
  stickyInfo.innerHTML = `<strong>Number of articles:</strong><br>${articleLimit} / ${articleCount} `;
  loading.classList.remove("show");
}
function insertQuantityOfArticle() {
  if (isNaN(numberOfArticle.value)) {
    numberOfArticle.value = "integer is required";
  } else if (!isNaN(numberOfArticle.value)) {
    changer = false;
    let showList = document.getElementById("create-list");
    showList.innerHTML = "";
    articleLimit = numberOfArticle.value;
    getISS();
  }
}
const enterKeyboard = (e) => {
  switch (e.keyCode) {
    case 13:
      if (isNaN(numberOfArticle.value)) {
        numberOfArticle.value = "integer is required";
      } else if (!isNaN(numberOfArticle.value)) {
        changer = false;
        let showList = document.getElementById("create-list");
        showList.innerHTML = "";
        articleLimit = numberOfArticle.value;
        getISS();
      }
      break;
    case 8:
    case 46:
      numberOfArticle.value = "";
      break;
  }
};
numberOfArticle.addEventListener("keydown", enterKeyboard);
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight) {
    showLoading();
  }
  changer = true;
});
function showLoading() {
  loading.classList.add("show");
  setTimeout(getISS, 1000);
}
let localStorageArr = [];
function addArticle(name) {
  localStorageArr.push(name);
  localStorage.setItem("textvalues", JSON.stringify(localStorageArr));
}
function removeArticle(name) {
  localStorageArr.findIndex((value, index) => {
    if (value.id == name.id) {
      localStorageArr.splice(index, 1);
      localStorage.setItem("textvalues", JSON.stringify(localStorageArr));
    }
  });
}
function inputInsertValue() {
  numberOfArticle.value = "";
}
getISS();
