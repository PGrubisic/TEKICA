function prijava(event) {
  event.preventDefault();

  const ime = document.getElementById("imeInput").value.trim();
  const lozinka = document.getElementById("lozinkaInput").value.trim();

  if (ime === "Admin" && lozinka === "lozinka") {
    window.location.href = "dashboard.html";
  } else if (ime === "" || lozinka === "") {
    alert("Nisi unio ime ili lozinku");
  } else {
    alert("Neispravni podaci za prijavu.");
  }
}

document.getElementById("formaPrijava").addEventListener("submit", prijava);
