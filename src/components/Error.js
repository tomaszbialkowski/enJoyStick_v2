import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Error() {
  const navigate = useNavigate();
  return (
    <div>
      <p>Strona nie istnieje,</p>
      <p>jak tu trafiłeś?</p>
      <Button text="< Back" onClick={() => navigate(-1)} />
    </div>
  );
}
