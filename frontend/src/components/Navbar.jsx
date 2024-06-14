import { useAuth } from "./AuthProvider";
import LoginModal from "./LoginModal";
import { useMapContext } from "./MapProvider";
import RegisterModal from "./RegisterModal";
import useMapin from "./useMapin";
// import { Input } from "antd";

const Navbar = () => {
  const { handleSubmit } = useMapContext();
  const { user } = useAuth();
  const { logout } = useMapin();

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="hidden lg:flex input input-bordered items-center gap-2 absolute z-[1000] mx-[41%] mt-[20px]"
      >
        <input
          type="text"
          name="search"
          className="grow"
          placeholder="Search"
        />
        {/* <Input.Search
          className="hidden lg:block"
          placeholder="search"
          name="search"
          enterButton="search"
          style={{
            width: 300,
          }}
        /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </form>

      <div className="absolute flex gap-4 top-4 right-14 z-[1000]">
        {!user && <LoginModal />}
        {user && (
          <button
            onClick={() => logout()}
            className="text-blue-600 hover:text-blue-400 transition-colors  text-lg mr-1 underline"
          >
            Log out
          </button>
        )}
        {user ? (
          <img src={user.image} alt="Avatar" className="h-8 w-8 rounded-full" />
        ) : (
          <RegisterModal />
        )}
      </div>
    </>
  );
};

export default Navbar;
