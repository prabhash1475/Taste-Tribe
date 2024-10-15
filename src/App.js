import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
// import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Error from "./components/Error";
import RestaurantMenuNew from "./components/RestaurantMenuNew";
import userContext from "./utils/userContext";
import { Provider } from "react-redux";
import store from "./utils/store";
import Cart from "./components/Cart";

// Lazy load the Grocery component
const Grocery = lazy(() => import("./components/Grocery"));
const About = lazy(() => import("./components/About"));

const AppLayout = () => {
  // updating userContext From Hear
  const [userName, setUserName] = useState();

  // Authenticating
  useEffect(() => {
    const data = {
      name: "Prabhas",
    };
    setUserName(data.name);
  }, []);

  return (
    <div className="app bg-gradient-to-r from-blue-200 via-blue-50 to-blue-200 min-h-screen">
      <Provider store={store}>
        <userContext.Provider value={{ loggedInUser: userName, setUserName }}>
          <Header />
          <Outlet />
        </userContext.Provider>
      </Provider>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Body />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/about"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/grocery"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <Grocery />
              </Suspense>
            }
          />
          <Route path="/rest/:resId" element={<RestaurantMenuNew />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
