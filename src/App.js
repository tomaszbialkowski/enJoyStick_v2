import "./App.css";
import RouterConfig from "./router/RouterConfig";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Header from "./components/Header";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import Lists from "./components/Lists";
import Footer from "./components/Footer";
import ModalInfo from "./components/ModalInfo";
import Button from "./components/Button";

export default function App() {
  const modalInfo = useSelector((state) => state.info);
  const location = useLocation();

  return (
    <div className="App">
      <Header>
        <Logo />
        <SearchBar />
        <Button text="I" className="btn_icon--search" />
        <Button text="A" className="btn_icon--search" />
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
