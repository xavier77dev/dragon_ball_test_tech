import { useEffect, useState } from "react"
import { api } from "../services/api"

export const UserOwner = () => {
  const [userName, setUserName] = useState('');

  const getUsernName = async () => {
    try {
      const response = await api.get('/characters/username-owner', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setUserName(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsernName();
  }, [])

  return (
    <div className="font-black mt-2 text-xl ml-2">
      Bienvenido {" "}
      <span className="text-[20px] text-indigo-600">
        {userName}
      </span>

    </div>
  )
}

