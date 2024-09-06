import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import AlertDialogSync from '../components/AlertDialogSync';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CardCharacter } from '../components/CardCharacter';
import Skeleton from '@mui/material/Skeleton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserOwner } from './UserOwner';

const Home: React.FC = () => {
  const { setCharacters, characters } = useAuth();
  const [isLoading, setIsLoading] = useState(true);


  const getCharacters = async () => {
    try {
      const response = await api("/characters", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCharacters(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCharacters();
  }, [setCharacters]);


  return (
    <div className="bg-gray-100 min-h-screen relative h-screen">
      <Navbar />
      <UserOwner />
      <div className="text-center mt-8">
        <AlertDialogSync />
      </div>

      <section className="py-10">
        <h2 className="text-3xl text-center font-semibold mb-8">
          {characters.length > 0 ? "Nuestros Personajes" : "Aún no hay Personajes :/"}</h2>
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading
              ?
              Array.from(new Array(6)).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width="100%"
                  height={200}
                  animation="wave"
                  className="rounded-lg"
                />
              ))
              :
              characters.slice().reverse().map((character) => (
                <CardCharacter key={character._id} character={character} />
              ))}
          </div>
        </div>
      </section>


      <footer className="bg-blue-500 text-black font-bold py-4 text-center"
        style={
          characters.length == 0
            ? { position: 'fixed', bottom: 0, width: '100%' }
            : {}
        }>
        <p>© 2024 Xavier Basurto {" "}
          <FavoriteIcon style={{ color: 'red' }} />
        </p>
      </footer>
    </div>
  );
};

export default Home;
