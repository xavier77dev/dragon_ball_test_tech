import { useNavigate } from "react-router-dom";
import { Character } from "../types/Character"

interface CardCharacterProps {
  character: Character;
}

export const CardCharacter = ({ character }: CardCharacterProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${character._id}`);
  };

  return (
    <div
      className="flex flex-col items-center bg-[#FAFAFA] p-4 rounded-lg shadow-md hover:shadow-lg 
                transition-shadow duration-200 border border-blue-500 hover:border-yellow-500 cursor-pointer
group/card
      "
      onClick={handleClick}
    >
      <img
        className="w-[200px] h-[200px] mx-auto object-contain aspect-[9/16] group-hover/card:scale-110 duration-200 transition"
        src={character.image}
        alt={`${character.name}`}
      />
      <h2 className="text-lg font-semibold text-gray-800 mt-2">{character.name}</h2>

    </div>
  )
}

