import { MouseEvent, useContext, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { GetStaticProps } from "next"

import { CartButton } from "../components/CartButton"
import { CartContext, IProduct } from "../context/CartContext"
import { stripe } from "../lib/stripe"
import { HomeContainer, Product } from "../styles/pages/home"

import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"
import Head from "next/head"
import { Skeleton } from "@/components/Skeleton"

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  const [loading, setLoading] = useState(true)

  const { addToCart, checkIfItemAlreadyExists } = useContext(CartContext)

  function handleAddToCart(event: MouseEvent<HTMLButtonElement>, product: IProduct) {
    event.preventDefault()
    addToCart(product)
  }

  useEffect(() => {
    const timeOut = setTimeout(() => setLoading(false), 2000)

    return () => clearTimeout(timeOut)
  }, [])

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      {loading ? (
        <Skeleton />
      ) : (
        <HomeContainer ref={sliderRef} className="keen-slider">
          {products.map(product => {
            return (
              <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                <Product className="keen-slider__slide">
                  <Image src={product.imageUrl} width={520} height={480} alt={product.description} />

                  <footer>
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                    </div>

                    <CartButton
                      color="green"
                      size="large"
                      disabled={checkIfItemAlreadyExists(product.id) > -1}
                      onClick={(event) => handleAddToCart(event, product)}
                    />
                  </footer>
                </Product>
              </Link>
            )
          })}
        </HomeContainer>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(price.unit_amount ? price.unit_amount / 100 : 0),
      numberPrice: price.unit_amount ? price.unit_amount / 100 : 0,
      defaultPriceId: price.id
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours,
  }
}