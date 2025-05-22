function prijava() {
  const ime = document.getElementById("ime").value;
  const passwd = document.getElementById("passwd").value;

  if (ime === "" || passwd === "") {
    alert("Unesite podatke pravilno.");
  } else {
    console.log("Prijava je uspjesna");
  }
}

const forma = document.getElementById("formaPrijava");
formaPrijava.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(formaPrijava);
});
