import Hero from '../components/hero.tsx';
import Support from '../components/support.tsx';
import WhatCatsNeed from '../components/what-cats-need.tsx';
import Adopt from '../components/adopt.tsx';
import Footer from '../components/footer.tsx';
import Donation from '../components/donation.tsx';
import { createContext, useContext, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery.tsx';

interface IsDesktopContextType {
  isDesktop: boolean;
}

// 1. Create the context with a default value of `undefined`
const IsDesktopContext = createContext<IsDesktopContextType | undefined>(
  undefined
);

const Home = () => {
  const [donationCode, setDonationCode] = useState<string>();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  return (
    <IsDesktopContext value={{ isDesktop }}>
      <main className='mx-auto max-w-screen-xl'>
        <Hero />
        <Support setDonationCode={setDonationCode} />
        <Donation
          donationCode={donationCode}
          setDonationCode={setDonationCode}
        />
        <WhatCatsNeed />
        <Adopt />
        <Footer />
      </main>
    </IsDesktopContext>
  );
};

export const useIsDesktopContext = () => {
  const context = useContext(IsDesktopContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

export default Home;
