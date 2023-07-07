import "./assets/css/tailwind.css";
import "./assets/css/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Index from "./components/views/Index";
import Footer from "./components/common/Footer";
import Login from "./components/member/Login";
import Signup from "./components/member/Signup";
import Review from "./components/review/Review";
import Recommend from "./components/recommend/Recommend";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <section className="main pt-16 ">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/review" element={<Review />} />
          <Route path="/recommend" element={<Recommend />} />
        </Routes>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
