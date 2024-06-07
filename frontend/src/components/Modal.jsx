function Modal() {
  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_2" className="modal absolute z-[1100]">
        <div className="modal-box">
          <h3 className="font-bold text-white text-lg">Hello!</h3>
          <p className="py-4 text-white">
            Press ESC key or click outside to close
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default Modal;
