import React from 'react';
import Bar from './bar/bar.tsx';
import axios from 'axios';
import type { Goal } from '../../types/donations.ts';
import CompactBar from './bar/compact-bar.tsx';
import { useIsDesktopContext } from '../pages/home.tsx'; // Assuming Bar component exists

const Support: React.FC<{
  setDonationCode: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ setDonationCode }) => {
  const [goals, setGoals] = React.useState<Goal[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { isDesktop } = useIsDesktopContext();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/paymentData');
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        const data = response.data;
        setGoals(Object.values(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderBars = () => {
    if (!isDesktop) {
      return goals?.map(goal => {
        return <CompactBar setDonationCode={setDonationCode} goal={goal} />;
      });
    }
    return goals?.map(goal => {
      return <Bar setDonationCode={setDonationCode} goal={goal} />;
    });
  };

  if (loading)
    return (
      <div role='status' aria-live='polite'>
        Laeb andmeid...
      </div>
    );
  if (error)
    return (
      <div role='alert' aria-live='assertive'>
        Viga andmete laadimisel: {error}
      </div>
    );
  if (!goals) return null;

  return (
    <section
      className='relative py-12 px-10 md:px-32'
      aria-labelledby='donation-heading'
    >
      <div className='relative'>
        <h1 className='text-pink-400 uppercase flex flex-col text-center text-2xl xl:text-7xl'>
          <span>Armas külaline, Aita meil</span>
          <span aria-hidden='true'>kõhud täis ja tervis korda!</span>
        </h1>

        <div
          className='mt-20 flex flex-col gap-4 lg:grid lg:grid-cols-2 justify-items-center'
          role='region'
          aria-label='Annetuse eesmärgid'
        >
          {renderBars()}
        </div>

        <div className='flex justify-between mt-28 md:mt-16 relative'>
          <div className='flex-1' aria-hidden='true'></div>
          <div
            className='uppercase pink text-sm lg:text-base xl:text-xl flex flex-col gap-3 md:mr-20'
            aria-label='Annetamise juhised'
          >
            <p>Selleks, et annetada, Märgi selgitusse märksõna "toiduks",</p>
            <p>või "raviks", et aidata meid sinule meelepärase</p>
            <p>eesmärgi poole!</p>
          </div>
          <img
            className='w-28 sm:w-52 lg:w-64 bottom-32 sm:-bottom-24 lg:-bottom-28 -left-2 sm:-left-9 md:-left-20 lg:-left-30 absolute'
            src='/cat-1.png'
            alt='Abivajav kass, kes ootab toetust'
            loading='lazy'
          />
        </div>
      </div>
    </section>
  );
};

export default Support;
