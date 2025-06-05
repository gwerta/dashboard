//faz os imports
import { useState, useEffect, use } from 'react';
import UserCard from './components/UserCard';
import './App.css';

function App() {
  //cria os usuarios e as variáveis de pagina, limitação de página e a seleção para mostrar o card de usuário
  const [users, setUsers] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const usersPorPag = 5;
  const [userSelecionado, setUserSelecionado] = useState(null);


  //busca os usuários do banco
  useEffect(() => {
    fetch('http://localhost:3000/peoples')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Erro ao buscar usuários:', err));
  }, []);

  //adiciona a quantidade de usuários por página
  const indexUltimoUser = paginaAtual * usersPorPag;
  const indexPrimeiroUser = indexUltimoUser - usersPorPag;
  const usersAtuais = users.slice(indexPrimeiroUser, indexUltimoUser);

  //muda de página acrescentando um no índice da pagina
  const proxPag = () => {
    if (paginaAtual < Math.ceil(users.length / usersPorPag)) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  //volta uma página diminuindo um no índice
  const antPag = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };
//retorna a pagina principal
  return (
    <div className="App">
      <h1>Dashboard de Usuários</h1>
      <p>Total de usuários: {users.length}</p>
      <div className="user-container">
        {usersAtuais.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
  {/* retorna o hub de mudança de páginas que não deixa você voltar mais que a pg 1 ou sair mais q a pg 2 */}
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
