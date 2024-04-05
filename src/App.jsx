import { useState } from "react";
import Perfil from "./components/Perfil";
import ReposList from "./components/ReposList";
import './global.css'; // Importe o arquivo global.css para aplicar estilos globais

function App() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [buscar, setBuscar] = useState(false);

  const handleBuscarClick = () => {
    setBuscar(true);
  };

  const handleInputChange = (e) => {
    setNomeUsuario(e.target.value);
    setBuscar(false); // Resetar a busca ao digitar no input
  };

  return (
    <div className="container"> {/* Adicionando uma div com a classe "container" */}
      <h1>Buscador de Perfil (Git Hub)</h1> {/* Título da página */}
      <input type="text" value={nomeUsuario} onChange={handleInputChange} />
      <button onClick={handleBuscarClick}>Buscar</button> {/* Adicionando onClick para chamar a função de busca */}
      {buscar && nomeUsuario.length > 4 && (
        <>
          <Perfil nomeUsuario={nomeUsuario} />
          <ReposList nomeUsuario={nomeUsuario} />
        </>
      )}
    </div>
  );
}

export default App;
