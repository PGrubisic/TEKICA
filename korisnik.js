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
        <td><button class="updateDeleteBtn izmijeniBtn" onclick="rezervirajUslugu(${
          usluga.id
        })">Rezerviraj uslugu</button></td>
      `;
      tbody.appendChild(red);
    }

    tablica.style.display = "table";
  }
});
