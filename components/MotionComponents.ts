import { Center, CenterProps } from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";

type MergeCenter<P, T> = Omit<P, keyof T> & T;
type MotionCenterProps = MergeCenter<CenterProps, HTMLMotionProps<"div">>;
export const MotionCenter: React.FC<MotionCenterProps> = motion(Center);
