import "./App.css";
import RouterConfig from "./router/RouterConfig";

import Header from "./components/Header";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import Lists from "./components/Lists";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="App">
      <Header>
        <Logo />
        <SearchBar />
      </Header>
      <div className="container__main">
        <Lists />
        <main className="container__main--gameslist">
          <RouterConfig />
        </main>
      </div>
      <Footer />
    </div>
  );
}
