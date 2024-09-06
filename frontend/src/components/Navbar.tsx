import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';

export const Navbar = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login')
  }

  return (
    <div className="sm:h-[15vh] bg-blue-500 gap-y-2 sm:px-6 flex flex-col sm:flex-row sm:justify-between items-center">
      <Link to={'/'}>
        <img className="w-40" src="https://1000marcas.net/wp-content/uploads/2022/02/Dragon-Ball-Logo-1996.png" alt="" />
      </Link>

      <Link to={"/create-character"} className="text-center">
        <button className="mt-4 bg-orange-500 text-black font-black py-2 px-4 rounded 
          hover:bg-orange-600 border-2 border-black" >Crear Personaje</button>
      </Link>



      <button
        className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-black font-bold
        text-lg shadow-lg hover:bg-orange-600 transition-colors relative border-2 border-black my-4"
        onClick={handleLogout}
      >
        <StarIcon sx={{ color: 'red', fontSize: 30, position: 'absolute', zIndex: 0 }} />

        <p className="absolute z-10 text-[15px]">Salir</p>
      </button>
    </div >
  )
}

