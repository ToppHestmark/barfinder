import { MarkerType } from "./api.models";

const PLACE_RADIUS = 2500; // in meters
const TYPE = "bar";

const fetchNearbyPlaces = async (
  lat: number,
  lng: number
): Promise<MarkerType[]> => {
  const response = await fetch(
    `https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${lat}%2C${lng}&language=en&radius=${PLACE_RADIUS}&type=${TYPE}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_API_KEY!,
        "x-rapidapi-host": "trueway-places.p.rapidapi.com",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Oh no! something went wrong.");
  }

  const data = await response.json();
  return data.results;
};

export default fetchNearbyPlaces;
