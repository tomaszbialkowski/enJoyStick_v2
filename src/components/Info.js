import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useSelection from "../hooks/useSelection";

export default function Info({ text }) {
  const dispatch = useDispatch();
  const { modalType } = useSelection();

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
