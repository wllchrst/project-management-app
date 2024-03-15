import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user-context";
import MainLayout from "./layouts/layout";
import MiddlewareRoutes from "./middlewares/middleware-route";
import Home from "./pages/home-page";
import Login from "./pages/login-page";
import { ChakraProvider } from "@chakra-ui/react";
import ThemeContextProvider from "./providers/theme-context";
import Register from "./pages/register-page";
import UnProtected from "./middlewares/not-authenticated-route";

function App() {
  return (
    <ChakraProvider>
      <ThemeContextProvider>
        <BrowserRouter>
          {/* Bundled with User Provider for getting user context (UserContext.tsx) */}
          <UserProvider>
            {/* Bundled with Main Layout (layout.tsx) */}
            <Routes>
              {/* All Routes [Login] (no need authenticate routes) (login.tsx) */}
              {/* <Route path="/home" element={<Home></Home>}></Route> */}
              <Route
                path="/"
                element={
                  <UnProtected>
                    <Login></Login>
                  </UnProtected>
                }
              ></Route>
              <Route
                path="/register"
                element={
                  <UnProtected>
                    <Register></Register>
                  </UnProtected>
                }
              ></Route>

              {/* First Authentication Method Using Authenticate Routes VVV */}
              {/* 
            <Route
              path="/detail"
              element={
                <Protected>
                  <Detail></Detail>
                </Protected>
              }
            ></Route> */}

              {/* ----------------------------------------------------------- */}

              {/* Second Authentication Method Using Middleware Routes VVV (Cleanest)  */}

              <Route
                path="/*"
                element={<MiddlewareRoutes></MiddlewareRoutes>}
              ></Route>

              {/* ---------------------------------------------------------- */}
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </ThemeContextProvider>
    </ChakraProvider>
  );
}

export default App;
