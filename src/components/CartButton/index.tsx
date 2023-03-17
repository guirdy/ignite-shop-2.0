import { CartContext } from "@/context/CartContext";
import { Handbag } from "phosphor-react";
import { ComponentProps, useContext } from "react";
import { CartButtonContainer, ProductsQt } from "./styles";

type CartButtonProps = ComponentProps<typeof CartButtonContainer>;

export function CartButton({ ...rest }: CartButtonProps) {
  const { cartItems } = useContext(CartContext);

  return (
    <CartButtonContainer {...rest}>
      <Handbag weight="bold" />
      {cartItems.length > 0 && <ProductsQt>{ cartItems.length }</ProductsQt>}
    </CartButtonContainer>
  )
}
