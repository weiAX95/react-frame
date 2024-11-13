import { Helmet, HelmetProvider } from 'react-helmet-async';
import Button from '@mui/material/Button';

function HomePage() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Home Page</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div>
        <Button variant="contained">Home Page</Button>
      </div>
    </HelmetProvider>
  );
}
export default HomePage;
