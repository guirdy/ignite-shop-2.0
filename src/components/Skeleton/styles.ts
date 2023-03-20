import { keyframes, styled } from "../../styles";

const skeletonAnimation = keyframes({
  "0%": {
    opacity: 0.3
  },
  "100%": {
    opacity: 1
  },
});

export const SkeletonContainer = styled("div", {
    display: "flex",
    gap: "46px",
    width: "100%",
    maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
    marginLeft: "auto",
    minHeight: 656,
});

export const SkeletonItem = styled("div", {
  animation: `${skeletonAnimation} 1300ms ease-in-out infinite`,
  backgroundColor: "$gray800",
  backgroundImage: "linear-gradient(90deg, $gray800, $gray700, $gray800)",
  backgroundSize: "200px 100%",
  backgroundRepeat: "no-repeat",
  width: 556,
  height: 656,
  borderRadius: 8,
});
