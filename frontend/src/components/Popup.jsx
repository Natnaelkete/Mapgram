import { format } from "timeago.js";
import { Popup } from "react-leaflet";

function Popups({ pin }) {
  return (
    <div>
      <Popup className="">
        <div className="w-[250px]">
          <label htmlFor="title" className=" underline">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="border-b border-gray-300 focus:border-indigo-500 outline-none max-w-xs w-full mt-2 mb-5 bg-white"
            defaultValue={pin.title}
          />
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            type="text"
            className=" border rounded-sm border-gray-400 max-w-xs w-full mb-5 mt-2 bg-white"
            defaultValue={pin.desc}
          />
          <label htmlFor="rating ">Rating</label>
          <input
            id="rating"
            type="text"
            className="border-b mt-2 border-gray-300 focus:border-indigo-500 outline-none max-w-xs w-full mb-5  bg-white"
            defaultValue={pin.rating}
          />
          <label htmlFor="info">Info</label>
          <p id="info">{`Created ${format(pin.createdAt)}`}</p>
        </div>
      </Popup>
    </div>
  );
}

export default Popups;
