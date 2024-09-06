import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Character } from "../types/Character";
import CloseIcon from '@mui/icons-material/Close';
import nubeVoladoraImg from '../assets/nube-voladora.png'
import { useFormatNumberWithDots } from "../helpers/userFormatNumberWithDots";
import { DeleteCharacter } from "../components/DeleteCharacter";

export const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character>();
  const navigate = useNavigate();

  const getIdCharacter = async () => {
    try {
      const response = await api.get(`/characters/detail/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      setCharacter(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getIdCharacter()
  }, [])

  return (
    <div className="kamehouse_img h-[125vh] w-full flex justify-center items-center">
      {
        character
          ?
          <section className=" bg-[#ffffffb3] p-4 rounded-lg shadow-md mx-4 md:w-[60%] relative">
            <CloseIcon
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                cursor: 'pointer',
              }}
              onClick={() => navigate("/")}
            />
            <div className="flex justify-center items-center w-full mb-4 gap-x-3">
              <img
                className="w-[200px] h-[200px] object-contain aspect-[9/16]"
                src={character!.image}
                alt={`${character!.name}`}
              />
              <div className="">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-left">{character!.name}</h2>
                <p className="font-black">kid: {" "}
                  <span className=" text-[#3800db]">{useFormatNumberWithDots(character!.ki)}</span>
                </p>
                <p className="font-black">Género: {" "}
                  <span className=" text-[#3800db]">{character!.gender}</span>
                </p>
                <p className="font-black">Máximo ki: {" "}
                  <span className=" text-[#3800db]">{useFormatNumberWithDots(character!.maxKi)}</span>
                </p>
                <p className="font-black">Raza: {" "}
                  <span className=" text-[#3800db]">{character!.race}</span>
                </p>

                <p className="font-black">Afiliación: {" "}
                  <span className=" text-[#3800db]">{character!.affiliation}</span>
                </p>
              </div>
            </div>

            <div>
              <p className="font-black text-[14px]">Descripción: {" "}
                <span className="font-normal">
                  {character!.description}
                </span>
              </p>
            </div>

            <div className="flex items-center justify-around mt-4 w-full font-black">
              <Link to={`/edit-character/${character!._id}`} className="bg-blue-500 p-2 rounded-lg hover:bg-blue-700">Editar</Link>
              <DeleteCharacter id={id!} />
            </div>
          </section>
          :
          <img className="animated-nube-voladora" src={nubeVoladoraImg} alt="" />
      }
    </div>
  );
};
