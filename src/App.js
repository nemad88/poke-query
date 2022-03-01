import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Pagination = styled.div`
  display: flex;
`;

const PageButton = styled.div`
  background-color: #fffaaa;
  padding: 4px;
  margin: 4px;
`;

function App() {
  const limit = 50;
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);

  const baseURL = `https://pokeapi.co/api/v2`;

  useEffect(() => {
    axios
      .get(`${baseURL}/pokemon`, {
        params: {
          offset,
          limit,
        },
      })
      .then((res) => {
        setPage(res.data.count / limit + 1);
        setPokemons(res.data.results);
        console.log(res.data);
      });
    console.log("hello");
  }, []);

  return (
    <div className="App">
      <div>
        {pokemons.map((pokemon) => (
          <div>{pokemon.name}</div>
        ))}
      </div>

      <Pagination>
        {Array.from({ length: page }, (_, k) => (
          <PageButton key={k}>{k}</PageButton>
        ))}
      </Pagination>
    </div>
  );
}

export default App;
