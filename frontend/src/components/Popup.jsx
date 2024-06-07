import { format } from "timeago.js";
import { Popup } from "react-leaflet";
import Star from "../Ui/Star";
import Drawers from "./Drawer";

function Popups({ pin }) {
  return (
    <Popup className="">
      <div className="w-[200px]">
        <h1 className="flex justify-center font-bold text-xl mb-5 text-center">
          {pin.title}
        </h1>

        <p id="description" className="text-gray-500">
          {pin.desc.substring(0, 130)}
        </p>

        <Star value={pin.rating} />
        <Drawers />
        <p id="info">{`Created ${format(pin.createdAt)}`}</p>
      </div>
    </Popup>
  );
}

export default Popups;
