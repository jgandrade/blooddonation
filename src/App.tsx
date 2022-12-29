import { Suspense, lazy } from "react";
import { Navbar } from "./components/Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import useAuth from "./hooks/useAuth";
import PublicRoute from "./components/PublicRoute";
import Signup from "./pages/Signup";

const Home = lazy(() => import("./pages/Home"));
const Team = lazy(() => import("./pages/Team"));
const LogIn = lazy(() => import("./pages/LogIn"));

function App() {
  const { auth } = useAuth();

  const loader = (
    <>
      <div
        className="position-relative d-flex justify-content-center align-items-center bg-light"
        style={{ height: "80vh", width: "100vw", zIndex: 2000 }}
      >
        <img
          height={70}
          srcSet="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
          alt="loading"
        />
      </div>
    </>
  );

  return (
    <div className="app">
      <Navbar />
      <Suspense fallback={loader}>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/team" element={<Team />} />
          </Routes>
        </Container>
      </Suspense>
    </div>
  );
}

export default App;