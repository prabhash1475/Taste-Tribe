import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Error from "./components/Error";
import RestaurantMenuNew from "./components/RestaurantMenuNew";

// Lazy load the Grocery component
const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
  return (
    <div
    //  className="app bg-gradient-to-br from-green-100 via-yellow-50 to-yellow-100"
    >
      <Header />
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/grocery"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <Grocery />
            </Suspense>
          }
        />
        <Route path="/rest/:resId" element={<RestaurantMenuNew />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
