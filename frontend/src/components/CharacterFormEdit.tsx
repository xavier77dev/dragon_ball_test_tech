import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { toast, Toaster } from 'sonner';
import { useEffect } from 'react';

const characterSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  affiliation: z.string().min(1, 'La vinculación es obligatoria'),
  race: z.string().min(1, 'La raza es obligatoria'),
  gender: z.enum(['Male', 'Female', 'Other'])
    .or(z.literal('')).refine((value) => value !== '', {
      message: 'El género es obligatorio',
    }),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  ki: z.preprocess((value) => Number(value), z.number().min(1, 'El Ki es obligatorio'))
    .refine((value) => !isNaN(value), {
      message: 'El Ki debe ser un número válido',
    })
    .refine((value) => !isNaN(value), {
      message: 'El Ki máximo debe ser un número válido',
    }),
  maxKi: z.preprocess((value) => Number(value), z.number().min(1, 'El Ki máximo es obligatorio')),
  image: z.string().url('La imagen debe ser una URL'),
});

type CharacterFormEditInputs = z.infer<typeof characterSchema>;

const CharacterFormEdit = () => {

  const { id } = useParams();

  const getDataCharacter = async () => {
    try {
      const response = await api.get(`/characters/detail/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      reset(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CharacterFormEditInputs>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: '',
      affiliation: '',
      race: '',
      gender: undefined,
      description: '',
      ki: 0,
      maxKi: 0,
      image: '',
    }
  });

  useEffect(() => {
    getDataCharacter();
  }, [])

  const onSubmit: SubmitHandler<CharacterFormEditInputs> = async (data) => {
    try {
      await api.put(`/characters/${id}`, {
        name: data.name.trim(),
        affiliation: data.affiliation.trim(),
        race: data.race.trim(),
        gender: data.gender.trim(),
        description: data.description.trim(),
        ki: data.ki,
        maxKi: data.maxKi,
        image: data.image.trim(),
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Personaje Editado con exito');
      navigate("/");
    }
    catch (error) {
      console.log(error)
    }
  };

  const navigate = useNavigate();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 mx-auto bg-[#020212e6] rounded shadow-lg relative"
    >
      <Toaster />
      <CloseIcon
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          cursor: 'pointer',
          color: '#FAFAFA',
        }}
        onClick={() => navigate("/")}
      />

      <h2 className="mb-8 mt-2 text-2xl font-bold text-center text-[#FAFAFA]">Editar Personaje</h2>

      <div className="flex gap-x-2 items-center text-[#FAFAFA]">
        <label className="block font-semibold text-[#FAFAFA]" htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full p-2 border border-gray-300 rounded bg-[#0000004f] text-[#FAFAFA]"
        />
      </div>
      {errors.name && (
        <span className="text-sm text-red-500">{errors.name.message}</span>
      )}

      <div className="mt-4 flex gap-x-2 items-center text-[#FAFAFA]">
        <label className="font-semibold flex" htmlFor="image">
          Url de Imagén:
        </label>
        <input
          id="affiliation"
          type="text"
          {...register('image')}
          className="w-full p-2 border border-gray-300 rounded  bg-[#0000004f]"
        />
      </div>
      {errors.image && (
        <span className="text-sm text-red-500">
          {errors.image.message}
        </span>
      )}

      <div className="mt-4 flex gap-x-2 items-center text-[#FAFAFA]">
        <label className="block font-semibold" htmlFor="affiliation">
          Vinculación:
        </label>
        <input
          id="affiliation"
          type="text"
          {...register('affiliation')}
          className="w-full p-2 border border-gray-300 rounded  bg-[#0000004f]"
        />
      </div>
      {errors.affiliation && (
        <span className="text-sm text-red-500">
          {errors.affiliation.message}
        </span>
      )}

      <div className="mt-4 flex gap-x-2 items-center text-[#FAFAFA]">
        <label className="block mb-1 font-semibold" htmlFor="race">
          Raza:
        </label>
        <input
          id="race"
          type="text"
          {...register('race')}
          className="w-full p-2 border border-gray-300 rounded  bg-[#0000004f]"
        />
      </div>
      {errors.race && (
        <span className="text-sm text-red-500">{errors.race.message}</span>
      )}

      <div className="mt-4 flex justify-center items-center gap-x-2 text-[#FAFAFA]">
        <label className="block mb-1 font-semibold" htmlFor="gender">
          Género:
        </label>
        <select
          id="gender"
          {...register('gender')}
          className="w-full p-2 border border-gray-300 rounded  bg-[#0000004f]"
        >
          <option className="text-black" value="">Seleccionar Género</option>
          <option className="text-black" value="Male">Masculino</option>
          <option className="text-black" value="Female">Femenino</option>
          <option className="text-black" value="Other">Otro</option>
        </select>
      </div>
      {errors.gender?.message && (
        <span className="text-sm text-red-500">{errors.gender.message}</span>
      )}

      <div className="mt-4 flex gap-x-2 items-center text-[#FAFAFA]">
        <label className="block mb-1 font-semibold" htmlFor="description">
          Descripción:
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="w-full p-2 border border-gray-300 rounded  bg-[#0000004f]"
        />
      </div>
      {errors.description && (
        <span className="text-sm text-red-500">
          {errors.description.message}
        </span>
      )}

      <div className="mt-4 flex gap-x-2 items-center text-[#FAFAFA]">
        <label className="block mb-1 font-semibold" htmlFor="ki">
          Ki:
        </label>
        <input
          id="ki"
          type="text"
          {...register('ki')}
          className="w-full p-2 border border-gray-300 rounded  bg-[#0000004f]"
        />
      </div>
      {errors.ki && (
        <span className="text-sm text-red-500">{errors.ki.message}</span>
      )}

      <div className="mt-4 flex gap-x-2 items-center text-[#FAFAFA]">
        <label className="font-semibold text-white" htmlFor="maxKi">
          Ki Máximo:
        </label>
        <input
          id="maxKi"
          type="text"
          {...register('maxKi')}
          className="w-full p-2 border border-gray-300 rounded bg-[#0000004f]"
        />
      </div>
      {errors.maxKi && (
        <span className="text-sm text-red-500">{errors.maxKi.message}</span>
      )}

      <button
        type="submit"
        className="w-full p-2 mt-8  font-semibold text-black bg-blue-500 rounded hover:bg-blue-600"
      >
        Enviar
      </button>
    </form>
  );
};

export default CharacterFormEdit;
