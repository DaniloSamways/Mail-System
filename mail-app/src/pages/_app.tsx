import type { AppProps } from 'next/app';
import { ToastProvider } from 'react-toast-notifications';
import '../styles/globals.css';
import '../styles/Login.module.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={6000}
      placement="bottom-center"
    >
      <Component {...pageProps} />
    </ToastProvider>
  )
}

export default MyApp
