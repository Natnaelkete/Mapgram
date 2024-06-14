import { Link } from "react-router-dom";
import useMapin from "./useMapin";
import { useState } from "react";

function RegisterModal() {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const { register, isRegistering } = useMapin();

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    setSelectedImages(files);

    const previewsArray = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewsArray);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("email", e.target.email.value);
    formData.append("username", e.target.username.value);
    formData.append("password", e.target.password.value);
    formData.append("images", selectedImages[0]);

    register(formData);
  }

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <Link
        className="btn btn-sm  bg-green-500 text-white hover:bg-green-600 transition-colors shadow-xl border-none"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Sign up
      </Link>
      <dialog id="my_modal_3" className="modal modal-middle ">
        <div
          className="modal-box grid gap-5 content-center"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "none" }}
        >
          <h1 className="text-center text-slate-300 text-3xl font-bold w-[85%] md:w-full">
            Sign up
          </h1>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit} className=" w-[85%] md:w-full">
            <div className="mb-5 flex gap-4 items-center">
              <img
                src={imagePreviews[0]}
                alt={`profile`}
                className="rounded-full"
                style={{ width: "70px", height: "70px", objectFit: "cover" }}
              />
              <div className="space-y-2">
                <label htmlFor="image">Upload profile picture</label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-5"
                />
              </div>
            </div>
            {/* <label htmlFor="images">Upload Image</label> */}
            <label className="input  input-bordered flex items-center gap-2 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                name="email"
                className="grow"
                placeholder="Email"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                name="username"
                placeholder="Username"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input type="password" name="password" className="grow" />
            </label>

            <button
              htmlFor="my_modal_3"
              disabled={isRegistering}
              className="btn text-white w-full bg-blue-500"
            >
              Sign up
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default RegisterModal;
