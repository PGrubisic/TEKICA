document.addEventListener("DOMContentLoaded", async () => {
  const tablica = document.querySelector(".tablica");
  const tbody = document.querySelector(".tablicaBody");

  async function dohvatiPodatke() {
    const podatci = await fetch(
      "http://localhost/Tekica/api/all_korisnik_api.php"
    ).then((data) => data.json());
    return podatci.response;
  }

  if (tbody.children.length === 0) {
    const korisnici = await dohvatiPodatke();

    for (let i = 0; i < korisnici.length; i++) {
      const korisnik = korisnici[i];

      const red = document.createElement("tr");
      red.innerHTML = `
        <td>${i + 1}</td>
        <td>${korisnik.id}</td>
        <td>${korisnik.naziv}</td>
        <td>${korisnik.mail}</td>
        <td>${korisnik.telefon}</td>
        <td>${korisnik.adresa}</td>
        <td>${korisnik.porezni_broj}</td>
        <td><button class="updateDeleteBtn izmijeniBtn">Izmjeni korisnika</button></td>
        <td><button class="updateDeleteBtn" onclick="obrisiKorisnika(${
          korisnik.id
        })">Obriši korisnika</button></td>
      `;
      tbody.appendChild(red);
    }

    tablica.style.display = "table";
  }
});

// ***** MODAL ZA DODAVANJE *****

const modal = document.getElementById("myModal");
const btn = document.getElementById("dodajBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = () => (modal.style.display = "block");
span.onclick = () => (modal.style.display = "none");
window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
};

// ***** FORMA ZA DODAVANJE *****

const formaKorisnik = document.getElementById("formaKorisnik");
formaKorisnik.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(formaKorisnik);
  const unosi = Object.fromEntries(formData.entries());

  async function dodajKorisnika() {
    const POST_API = "http://localhost/Tekica/api/add_korisnik_api.php";

    await fetch(POST_API, {
      method: "POST",
      body: JSON.stringify(unosi),
    })
      .then((res) => res.json())
      .then((data) => alert(data?.message));
  }

  dodajKorisnika();

  setTimeout(() => location.reload(), 1500);
});

// ***** BRISANJE KORISNIKA *****
const obrisiKorisnika = async (id) => {
  const DELETE_API = "http://localhost/Tekica/api/delete_korisnik_api.php";

  await fetch(DELETE_API, {
    method: "POST",
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((data) => alert(data?.message));

  setTimeout(() => location.reload(), 1500);
};

// ***** MODAL ZA IZMJENU *****
const modal2 = document.getElementById("myModal2");
const span2 = document.getElementsByClassName("close")[1]; // Drugi close gumb

span2.onclick = () => (modal2.style.display = "none");
window.onclick = (event) => {
  if (event.target == modal2) modal2.style.display = "none";
};

// ***** OTVARANJE MODALA ZA UPDATE I PUNJENJE PODACIMA *****

document.querySelector(".tablicaBody").addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("izmijeniBtn")) {
    modal2.style.display = "block";

    const red = e.target.closest("tr");
    const cells = red.querySelectorAll("td");

    document.querySelector("#updateId").value = cells[1].textContent;
    document.querySelector("#myModal2 input[name='naziv']").value =
      cells[2].textContent;
    document.querySelector("#myModal2 input[name='mail']").value =
      cells[3].textContent;
    document.querySelector("#myModal2 input[name='telefon']").value =
      cells[4].textContent;
    document.querySelector("#myModal2 input[name='adresa']").value =
      cells[5].textContent;
    document.querySelector("#myModal2 input[name='porezni_broj']").value =
      cells[6].textContent;
  }
});

// ***** FORMA IZMJENE KORISNIKA *****

const formaIzmjena = document.querySelector("#myModal2 form");

formaIzmjena.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(formaIzmjena);
  const unosi = Object.fromEntries(formData.entries());

  async function izmjeniKorisnika() {
    const UPDATE_API = "http://localhost/Tekica/api/update_korisnik_api.php";

    await fetch(UPDATE_API, {
      method: "POST",
      body: JSON.stringify(unosi),
    })
      .then((res) => res.json())
      .then((data) => alert(data?.message));
  }

  izmjeniKorisnika();

  setTimeout(() => location.reload(), 1500);
});
