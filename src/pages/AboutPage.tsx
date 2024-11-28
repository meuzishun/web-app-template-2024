import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { texts } from '~/data';

function AboutPage() {
  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant='h4' mb={2}>
        About this template...
      </Typography>
      <Typography variant='body1'>{texts.about}</Typography>
    </Container>
  );
}

export default AboutPage;
