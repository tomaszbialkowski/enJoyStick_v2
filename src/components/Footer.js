import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="container__footer">
      <div>
        <img
          src="/img/other/kozminski-logo.png"
          alt="Kozminski Logo"
          className="logo alk"
        />
      </div>
      <div className="footer_text">
        <p>
          Final React Project <br />
          on ALK Frontend Development with React
        </p>
        <p>Code: Tomasz Białkowski | Code Review: Wiktor Jurczyszyn</p>
      </div>
      <div className="icon_react">
        <FontAwesomeIcon icon={faReact} />
      </div>
    </footer>
  );
}
