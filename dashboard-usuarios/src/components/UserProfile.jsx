import './UserProfile.css';


//retorna o perfil do usuário com os dados que foram passados no card
function UserProfile({ user, onVoltar }) {
    return (
      <div className="user-profile">
        <div className="back-button">
        <button className='x' onClick={onVoltar}>✖</button>
        </div>
        <h1>Perfil de Usuário</h1>
        <img className="foto" src={user.avatar} alt={`${user.firstName} avatar`} />
        <h2>{user.firstName} {user.lastName}</h2>
        <p className='escrita'><strong>Email:</strong> {user.email}</p>
        <p className='escrita'><strong>Endereço:</strong> {user.address}</p>
      </div>
    );
  }
  
  export default UserProfile;