import { Link } from "react-router-dom";
import useMapin from "./useMapin";

function LoginModal() {
  const { login, isLogging } = useMapin();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loggedUser = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    login(loggedUser);
  }

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <Link
        className="text-blue-600  hover:text-blue-400 transition-colors  text-lg mr-4 underline"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Sign in
      </Link>
      <dialog id="my_modal_4" className="modal sm:modal-middle ">
        <div
          className="modal-box grid gap-5 w-[30%] h-[90%]  content-center"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "none" }}
        >
          <h1 className="text-center text-slate-300 text-3xl font-bold">
            Sign in
          </h1>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
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
                className="grow "
                name="email"
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
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input type="password" className="grow" name="password" />
            </label>

            <button
              type="submit"
              disabled={isLogging}
              className="btn text-white w-full bg-blue-500"
            >
              Sign in
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default LoginModal;
