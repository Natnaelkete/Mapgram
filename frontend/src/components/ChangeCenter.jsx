import { useMap } from "react-leaflet";

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default ChangeCenter;
