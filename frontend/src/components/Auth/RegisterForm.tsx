import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api'; // Asegúrate de tener la configuración correcta de Axios
import { registerSchema } from '../../validation/authValidation';


type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const url_image = "https://img2.rtve.es/i/?w=1600&i=1657019154219.jpg";

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await api.post('/auth/register', {
        username: data.name.trim(),
        password: data.password,
      });
      navigate('/login'); // Redirige al usuario a la página de login después del registro
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'
      style={{
        backgroundImage: `url(${url_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-8 bg-[#0d051ebd] rounded shadow-md w-[400px]">
        <h1 className="text-2xl font-bold mb-4 text-center text-[#ffc414]">Registrar Usuario</h1>
        <TextField
          fullWidth
          label="Nombre de Usuario"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{
            '& .MuiInputBase-input': { color: 'white' }, // Color del texto
            '& .MuiInputLabel-root': { color: 'white' }, // Color de la etiqueta
            marginY: "10px",
          }}
        />
        <TextField
          fullWidth
          type="password"
          label="Contraseña"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{
            '& .MuiInputBase-input': { color: 'white' }, // Color del texto
            '& .MuiInputLabel-root': { color: 'white' }, // Color de la etiqueta
            marginTop: "10px",
          }}
        />

        <TextField
          fullWidth
          type="password"
          label="Repetir Contraseña"
          {...register('repeatPassword')}
          error={!!errors.repeatPassword}
          helperText={errors.repeatPassword?.message}
          sx={{
            '& .MuiInputBase-input': { color: 'white' }, // Color del texto
            '& .MuiInputLabel-root': { color: 'white' }, // Color de la etiqueta
            margin: '10px 0',
          }}
        />

        <Button type="submit" variant="contained" color="primary"
          sx={{ margin: '10px 0', width: '100%' }}
        >
          Register
        </Button>

        <h2 className="text-center text-[#ffc414]">
          <Link to="/login"
          >Tienes Cuenta?</Link>
        </h2>

      </form>

    </div >
  );
};

export default RegisterForm;
