const id = localStorage.getItem("id");
const elTemplate = document.querySelector("#single-template");

const renderPost = (obj) => {
  const img = document.querySelector("#single-img");
  const title = document.querySelector(".card-title");
  img.src = obj.banner;
  title.textContent = obj.name
};

const fetchData = async () => {
  const res = await fetch(
    `https://639c0ef864fcf9c11caa1a4a.mockapi.io/popular/${id}`
  );
  const data = await res.json();
  renderPost(data);
}

fetchData();
