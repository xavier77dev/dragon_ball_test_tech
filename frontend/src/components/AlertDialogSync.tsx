import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function AlertDialogSync() {
  const [open, setOpen] = React.useState(false);

  const { setCharacters } = useAuth();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSync = async () => {
    try {
      await api.get('/characters/sync', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      const dataCharacters = await api.get('/characters', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setCharacters(dataCharacters.data)
    } catch (error) {
      console.log(error)
    }

    handleClose();
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        SINCRONIZAR BD
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Seguro de Sincronizar la Base de Datos?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sincronizar la Base de Datos con la Api externa https://dragonball-api.com/api/characters.
            Se perderá todos los personajes creados y editados.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSync} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
