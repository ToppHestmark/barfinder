export type MarkerType = {
  id: string;
  location: google.maps.LatLngLiteral;
  name: string;
  phone_number: string;
  website: string;
};

export type WeatherType = {
  temp: number;
  text: string;
};
