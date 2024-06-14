import { format } from "timeago.js";
import { Popup } from "react-leaflet";
import { Spin } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import Star from "../Ui/Star";
import Drawers from "./Drawer";
import useMapin from "./useMapin";

function Popups({ pin }) {
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user");
  const id = searchParams.get("id");

  const { likedPin, Like, likesPin, gettingLikedPin } = useMapin();
  const exist = likedPin === id;

  function handleClick() {
    Like({ users: user, ids: id });
  }

  if (gettingLikedPin) {
    return (
      <Popup>
        <Spin className="flex justify-center items-center w-[200px] h-[200px]" />
      </Popup>
    );
  }

  return (
    <Popup>
      <div className="w-[200px]">
        <h1 className="flex justify-center font-bold text-xl mb-5 text-center">
          {pin.title}
        </h1>

        <p id="description" className="text-gray-500">
          {`${pin.desc.substring(0, 130)}...`}
        </p>

        <Star value={pin.rating} />

        <p id="info">{`Created ${format(pin.createdAt)}`}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <span className="mt-1">{`${
            likesPin?.length !== 0 ? `${likesPin?.length} likes` : ""
          }`}</span>
          <button onClick={handleClick}>
            {exist ? (
              <LikeFilled style={{ fontSize: "18px", color: "red" }} />
            ) : (
              <LikeOutlined style={{ fontSize: "18px" }} />
            )}
          </button>
        </div>

        <Drawers pin={pin} />
      </div>
    </Popup>
  );
}

export default Popups;
