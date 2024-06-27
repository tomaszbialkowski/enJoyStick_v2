import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink to="/">
      <img
        className="logo"
        src="/img/logo/enjoystick_logo_v3.jpg"
        alt="enjoystick logo"
      />
    </NavLink>
  );
}
