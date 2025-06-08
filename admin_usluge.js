document.addEventListener("DOMContentLoaded", async () => {
  const tablica = document.querySelector(".tablica");
  const tbody = document.querySelector(".tablicaBody");

  async function dohvatiPodatke() {
    const podatci = await fetch(
      "http://localhost/Tekica/api/all_usluga_api.php"
    ).then((data) => data.json());
    return podatci.response;
  }

  if (tbody.children.length === 0) {
    const usluge = await dohvatiPodatke();

    for (let i = 0; i < usluge.length; i++) {
      const usluga = usluge[i];
      const red = document.createElement("tr");
      red.innerHTML = `
        <td>${i + 1}</td>
        <td>${usluga.id}</td>
        <td>${usluga.korisnik_id}</td>
        <td>${usluga.naziv}</td>
        <td>${usluga.trajanje}</td>
        <td>${usluga.cijena}</td>
        <td><button class="updateDeleteBtn" onclick="obrisiUslugu(${
          usluga.id
        })">Obriši uslugu</button></td>
        <td><button class="updateDeleteBtn izmijeniBtn">Izmjeni uslugu</button></td>
      `;
      tbody.appendChild(red);
    }

    tablica.style.display = "table";
  }

  // MODAL: Dodavanje
  const modalDodaj = document.getElementById("modalDodaj");
  const btnDodaj = document.getElementById("dodajBtn");
  const spanCloseDodaj = modalDodaj.querySelector(".close");

  btnDodaj.onclick = () => (modalDodaj.style.display = "block");
  spanCloseDodaj.onclick = () => (modalDodaj.style.display = "none");

  // MODAL: Zatvaranje klikom van modal
  window.addEventListener("click", (e) => {
    if (e.target === modalDodaj) modalDodaj.style.display = "none";
    if (e.target === modalIzmjeni) modalIzmjeni.style.display = "none";
  });

  // MODAL: Izmjena
  const modalIzmjeni = document.getElementById("modalIzmjeni");
  const spanCloseIzmjeni = modalIzmjeni.querySelector(".close");
  spanCloseIzmjeni.onclick = () => (modalIzmjeni.style.display = "none");

  document.querySelector(".tablicaBody").addEventListener("click", (e) => {
    if (e.target.classList.contains("izmijeniBtn")) {
      modalIzmjeni.style.display = "block";

      const red = e.target.closest("tr");
      const cells = red.querySelectorAll("td");

      modalIzmjeni.querySelector("input[name='id']").value =
        cells[1].textContent;
      modalIzmjeni.querySelector("input[name='korisnik_id']").value =
        cells[2].textContent;
      modalIzmjeni.querySelector("input[name='naziv']").value =
        cells[3].textContent;
      modalIzmjeni.querySelector("input[name='trajanje']").value =
        cells[4].textContent;
      modalIzmjeni.querySelector("input[name='cijena']").value =
        cells[5].textContent;
    }
  });

  // FORMA: Izmjena
  document
    .querySelector("#formaizmjenaUsluge")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const unosi = Object.fromEntries(new FormData(e.target).entries());
      fetch("http://localhost/Tekica/api/update_usluga_api.php", {
        method: "POST",
        body: JSON.stringify(unosi),
      })
        .then((res) => res.json())
        .then((data) => alert(data?.message))
        .finally(() => setTimeout(() => location.reload(), 500));
    });

  // FORMA: Dodavanje
  const formaDodaj = document.getElementById("formaDodaj");
  formaDodaj.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(formaDodaj);
    const unosi = Object.fromEntries(formData.entries());

    fetch("http://localhost/Tekica/api/add_usluga_api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(unosi),
    })
      .then((res) => res.json())
      .then((data) => alert(data?.message || "Usluga uspješno dodana"))
      .catch((err) => {
        console.error("Greška pri dodavanju usluge:", err);
        alert("Došlo je do pogreške pri dodavanju usluge.");
      })
      .finally(() => setTimeout(() => location.reload(), 500));
  });

  // BRISANJE USLUGE
  window.obrisiUslugu = async (id) => {
    const res = await fetch(
      "http://localhost/Tekica/api/delete_usluga_api.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }
    );

    const data = await res
      .clone()
      .json()
      .catch(() => res.text());
    const msg =
      data?.message || (typeof data === "string" ? data : "Usluga obrisana.");
    alert(msg);

    if (res.ok) {
      setTimeout(() => location.reload(), 500);
    }
  };
});
