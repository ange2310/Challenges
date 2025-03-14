import Sidebar from "../components/Sidebar";
import "../styles/Perfil.css";
import usuarioImg from "../Imagenes/usuario.png"

function Perfil() {
  const user = {
    name: "Angélica Marcillo",
    location: "Cali, Colombia",
    age: 19,
    email: "angelica@example.com",
  };

  return (
    <div className="perfil-container">
      <Sidebar />
      <div className="perfil-content">
        <div className="perfil-card">
          <img src={usuarioImg} alt="Foto de perfil" className="perfil-img" />
          <h2>{user.name}</h2>
          <p><strong>Ubicación:</strong> {user.location}</p>
          <p><strong>Edad:</strong> {user.age} años</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Perfil;