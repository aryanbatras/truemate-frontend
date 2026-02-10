import React from "react";
import { FocusCards } from "./FocusCards";
import styles from '../../styles/components/landing/WhyChooseTrueMate.module.css';

interface Card {
  title: string;
  src: string;
}

const WhyChooseTrueMate: React.FC = () => {
  const cards: Card[] = [
    {
      title: "Smart Matching",
      src: "/main-image.jpg"
    },
    {
      title: "Real-time Chat",
      src: "/man-and-women-sitting-in-table.png"
    },
    {
      title: "Video & Voice Calls",
      src: "/man-and-women-sitting-dating-mature-image.png"
    },
    {
      title: "Virtual Gifts",
      src: "/icon.png"
    },
    {
      title: "Verified Profiles",
      src: "/main-image.jpg"
    },
    {
      title: "Safe & Secure",
      src: "/icon.png"
    }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Why Choose TrueMate</h2>
      <p className={styles.subtitle}>
        Discover the features that make TrueMate the perfect platform for finding meaningful connections
      </p>
      <FocusCards cards={cards} />
    </div>
  );
};

export default WhyChooseTrueMate;
