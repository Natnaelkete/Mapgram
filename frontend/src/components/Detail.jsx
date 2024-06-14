import { format } from "timeago.js";
import Star from "../Ui/Star";
import { Spin } from "antd";
import useMapin from "./useMapin";

function Detail() {
  const { pinDetail, isGettingPinDetail } = useMapin();

  if (isGettingPinDetail) {
    return <Spin />;
  }

  return (
    <div>
      <div>
        <h1 className="flex justify-center font-bold text-3xl mb-5 text-center">
          {pinDetail?.title}
        </h1>

        <p
          id="description"
          className="text-gray-700 mb-6  text-[17px] leading-8"
        >
          {pinDetail.desc}
        </p>

        <Star value={pinDetail?.rating} />

        <p
          id="info"
          className="absolute bottom-0 right-0 font-bold text-gray-600"
        >{`Created ${format(pinDetail?.createdAt)}`}</p>
      </div>
    </div>
  );
}

export default Detail;
