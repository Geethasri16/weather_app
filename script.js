async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const resultBox = document.getElementById("weatherResult");

  if (location === "") {
    resultBox.innerHTML = "Please enter a location.";
    return;
  }

  const apiKey = "66b324488b684b3d869232348251006";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Location not found");

    const data = await response.json();

    const tempC = data.current.temp_c;
    const condition = data.current.condition.text;
    const city = data.location.name;
    const country = data.location.country;

    resultBox.innerHTML = `
      <strong>${city}, ${country}</strong><br>
      Temperature: ${tempC}°C<br>
      Condition: ${condition}
    `;
  } catch (error) {
    resultBox.innerHTML = `Error: ${error.message}`;
  }
}
