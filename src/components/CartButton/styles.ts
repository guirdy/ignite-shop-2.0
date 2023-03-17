import { styled } from "../../styles";

export const CartButtonContainer = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: 6,
  position: "relative",
  cursor: "pointer",

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  variants: {
    color: {
      gray: {
        background: "$gray800",
        color: "$gray500",
      },
      green: {
        background: "$green500",
        color: "$white",

        span: {
          visibility: "hidden",
        },

        "&:not(:disabled):hover": {
          backgroundColor: "$green300",
        },
      },
    },

    size: {
      medium: {
        width: "3rem",
        height: "3rem",

        svg: {
          fontSize: 24,
        },
      },
      large: {
        width: "3.5rem",
        height: "3.5rem",

        svg: {
          fontSize: 32,
        },
      },
    },
  },

  defaultVariants: {
    color: "gray",
    size: "medium",
  },
});

export const ProductsQt = styled("span", {
  position: "absolute",
  width: "28px",
  height: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  backgroundColor: "$green300",
  color: "$white",
  fontSize: "$sm",
  border: '4px solid $gray900',
  borderRadius: "1000px",
  right: "-8.35px",
  top: "-8px",
});
