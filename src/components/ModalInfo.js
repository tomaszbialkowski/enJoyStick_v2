import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModalType } from "../store/selectors/selectors";

export default function Info({ text }) {
  const dispatch = useDispatch();
  const modalType = useSelector(getModalType);

  useEffect(() => {
    const modalTimer = setTimeout(() => {
      dispatch({ type: "HIDE_MODAL" });
    }, 2250);

    return () => clearTimeout(modalTimer);
  }, []);

  return (
    <div className={`modal ${modalType.toLowerCase()}`}>
      <p>{text}</p>
    </div>
  );
}
