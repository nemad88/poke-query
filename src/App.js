import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Pokemons from "./Pokemons";

const App = () => {
  const a = 15;
  console.log(a);

  const getNav = () => {
    return (
      <>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
          <Link to="/pokemons">Pokemons</Link> | <Link to="/other">Others</Link>
        </nav>
        <Outlet />
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={getNav()}>
          <Route path="pokemons" element={<Pokemons />} />
          {/* <Route path="other" element={<div>OTHERS</div>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
