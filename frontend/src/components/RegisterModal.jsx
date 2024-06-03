import { Link } from "react-router-dom";
import useMapin from "./useMapin";

function RegisterModal() {
  const { register, isRegistering } = useMapin();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    register(newUser);
  }

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <Link
        className="btn btn-sm  bg-blue-500 text-white hover:bg-blue-600 transition-colors mr-4 shadow-xl border-none"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Sign up
      </Link>
      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle ">
        <div
          className="modal-box grid gap-5 p-10  h-[90%]  content-center"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "none" }}
        >
          <h1 className="text-center text-slate-300 text-3xl font-bold">
            Sign up
          </h1>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2 mb-5">
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
              onClick={() => {
                document.getElementById("my_modal_4").showModal();
              }}
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
