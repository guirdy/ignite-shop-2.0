import type { AppProps } from 'next/app'
import { CartContextProvider } from '@/context/CartContext'
import { Header } from '@/components/Header'
import { globalStyles } from "../styles/global"
import { Container } from "../styles/pages/app"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header />

        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}
