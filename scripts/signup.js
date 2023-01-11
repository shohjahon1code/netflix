const elForm = document.querySelector("#form");

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    email: e.target.email.value,
    password: e.target.password.value,
    phone: e.target.phone.value,

    name: "name",
    inn: 123123,
    company_name: "kompany",
    type: "partner",
    bank_account: "asdasd",
    bank_name: "bank",
    mfo: 12123123321123,
    company_address: "asdasdwqeq",
  };

  (async function () {
    try {
      const res = await fetch("https://backend.gazoil.uz/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 201) {
        window.location.href = "../pages/film.html";
      } else {
        let error = document.querySelector(".error-message");
        error.style.display = "block";
        error.textContent = "Email yoki parol oldin ishlatilgan";

        setTimeout(() => {
          error.style.display = "none";
        }, 3000);
      }

      localStorage.setItem("token", "token");
    } catch (error) {
      console.log(error.message);
    }
  })();
});
