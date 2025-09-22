import Image from "next/image";
import uchuemon from "@/app/uchuemon.png";

export default function Uchuemon() {
  return (
    <Image
      src={uchuemon}
      alt="Uchuemon"
    />
  );
}
