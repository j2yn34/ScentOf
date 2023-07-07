import "./assets/css/tailwind.css";
import "./assets/css/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Index from "./components/views/Index";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <section className="main pt-16 ">
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
