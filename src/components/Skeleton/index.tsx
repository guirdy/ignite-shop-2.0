import { SkeletonContainer, SkeletonItem } from "./styles";

export function Skeleton() {
  return (
    <SkeletonContainer>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </SkeletonContainer>
  )
}