const weatherKey = "4M2JW8RJ9HWG25FA7XFFJBJX9";

export async function getWeatherInfos(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&key=${weatherKey}`,
    );

    if (!response.ok) throw new Error("Vérifiez l'orthographe !");

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Erreur :", error);
  }
}

export async function returnWeatherInfos(city) {
  const cityInfos = await getWeatherInfos(city);
  if (cityInfos === undefined) return;

  const cityObject = {
    name: cityInfos.resolvedAddress,
    description: cityInfos.description,
    icon: cityInfos.currentConditions.icon,
    dateTime: cityInfos.currentConditions.datetime,
    temperature: cityInfos.currentConditions.temp,
    uvIndex: cityInfos.currentConditions.uvindex,
    nextDays: cityInfos.days.slice(0, 5).map((day) => ({
      dateTime: day.datetime,
      description: day.description,
      tempMax: day.tempmax,
      tempMin: day.tempmin,
      uvIndex: day.uvindex,
      preciptype: day.preciptype,
      icon: day.icon,
    })),
  };

  return cityObject;
}
