import { Image, Spin } from "antd";
import useMapin from "./useMapin";

function ImageGallery() {
  const { pinDetail, isGettingPinDetail } = useMapin();

  if (isGettingPinDetail) {
    return <Spin />;
  }

  return (
    <>
      {pinDetail?.images.length !== 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
          {pinDetail.images.map((image, index) => (
            <li key={index} className="">
              <Image src={image} width={150} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl">There are no images yet</p>
        </div>
      )}
    </>
  );
}

export default ImageGallery;
