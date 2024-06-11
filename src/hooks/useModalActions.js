import { useDispatch } from "react-redux";

const useModalActions = () => {
  const dispatch = useDispatch();

  function showModalInfo(show, text, type) {
    dispatch({ type: "SHOW_MODAL", payload: { show, text, type } });
  }

  return { showModalInfo };
};

export default useModalActions;
