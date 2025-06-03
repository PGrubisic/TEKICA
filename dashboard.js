document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");
  const tablica = document.querySelector(".tablica");
  const tbody = document.querySelector(".tablicaBody");

  async function dohvatiPodatke() {
    const podatci = await fetch(
      "http://localhost/Tekica/api/all_korisnik_api.php"
    ).then((data) => data.json());

    return podatci.response;
  }

  btn.addEventListener("click", async () => {
    btn.style.display = "none";

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
        `;
        tbody.appendChild(red);
      }
    }

    tablica.style.display = "table";
  });
});
