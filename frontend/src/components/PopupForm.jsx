import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useMapin from "./useMapin";
// import { useAuth } from "./AuthProvider";

function PopupForm() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [searchParams] = useSearchParams();
  const { createPin, isCreating } = useMapin();
  // const { user } = useAuth();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(files);

    const previewsArray = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewsArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", e.target.title.value);
    formData.append("desc", e.target.desc.value);
    formData.append("rating", e.target.rating.value);
    formData.append("lat", searchParams.get("lat"));
    formData.append("long", searchParams.get("lng"));

    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    createPin(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-4 h-[300px] w-[250px] overflow-y-scroll"
      style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "none" }}
    >
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        className="border-b border-gray-300 focus:border-indigo-500 outline-none max-w-xs w-full mb-5 bg-white"
      />

      <label htmlFor="review">Description</label>
      <textarea
        id="review"
        name="desc"
        className="border-b border-gray-300 focus:border-indigo-500 outline-none max-w-xs w-full mb-5 bg-white"
      />

      <label htmlFor="rating">Rating (0 upto 5)</label>
      <input
        id="rating"
        name="rating"
        type="number"
        max={5}
        min={0}
        className="border-b border-gray-300 focus:border-indigo-500 outline-none max-w-xs w-full mb-5 bg-white"
      />

      <label htmlFor="images">Upload Images</label>
      <input
        id="images"
        name="images"
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-5"
      />

      <div className="image-previews mb-5 flex flex-wrap gap-2 ">
        {imagePreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index}`}
            className=" rounded-full"
            style={{ width: "70px", height: "70px", objectFit: "cover" }}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={isCreating}
        className="btn btn-success btn-sm  ml-[70%] mt-4"
      >
        Submit
      </button>
    </form>
  );
}

export default PopupForm;
