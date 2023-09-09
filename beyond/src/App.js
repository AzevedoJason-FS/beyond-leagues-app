import { Routes, Route } from "react-router-dom";
import { React, Suspense, lazy } from "react";

const LandingPage = lazy(() => import("./components/LandingPage"));
const Login = lazy(() => import("./features/auth/Login"));
const Dashboard = lazy(() => import("./features/auth/Dashboard"));
const MyBets = lazy(() => import("./features/MyBets"));

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <div className="loader-container">
                  <div className="loader-container-inner">
                    <h2>Loading..</h2>
                  </div>
                </div>
              }
            >
              <LandingPage />
            </Suspense>
          }
        />
                <Route
          path="/bets"
          element={
            <Suspense
              fallback={
                <div className="loader-container">
                  <div className="loader-container-inner">
                    <h2>Loading..</h2>
                  </div>
                </div>
              }
            >
              <MyBets />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense
              fallback={
                <div className="loader-container">
                  <div className="loader-container-inner">
                  <h2>Loading..</h2>
                  </div>
                </div>
              }
            >
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/dash"
          element={
            <Suspense
              fallback={
                <div className="loader-container">
                  <div className="loader-container-inner">
                  <h2>Loading..</h2>
                  </div>
                </div>
              }
            >
              <Dashboard />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
