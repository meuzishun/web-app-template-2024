import Container from '@mui/material/Container';
import { PostList } from '~/features/posts';

function AboutPage() {
  return (
    <Container sx={{ mt: 8 }}>
      <PostList />
    </Container>
  );
}

export default AboutPage;
