const template = document.querySelector("#template");
const logout = document.querySelector("#logout");
const elPopularPost = document.querySelector(".box");
const elTvShow = document.querySelector("#tv-show");
const elBlockbuster = document.querySelector("#blockbuster");
const elOriginalNetflix = document.querySelector("#netflix-original");
let popular = [];

const logoutHandler = () => {
  window.location.href = "../index.html";
};

(async function () {
  const res = await fetch(
    `https://639c0ef864fcf9c11caa1a4a.mockapi.io/popular`
  );
  const data = await res.json();
  popular = data;
  renderPost(popular, elPopularPost, "popular");
  renderPost(popular, elTvShow, "tvShow");
})();

// fetch blockbuster
(async function () {
  const res = await fetch(
    `https://639c0ef864fcf9c11caa1a4a.mockapi.io/blockbuster`
  );
  const data = await res.json();
  renderPost(data, elBlockbuster, "blockbuster");
  renderPost(data, elOriginalNetflix, "original");
})();

// render popular posts
function renderPost(arr, parent = elPopularPost, type = "popular") {
  if (type == "popular") {
    const fragment = document.createDocumentFragment();
    arr.slice(0, 12).forEach((el) => {
      const cloneTemplate = template.content.cloneNode(true);
      const img = cloneTemplate.querySelector(".card-image-container img");
      const name = cloneTemplate.querySelector(".card-title");
      const genre = cloneTemplate.querySelector(".text-left");
      const year = cloneTemplate.querySelector(".text-right");
      const btn = cloneTemplate.querySelector(".singleBtn");

      img.src = el.banner;
      name.textContent = el.name;
      genre.textContent = el.genre;
      year.textContent = el.createdAt;
      btn.dataset.id = el.id;
      fragment.append(cloneTemplate);
    });
    parent.append(fragment);
  } else if (type == "tvShow") {
    const fragmentTv = document.createDocumentFragment();

    arr
      .reverse()
      .slice(1, 13)
      .forEach((item) => {
        const tvLink = document.createElement("div");
        const tvImage = document.createElement("img");
        tvLink.className = "tv-link";

        tvImage.src = item.banner;
        tvLink.appendChild(tvImage);
        fragmentTv.appendChild(tvLink);
      });
    parent.appendChild(fragmentTv);
  } else if (type == "blockbuster") {
    const fragmentBlockbuster = document.createDocumentFragment();
    arr.slice(0, 6).forEach((block) => {
      const elBlockLink = document.createElement("div");
      const elBlockImage = document.createElement("img");
      elBlockLink.className = "tv-link";

      elBlockImage.src = block.avatar;
      elBlockLink.append(elBlockImage);
      fragmentBlockbuster.append(elBlockLink);
    });
    parent.append(fragmentBlockbuster);
  } else if (type == "original") {
    const fragmentBlockbuster = document.createDocumentFragment();
    arr.reverse().slice(0, 6).forEach((block) => {
      const elBlockLink = document.createElement("div");
      const elBlockImage = document.createElement("img");
      elBlockLink.className = "tv-link";

      elBlockImage.src = block.avatar;
      elBlockLink.append(elBlockImage);
      fragmentBlockbuster.append(elBlockLink);
    });
    parent.append(fragmentBlockbuster);
  }
}

// single page

elPopularPost.addEventListener("click", (e) => {
  const event = e.target;

  if (event.matches(".singleBtn")) {
    const id = event.dataset.id;
    localStorage.setItem("id", id);
    window.location.href = "../pages/single-page.html";
  }
});

logout.addEventListener("click", logoutHandler);
