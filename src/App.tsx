import "./assets/css/tailwind.css";
import "./assets/css/style.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Router from "./components/router";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <section className="main pt-16 ">
        <Router />
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
