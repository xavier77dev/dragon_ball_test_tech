import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { api } from '../services/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface DeleteCharacterProps {
  id: string;
}

export const DeleteCharacter = ({ id }: DeleteCharacterProps) => {
  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      await api.delete(`/characters/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      toast.success('Personaje Eliminado con exito')
      navigate('/');

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <IconButton onClick={handleDelete} color="error">
      <DeleteIcon sx={{ fontSize: 30 }} />
    </IconButton>
  )
}

