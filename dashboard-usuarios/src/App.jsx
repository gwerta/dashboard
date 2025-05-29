import { useState, useEffect, use } from 'react';
import UserCard from './components/UserCard';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const usersPorPag = 5;

  useEffect(() => {
    fetch('http://localhost:3000/peoples')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Erro ao buscar usuários:', err));
  }, []);

  const indexUltimoUser = paginaAtual * usersPorPag;
  const indexPrimeiroUser = indexUltimoUser - usersPorPag;
  const usersAtuais = users.slice(indexPrimeiroUser, indexUltimoUser);

  const proxPag = () => {
    if (paginaAtual < Math.ceil(users.length / usersPorPag)) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const antPag = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  return (
    <div className="App">
      <h1>Dashboard de Usuários</h1>
      <p>Total de usuários: {users.length}</p>
      <div className="user-container">
        {usersAtuais.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div className="paginas">
        <button onClick={antPag} disabled={paginaAtual === 1}>
          &lt;
        </button>
        <span>Página {paginaAtual} de {Math.ceil(users.length / usersPorPag)}</span>
        <button onClick={proxPag} disabled={paginaAtual === Math.ceil(users.length / usersPorPag)}>
           &gt;
        </button>
      </div>
    </div>
  );
}

export default App
