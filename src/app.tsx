import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Menu from "./shared/Menu";
import Footer from "./shared/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import ContactUs from "./components/ContactUs";
import MathFacts from "./components/MathFacts/MathFacts";
import "bootstrap/dist/css/bootstrap.min.css";
import AnagramHunt from "./components/AnagramHunt";

type RoutePath = "/" | "/about" | "/login" | "/register" | "/contact-us" | "/math-facts" | "/anagram-hunt";

function RouteTitleManager() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Home Page | Play2Learn",
      "/about": "About Us | Play2Learn",
      "/login": "Login | Play2Learn",
      "/register": "Register | Play2Learn",
      "/contact-us": "Contact Us | Play2Learn",
      "/math-facts": "Math Facts | Play2Learn",
      "/anagram-hunt": "Anagram Hunt | Play2Learn"
    };

    const newTitle = titles[location.pathname as RoutePath] || "Play2Learn";
    document.title = newTitle;
  }, [location]);

  return null;
}

function App() {
  return (
      <BrowserRouter>
      <RouteTitleManager />
        <div className="min-vh-100 d-flex flex-column justify-content-evenly">
          <Menu />
          <main className="container-xxl my-3 flex-grow-1 flex-column justify-content-center d-flex">
            <div className="row">
              <div className="col-12">
                <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/about" element={<About />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/register" element={<Register />}></Route>
                  <Route path="/contact-us" element={<ContactUs />}></Route>
                  <Route path="/math-facts" element={<MathFacts />}></Route>
                  <Route path="/anagram-hunt" element={<AnagramHunt />}></Route>
                </Routes>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;

// ---
// GLOBAL
// ---

// const forms = document.querySelectorAll('.vanilla-form');
// forms.forEach(form => {
//     form.addEventListener('submit', function (event) {
//         event.preventDefault();
//         alert('Form Submitted');
//     });
// });
