import "./App.css";
import RouterConfig from "./router/RouterConfig";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import Lists from "./components/Lists";
import Footer from "./components/Footer";
import Info from "./components/Info";

export default function App() {
  const modalInfo = useSelector((state) => state.info);

  return (
    <div className="App">
      <Header>
        <Logo />
        <SearchBar />
      </Header>
      <div className="container__main">
        <Lists />
        <main className="container__main--gameslist">
          {modalInfo.show && <Info text={modalInfo.text} />}
          <RouterConfig />
        </main>
      </div>
      <Footer />
    </div>
  );
}
