import "./assets/css/tailwind.css";
import "./assets/css/style.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Router from "./components/Router";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { isLoggedInState } from "./state/authState";
import { auth } from "./database/initialize";

function App() {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [setIsLoggedIn]);

  return (
    <BrowserRouter>
      <Header />
      <section className="main pt-16 mx-auto xl:container">
        <Router />
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
