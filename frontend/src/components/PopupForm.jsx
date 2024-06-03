import { useSearchParams } from "react-router-dom";
import useMapin from "./useMapin";
import { useAuth } from "./AuthProvider";

function PopupForm() {
  const [searchParams] = useSearchParams();
  const { createPin, isCreating } = useMapin();
  const { user } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPin = {
      username: formData.get("username"),
      title: formData.get("title"),
      desc: formData.get("desc"),
      rating: formData.get("rating"),
      lat: searchParams.get("lat"),
      long: searchParams.get("lng"),
    };
    createPin(newPin);
  }

  return (
    <form onSubmit={handleSubmit} className="py-4 w-[250px]">
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        value={user?.username}
        className="border-b border-gray-300 focus:border-indigo-500 outline-none max-w-xs w-full mb-5 bg-white"
      />
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
      <label htmlFor="rating">Rating</label>
      <input
        id="rating"
        name="rating"
        type="number"
        className="border-b border-gray-300 focus:border-indigo-500 outline-none max-w-xs w-full mb-5 bg-white"
      />

      <button
        type="submit"
        disabled={isCreating}
        className="btn btn-success btn-sm  ml-[70%] mt-4"
      >
        submit
      </button>
    </form>
  );
}

export default PopupForm;
