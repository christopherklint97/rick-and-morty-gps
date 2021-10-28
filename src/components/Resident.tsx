import { Character } from "../types/gql/getLocations";
import styles from "../styles/components/Resident.module.css";
import Image from "next/image";

export default function Resident({ resident }: { resident: Character }) {
  const { name, status, species, gender, image } = resident;

  return (
    <div className={styles.container}>
      <Image
        src={image}
        width="100"
        height="100"
        alt={name}
        objectFit="cover"
        objectPosition="center"
      />
      <div className={styles.info}>
        <p>{name}</p>
        <p>status: {status}</p>
        <p>species: {species}</p>
        <p>gender: {gender}</p>
      </div>
    </div>
  );
}
