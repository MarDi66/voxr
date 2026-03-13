import { cn } from "@/lib/utils";
import Image from "next/image";

export default function   VoxrLogo({ className }: { className?: string }) {
  return (
    <Image src="/voxr-logo.png" alt="Voxr Logo" width={128} height={128} className={cn("invert", className)} />
  )
}