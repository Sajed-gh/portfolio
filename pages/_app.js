import '../styles/base.css';
import '../styles/layout.css';

import '../styles/components/Navbar.css';
import '../styles/components/Hero.css';
import '../styles/components/Lists.css';
import '../styles/components/Cards.css';
import '../styles/components/Carousel.css';
import '../styles/components/Modal.css';
import '../styles/components/Footer.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp