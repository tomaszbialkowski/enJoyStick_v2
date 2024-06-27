import "./App.css";
import "./css/buttons.css";

import RouterConfig from "./router/RouterConfig";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "./components/Header";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import Lists from "./components/Lists";
import Footer from "./components/Footer";
import ModalInfo from "./components/ModalInfo";
import Button from "./components/Button";
import { faInfo, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const modalInfo = useSelector((state) => state.info);
  const location = useLocation();

  return (
    <div className="App">
      <Header>
        <Logo />
        <SearchBar />
        <div>
          <Button
            text={<FontAwesomeIcon icon={faInfo} />}
            className="btn_icon--info"
          />
          <Button
            text={<FontAwesomeIcon icon={faUserAstronaut} />}
            className="btn_icon--author"
          />
        </div>
      </Header>
      <div className="container__main">
        <Lists path={location.pathname} />
        <main className="container__main--gameslist">
          {modalInfo.show && <ModalInfo text={modalInfo.text} />}
          <RouterConfig />
        </main>
      </div>
      <Footer />
    </div>
  );
}
