// @ts-check

(async () => {
  try {
    const idSoftwareRemoto = document.querySelector("#software-remoto");
    const response = await fetch(
      "https://api.github.com/repos/rustdesk/rustdesk/releases/latest"
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    if (navigator.platform === "Win32") {
      const url = json.assets.find((asset) =>
        asset.browser_download_url.includes(".msi")
      );
      idSoftwareRemoto?.setAttribute("href", url.browser_download_url);
      //console.log(url.browser_download_url);
    }

    if (navigator.platform === "Mac") {
      const url = json.assets.find((asset) =>
        asset.browser_download_url.includes("x86_64.dmg")
      );
      idSoftwareRemoto?.setAttribute("href", url.browser_download_url);
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
