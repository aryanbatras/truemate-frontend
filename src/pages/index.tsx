import type { NextPage } from 'next';
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navigation, HeroSection, CTASection, AppleCardsCarouselDemo, InfiniteMovingCards, Loader } from "@/components";
import { useAuth } from "@/contexts/AuthContext";

const AuthModal = dynamic(() => import("@/components/auth/AuthModal"), {
  ssr: false,
  loading: () => null,
});

const HomePage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { login, register, isLoading: authLoading, error, clearError } = useAuth();

  const loveStories = [
    {
      quote: "We matched on a Tuesday night. By Friday, we were having dinner. Three months later, we moved in together. TrueMate didn't just show us profiles - it showed us someone who understood our weird humor and love for old movies.",
      name: "Alex & Jamie",
      title: "Together 8 months"
    },
    {
      quote: "After years of disappointing dates, I almost gave up. But TrueMate's matching algorithm found someone who shared my passion for hiking and my quiet mornings. We're now planning our first camping trip together.",
      name: "Morgan",
      title: "Found their adventure partner"
    },
    {
      quote: "Long distance seemed impossible until TrueMate connected us. We've been video calling every night for six months, and I'm moving to their city next month. The app made our distance feel smaller.",
      name: "Taylor & Sam",
      title: "Closing the distance soon"
    },
    {
      quote: "As a single parent, dating felt complicated. TrueMate understood that. I met someone who not only accepts my kids but loves them. We're building a life together, one step at a time.",
      name: "Jordan",
      title: "Building a family"
    },
    {
      quote: "We were both skeptical about online dating. But TrueMate's approach to genuine connections changed everything. From our first message about books to now sharing an apartment - it's been real.",
      name: "Casey & Riley",
      title: "From books to forever"
    },
    {
      quote: "I never thought I'd find someone who gets my anxiety and supports my art. TrueMate matched us based on emotional intelligence, not just photos. We're each other's biggest fans now.",
      name: "Avery",
      title: "Found their biggest supporter"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
    clearError();
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
    clearError();
  };

  const handleLogin = async (credentials: any) => {
    await login(credentials);
    if (!error) {
      handleCloseAuthModal();
    }
  };

  const handleRegister = async (userData: any) => {
    await register(userData);
    if (!error) {
      handleCloseAuthModal();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navigation onAuthModalOpen={handleOpenAuthModal} />
      <HeroSection />
      {/* <FeaturesSection /> */}
      <AppleCardsCarouselDemo />
      <div style={{ 
        padding: "5rem 0", 
        background: "linear-gradient(135deg, #000000, #1a0000)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 70%)"
        }}></div>
        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          padding: "0 2rem",
          position: "relative",
          zIndex: 1
        }}>
          <h2 style={{ 
            fontSize: "3rem", 
            fontWeight: "700", 
            textAlign: "center", 
            marginBottom: "1rem",
            color: "#ffffff",
            textShadow: "0 0 20px rgba(239, 68, 68, 0.5)",
            letterSpacing: "1px"
          }}>
            Real Love Stories
          </h2>
          <p style={{ 
            fontSize: "1.25rem", 
            textAlign: "center", 
            marginBottom: "4rem",
            color: "rgba(248, 180, 180, 0.9)",
            maxWidth: "700px",
            margin: "0 auto 4rem auto",
            fontStyle: "italic",
            lineHeight: 1.6
          }}>
            How real connections started on TrueMate - from first matches to forever
          </p>
          <InfiniteMovingCards 
            items={loveStories} 
            direction="left" 
            speed="slow" 
            pauseOnHover={true}
          />
        </div>
      </div>
      <CTASection />
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        onLogin={handleLogin}
        onRegister={handleRegister}
        isLoading={authLoading}
        error={error || undefined}
      />
    </>
  );
};

export default HomePage;
