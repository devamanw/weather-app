const apiKey = "5453152522c94de7b88190506251607";

document.getElementById("weatherForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const location = document.getElementById("locationInput").value;
  const resultDiv = document.getElementById("weatherResult");

  fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`)
    .then((response) => {
      if (!response.ok) throw new Error("Location not found");
      return response.json();
    })
    .then((data) => {
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      const icon = data.current.condition.icon;
      const city = data.location.name;
      const country = data.location.country;

      resultDiv.innerHTML = `
        <h2>${city}, ${country}</h2>
        <img src="https:${icon}" alt="${condition}" />
        <p><strong>${condition}</strong></p>
        <p>🌡️ Temperature: ${temp} °C</p>
      `;
    })
    .catch((error) => {
      resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
});
