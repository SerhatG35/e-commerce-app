import { Badge, BadgeProps } from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";

type MergeBadge<P, T> = Omit<P, keyof T> & T;
type MotionBadgeProps = MergeBadge<BadgeProps, HTMLMotionProps<"span">>;
export const MotionBadge: React.FC<MotionBadgeProps> = motion(Badge);
