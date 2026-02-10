import React from "react";
import AppleCardsCarousel from "@/components/landing/interactive/apple-card/AppleCardsCarousel";
import AppleCard from "@/components/landing/interactive/apple-card/AppleCard";
import styles from '@/styles/components/landing/AppleCardsCarouselDemo.module.css';

interface CardData {
  category: string;
  title: string;
  src: string;
  content: React.ReactNode;
}

const DatingContent: React.FC = () => {
  return (
    <div className={styles.contentContainer}>
      <p className={styles.contentText}>
        <span className={styles.contentBold}>
          Find your perfect match with TrueMate.
        </span>{" "}
        Connect with genuine people who share your values and interests. 
        Our smart matching algorithm helps you discover meaningful relationships 
        that last. Start your journey to love today.
      </p>
    </div>
  );
};

const RelationshipsContent: React.FC = () => {
  return (
    <div className={styles.contentContainer}>
      <p className={styles.contentText}>
        <span className={styles.contentBold}>
          Build lasting relationships.
        </span>{" "}
        TrueMate focuses on creating meaningful connections beyond superficial swiping. 
        Get to know potential partners through detailed profiles and thoughtful conversations 
        that lead to genuine relationships.
      </p>
    </div>
  );
};

const LoveContent: React.FC = () => {
  return (
    <div className={styles.contentContainer}>
      <p className={styles.contentText}>
        <span className={styles.contentBold}>
          Discover true love.
        </span>{" "}
        Experience the joy of finding someone who truly understands you. 
        TrueMate brings together compatible souls looking for commitment, 
        friendship, and lifelong partnership.
      </p>
    </div>
  );
};

const MatchingContent: React.FC = () => {
  return (
    <div className={styles.contentContainer}>
      <p className={styles.contentText}>
        <span className={styles.contentBold}>
          Smart compatibility matching.
        </span>{" "}
        Our advanced algorithm analyzes personality traits, values, and lifestyle preferences 
        to suggest highly compatible matches. Say goodbye to endless swiping and hello 
        to quality connections.
      </p>
    </div>
  );
};

const CommunityContent: React.FC = () => {
  return (
    <div className={styles.contentContainer}>
      <p className={styles.contentText}>
        <span className={styles.contentBold}>
          Join our trusted dating community.
        </span>{" "}
        Become part of a safe, respectful community of singles looking for real connections. 
        With verified profiles and dedicated support, TrueMate ensures your dating journey 
        is secure and enjoyable.
      </p>
    </div>
  );
};

const data: CardData[] = [
  {
    category: "Dating",
    title: "Find Your Perfect Match",
    src: "/carousal-images/img1.jpg",
    content: <DatingContent />,
  },
  {
    category: "Relationships",
    title: "Build Meaningful Connections",
    src: "/carousal-images/img2.jpg",
    content: <RelationshipsContent />,
  },
  {
    category: "Love",
    title: "Discover True Love",
    src: "/carousal-images/img3.jpg",
    content: <LoveContent />,
  },
  {
    category: "Matching",
    title: "Smart Compatibility Matching",
    src: "/carousal-images/img4.jpg",
    content: <MatchingContent />,
  },
  {
    category: "Community",
    title: "Join Our Dating Community",
    src: "/carousal-images/img5.jpg",
    content: <CommunityContent />,
  },
];

const AppleCardsCarouselDemo: React.FC = () => {
  const cards = data.map((card, index) => (
    <AppleCard key={card.src} card={card} index={index} />
  ));

  return (
    <div className={styles.demoContainer}>
      <h2 className={styles.demoTitle}>
        Discover Your Perfect Match
      </h2>
      <AppleCardsCarousel items={cards} />
    </div>
  );
};

export default AppleCardsCarouselDemo;
