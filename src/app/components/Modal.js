import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalVisibility } from "../store/actions";
import { selectModalContent, selectModalContentExists } from "../store/selectors";
import { useDismissOnOutsideClick } from "../hooks/index";

const Modal = () => {
  const dispatch = useDispatch();
  const modalContent = useSelector(selectModalContent);
  const modalContentExists = useSelector(selectModalContentExists);

  const modalWrapper = useRef(null);

  useDismissOnOutsideClick(modalWrapper, modalContent, () => dispatch(toggleModalVisibility()));

  if (!modalContentExists) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content-positioner">
        <div ref={modalWrapper} className="modal-content-wrapper">
          {modalContent}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
