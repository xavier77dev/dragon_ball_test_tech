import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../validation/authValidation';
import { Link } from 'react-router-dom';
import * as z from 'zod';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';


type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useAuth();

  const url_image = "https://i.ytimg.com/vi/s_u0n6P_cyQ/maxresdefault.jpg";

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post('auth/login', {
        username: data.username.trim(),
        password: data.password,
      })
      const { token } = response.data;

      localStorage.setItem('token', token);
      login();
    }
    catch (error) {
      setErrorMessage("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
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
        <h1 className="text-2xl font-bold mb-4 text-[#ffc414] text-center">Iniciar Sesión</h1>
        <TextField
          label="Nombre de Usuario"
          {...register('username')}
          fullWidth
          margin="normal"
          error={!!errors.username}
          helperText={errors.username?.message}
          sx={{
            '& .MuiInputBase-input': { color: 'white' },
            '& .MuiInputLabel-root': { color: 'white' },
          }}
        />
        <TextField
          label="Contraseña"
          type="password"
          {...register('password')}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{
            '& .MuiInputBase-input': { color: 'white' },
            '& .MuiInputLabel-root': { color: 'white' },
          }}

        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginBottom: '10px', width: '100%' }}
        >
          Acceso
        </Button>

        <h2 className="text-center text-[#ffc414]">
          <Link to="/register"
          >No Tienes una Cuenta?</Link>
        </h2>


        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(null)}
        >
          <Alert onClose={() => setErrorMessage(null)} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </form>

    </div >
  );
};

export default LoginForm;
