import { MouseEvent, useContext, useState } from "react";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next"
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import Head from "next/head";

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
import { CartContext, IProduct } from "@/context/CartContext";

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    numberPrice: number
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { addToCart, checkIfItemAlreadyExists } = useContext(CartContext)

  const itemInCart = checkIfItemAlreadyExists(product.id)

  function handleAddToCart(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    addToCart(product)
  }


  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt={product.name} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={itemInCart > -1} onClick={(event) => handleAddToCart(event)}>
            {itemInCart > -1 ? "Adicionado" : "Colocar na sacola"}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_NSCMVVnuQyiYAH' } },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params?.id;

  const product = await stripe.products.retrieve(productId!, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(price.unit_amount ? price.unit_amount / 100 : 0),
        numberPrice: price.unit_amount ? price.unit_amount / 100 : 0,
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}
