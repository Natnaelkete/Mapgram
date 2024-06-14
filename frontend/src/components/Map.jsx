import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import PopupForm from "./PopupForm";

import useMapin from "./useMapin";
import { useAuth } from "./AuthProvider";
import { useMapContext } from "./MapProvider";
import DetectClick from "./DetectClick";
import ChangeCenter from "./ChangeCenter";
import Navbar from "./Navbar";
import Popups from "./Popup";

function Map() {
  const { user } = useAuth();
  const { pins: Pin, followedUserPin } = useMapin();

  const {
    customIcon1,
    customIcon2,
    mapPosition,
    getPosition,
    handleClick,
    handleUserIdClick,
    isLoadingPosition,
    geoLocationPosition,
  } = useMapContext();

  return (
    <>
      <div className="h-screen relative">
        {!geoLocationPosition && (
          <button
            className="btn btn-success text-white absolute z-[1000] mx-[43%] mt-[40%] bottom-8"
            type="position"
            onClick={getPosition}
          >
            {isLoadingPosition ? "Loading.." : "Use your position"}
          </button>
        )}

        <Navbar />

        <MapContainer
          center={mapPosition}
          zoom={13}
          scrollWheelZoom={true}
          className="h-screen"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {Pin?.pins.map((pin) => (
            <Marker
              key={pin._id}
              position={[pin.lat, pin.long]}
              icon={Pin.username === user?.username ? customIcon2 : customIcon1}
              eventHandlers={{
                click: () => handleClick(pin._id, Pin._id),
              }}
            >
              <Popups pin={pin} />
            </Marker>
          ))}
          {followedUserPin?.map((pin) =>
            pin.pins.map((p) => (
              <Marker
                key={p._id}
                position={[p.lat, p.long]}
                icon={customIcon1}
                eventHandlers={{
                  click: () => handleUserIdClick(p._id, pin._id),
                }}
              >
                <Popups pin={p} />
              </Marker>
            ))
          )}

          <Marker
            position={[mapPosition[0], mapPosition[1]]}
            icon={customIcon2}
          >
            <Popup>
              <PopupForm />
            </Popup>
          </Marker>
          <DetectClick />
          <ChangeCenter position={mapPosition} />
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
