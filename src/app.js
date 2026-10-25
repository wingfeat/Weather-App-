const weatherKey = "4M2JW8RJ9HWG25FA7XFFJBJX9";

export async function getWeatherInfos(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=us&key=${weatherKey}`,
    );

    if (!response.ok) throw new Error("Vérifiez l'orthographe !");

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log("Erreur :", error);
  }
}

export async function showWeatherInfos(city) {
  const cityInfos = await getWeatherInfos(city);
  if (cityInfos === undefined) return;
  console.log(`${cityInfos.description} `);
}

showWeatherInfos("New York");
