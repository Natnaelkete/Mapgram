import { createContext, useContext, useEffect, useState } from "react";

import customIcon5 from "../assets/img/customIcon5.png";
import customIcon4 from "../assets/img/customIcon4.png";

import L from "leaflet";

import useGeolocation from "../hooks/useGeolocation";
import useUrlPosition from "../hooks/useUrlPosition";
import { getLatlng } from "../services/apiGeocoding";

const mapContext = createContext();

function MapProvider({ children }) {
  const [mapPosition, setMapPosition] = useState([9.0358287, 38.7524127]);

  const {
    getPosition,
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchQuery1 = formData.get("search");
    if (!searchQuery1) return;

    const AddressInfo = getLatlng(searchQuery1);
    AddressInfo.then((resultArray) => {
      setMapPosition([resultArray[0].lat, resultArray[0].lon]);
    });
  }

  const customIconOptions2 = {
    iconUrl: customIcon4,
    iconSize: [38, 38], // Size of the icon [width, height]
    iconAnchor: [19, 38], // Anchor point of the icon relative to its top left corner
    popupAnchor: [0, -38], // Anchor point for popups relative to the icon
  };
  const customIconOptions = {
    iconUrl: customIcon5,
    iconSize: [25, 36], // Size of the icon [width, height]
    iconAnchor: [19, 38], // Anchor point of the icon relative to its top left corner
    popupAnchor: [0, -38], // Anchor point for popups relative to the icon
  };

  // Create a custom icon instance
  const customIcon1 = L.icon(customIconOptions);
  const customIcon2 = L.icon(customIconOptions2);

  return (
    <mapContext.Provider
      value={{
        customIcon1,
        customIcon2,
        mapPosition,
        handleSubmit,
        getPosition,
        isLoadingPosition,
        geoLocationPosition,
      }}
    >
      {children}
    </mapContext.Provider>
  );
}

function useMapContext() {
  const context = useContext(mapContext);
  if (context === undefined) {
    throw new Error("context is used outside the mapProvider");
  }
  return context;
}
export { MapProvider, useMapContext };
