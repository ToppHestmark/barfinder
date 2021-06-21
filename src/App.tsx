import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import fetchNearbyPlaces from "./api";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { containerStyle, center, options } from "./settings";
import { Wrapper, LoadingView } from "./App.styles";
import beerIcon from "./images/beer.svg";
import { MarkerType } from "./api.models";

const App: React.FC = () => {
  const [clickedPos, setClickedPos] = useState<google.maps.LatLngLiteral>(
    {} as google.maps.LatLngLiteral
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!,
  });

  const mapRef = useRef<google.maps.Map<Element> | null>(null);

  const {
    data: nearbyPositions,
    isLoading,
    isError,
  } = useQuery(
    [clickedPos.lat, clickedPos.lng],
    () => fetchNearbyPlaces(clickedPos.lat, clickedPos.lng),
    {
      enabled: !!clickedPos.lat,
      refetchOnWindowFocus: false,
    }
  );

  const onLoad = (map: google.maps.Map<Element>): void => {
    mapRef.current = map;
  };

  const onUnMount = (): void => {
    mapRef.current = null;
  };

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    setClickedPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const onMarkerClick = (marker: MarkerType) => console.log(marker);

  if (!isLoaded) return <div>Map loading...</div>;

  return (
    <Wrapper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options as google.maps.MapOptions}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnMount}
        onClick={onMapClick}
      >
        {clickedPos.lat ? <Marker position={clickedPos} /> : null}
        {nearbyPositions?.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.location}
            onClick={() => onMarkerClick(marker)}
            icon={{
              url: beerIcon,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
      </GoogleMap>
    </Wrapper>
  );
};

export default App;
