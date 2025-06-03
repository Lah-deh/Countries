console.log("Script is loading...");

let container = document.querySelector(".contain");
const searchInput = document.querySelector(".form");
const regionFilter = document.getElementById("region-filter");

let countries = [];


fetch("https://restcountries.com/v3.1/all")
  .then(res => res.json())
  .then(data => {
    countries = data;
    showCountries(countries);
  })
  .catch(err => console.error("Error Fetching Countries:", err));


function showCountries(data) {
  container.innerHTML = ""; 
  data.forEach(country => {
    let card = document.createElement("div");
    card.classList.add("country-card");
    card.innerHTML = `
      <img src="${country.flags.svg}" alt="flag of ${country.name.common}">
      <div class="card-content">
        <h3>${country.name.common}</h3>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(value)
  );
  showCountries(filtered);
});
regionFilter.addEventListener("change", () => {
  const selectedRegion = regionFilter.value;

  const filtered = selectedRegion
    ? countries.filter(country => country.region === selectedRegion)
    : countries;

  showCountries(filtered); 
});




const toggleIcon = document.querySelector(".dark");

toggleIcon.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    toggleIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    toggleIcon.classList.replace("fa-sun", "fa-moon");
  }
});

