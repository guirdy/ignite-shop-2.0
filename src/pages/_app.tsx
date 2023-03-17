import type { AppProps } from 'next/app'
import { globalStyles } from "../styles/global"
import { Container, Header } from "../styles/pages/app"
import logoImg from "../assets/logo.svg"

import Image from 'next/image'
import { CartContextProvider } from '@/context/CartContext'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header>
          <Image src={logoImg.src} width={100} height={100} alt="" />
        </Header>

        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}
