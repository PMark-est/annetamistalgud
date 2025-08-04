import type { Goal } from '../../../types/donations.ts';
import './bar.css';
import React from 'react';

const CompactBar: React.FC<{
  goal: Goal;
  setDonationCode: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ goal, setDonationCode }) => {
  return (
    <a href={goal.link} onClick={() => setDonationCode(goal.code)}>
      <section className='relative text-xl w-full rounded-r-2xl shadow-lg bg-gray-100'>
        {/* Top border — full width, no rounding */}
        <div
          className='absolute top-0 left-0 w-1.5 h-full'
          style={{ backgroundColor: goal.color }}
        />

        {/* Card content */}
        <main className='p-10 flex flex-col'>
          <span className='text-start'>
            <h1 className='text-2xl font-bold'>{goal.name}</h1>
            <h2 className='text-base text-gray-500'>{goal.description}</h2>
          </span>
          <div className='mt-4 flex flex-col items-start justify-between'>
            <span className='w-full flex items-baseline justify-between'>
              <p className='text-xl text-gray-500'>
                {goal.amountDonated} {goal.unit} / {goal.donationGoal}{' '}
                {goal.unit}
              </p>
            </span>
            <div className='mt-4 h-3 w-full bg-gray-200 rounded overflow-hidden'>
              <div
                className='h-full rounded-md relative overflow-hidden'
                style={{
                  width: `${(100 * goal.amountDonated) / goal.donationGoal}%`,
                  backgroundColor: goal.color,
                }}
              >
                <div className='absolute inset-0 shimmer-animation'></div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </a>
  );
};

export default CompactBar;
