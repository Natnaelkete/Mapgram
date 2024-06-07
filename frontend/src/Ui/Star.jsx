import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

function Star({ value, text }) {
  return (
    <div className="flex gap-1">
      <span className="text-yellow-400">
        {value >= 1 ? (
          <FaStar className="size-5" />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt className="size-5" />
        ) : (
          <FaRegStar className="size-5" />
        )}
      </span>
      <span className="text-yellow-400">
        {value >= 2 ? (
          <FaStar className="size-5" />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt className="size-5" />
        ) : (
          <FaRegStar className="size-5" />
        )}
      </span>
      <span className="text-yellow-400">
        {value >= 3 ? (
          <FaStar className="size-5" />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt className="size-5" />
        ) : (
          <FaRegStar className="size-5" />
        )}
      </span>
      <span className="text-yellow-400">
        {value >= 4 ? (
          <FaStar className="size-5" />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt className="size-5" />
        ) : (
          <FaRegStar className="size-5" />
        )}
      </span>
      <span className="text-yellow-400">
        {value >= 5 ? (
          <FaStar className="size-5" />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt className="size-5" />
        ) : (
          <FaRegStar className="size-5" />
        )}
      </span>
      <span>{text && text}</span>
    </div>
  );
}

export default Star;
