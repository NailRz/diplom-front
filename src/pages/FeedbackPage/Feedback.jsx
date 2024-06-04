import { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
} from '@mui/material';

const Feedback = () => {
  const [value, setValue] = useState(2);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // TODO: send feedback to server
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Отзыв
      </Typography>
      <Box>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      <Box my={2} style={{ display: 'flex', alignItems: '', justifyContent: 'center', flexDirection: 'row' }}>
        <TextField
          id="outlined-multiline-static"
          label="Отзыв"
          multiline
          color = 'success'
          variant="filled" 
          rows={15}
          noValidate
        //   focused 
          value={comment}
          sx={{
            width: "80%",
            '& .MuiInputBase-input': {
              color: 'white',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'gray',
              },
              '&:hover fieldset': {
                borderColor: 'gray',
              },
            },
          }}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <Button variant="contained" color="success" onClick={handleSubmit} >
          Отправить
        </Button>
      </Box>
    </Box>
  );
};

export default Feedback;
