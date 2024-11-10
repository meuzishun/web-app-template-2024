import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { UserList } from '~/features/users';

function ContactPage() {
  return (
    <Container sx={{ mt: 8 }}>
      <Stack direction='column'>
        <Typography variant='h3'>Users</Typography>
        <UserList />
      </Stack>
    </Container>
  );
}

export default ContactPage;
