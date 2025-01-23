// @ts-check
const idSoftwareRemoto = document.querySelector("#software-remoto");

// Mapeo de plataformas a patrones de búsqueda en los nombres de archivo
const platformPatterns = {
  Win32: "x86_64.exe",       // Windows
  Android: "universal-signed.apk", // Android
  Mac: "x86_64.dmg",         // macOS
  Linux: ".AppImage",        // Linux (si es necesario)
};

(async () => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/rustdesk/rustdesk/releases/latest"
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const platform = navigator.platform;

    // Obtener el patrón de búsqueda para la plataforma actual
    const pattern = platformPatterns[platform];

    if (pattern) {
      // Buscar el archivo que coincida con el patrón
      const asset = json.assets.find((asset) =>
        asset.browser_download_url.includes(pattern)
      );

      if (asset) {
        // Asignar la URL al enlace
        idSoftwareRemoto?.setAttribute("href", asset.browser_download_url);
        console.log("Download link set for platform:", platform);
      } else {
        console.warn(`No asset found for platform: ${platform}`);
      }
    } else {
      console.warn(`Unsupported platform: ${platform}`);
    }
  } catch (error) {
    console.error(error.message);
  }
})();

function getYearsWorking() {
  const counterDate = document.querySelector("#counter-date");
  const counterHours = document.querySelector("#counter-hours");
  const counterClients = document.querySelector("#counter-clients");

  const yearStart = 2015;
  const currentYear = new Date().getFullYear();

  const yearsDifference = currentYear - yearStart;

  if (counterDate != null && counterHours != null && counterClients != null) {
    counterDate.innerHTML = yearsDifference.toString();
    counterHours.innerHTML = (yearsDifference * 5 * 6 * 4 * 12).toString();
    counterClients.innerHTML = (yearsDifference * 6 * 12).toString();
  }
}

getYearsWorking();
