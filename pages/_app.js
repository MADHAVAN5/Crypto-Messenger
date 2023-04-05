// import '@/styles/globals.css'

//internal import
import { MessengerProvider } from '../context/MessengerContext';
import { Navbar } from '../components/index';

const MyApp = ({ Component, pageProps }) => (
  <div>
    <MessengerProvider>
      <Navbar/>
      <Component {...pageProps} />
    </MessengerProvider>
  </div>
);

export default MyApp;