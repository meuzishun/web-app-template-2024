import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Typography from '@mui/material/Typography';

import { useCounter } from '~/features/counter';

function HomePage() {
  const { counterValue, incrementCount, decrementCount } = useCounter();

  return (
    <Stack
      direction='row'
      spacing={4}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <IconButton onClick={decrementCount} size='large' color='error'>
        <RemoveCircleIcon />
      </IconButton>
      <Typography variant='h3' component='p' sx={{ display: 'inline' }}>
        {counterValue}
      </Typography>
      <IconButton onClick={incrementCount} size='large' color='success'>
        <AddCircleIcon />
      </IconButton>
    </Stack>
  );
}

export default HomePage;
