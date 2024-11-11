import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Typography from '@mui/material/Typography';

import { useCounter } from '~/features/counter';

function HomePage() {
  const { counterValue, incrementCount, decrementCount } = useCounter();

  return (
    <Container>
      <Typography variant='h6' align='center' sx={{ mt: 8 }}>
        What would a React demo be without the obligatory...
      </Typography>
      <Typography variant='h2' align='center'>
        Counter Component
      </Typography>
      <Stack
        direction='column'
        sx={{
          mt: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant='h3' component='p' sx={{ display: 'inline' }}>
          {counterValue}
        </Typography>
        <Stack direction='row'>
          <IconButton onClick={decrementCount} size='large' color='minus'>
            <RemoveCircleIcon />
          </IconButton>
          <IconButton onClick={incrementCount} size='large' color='plus'>
            <AddCircleIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Container>
  );
}

export default HomePage;
