import type { Goal } from '../../../types/donations.ts';
import './bar.css';
import React from 'react';

const Bar: React.FC<{
  goal: Goal;
  setDonationCode: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ goal, setDonationCode }) => {
  return (
    <section className='relative text-xl w-[360px] rounded-2xl shadow-lg bg-gray-100 overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-2 '>
      {/* Top border — full width, no rounding */}
      <div
        className='absolute top-0 left-0 w-full h-1.5'
        style={{ backgroundColor: goal.color }}
      />

      {/* Card content */}
      <main className='p-10 relative flex flex-col'>
        <span className='flex gap-8 justify-between items-start'>
          <h1 className='text-2xl font-bold text-justify'>{goal.name}</h1>
          <p
            className='text-lg px-3 py-1 text-white rounded-full'
            style={{ backgroundColor: goal.color }}
          >
            {(100 * goal.amountDonated) / goal.donationGoal}%
          </p>
        </span>
        <div className='mt-8 flex flex-col items-center justify-between'>
          <span className='w-full flex items-baseline justify-between'>
            <h2 className='text-4xl' style={{ color: goal.color }}>
              {goal.amountDonated}
              {goal.unit}
            </h2>
            <p className='text-xl text-gray-500'>
              eesmärk {goal.donationGoal}
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

        <div className='w-full bg-gray-200 rounded-xl p-2 mt-12 mb-8 flex items-center justify-around'>
          <span>
            <p>{goal.amountOfDonations}</p>
            <p className='text-sm text-gray-500'>ANNETAJAT</p>
          </span>
          <span>
            <p>
              {goal.donationGoal - goal.amountDonated}
              {goal.unit}
            </p>
            <p className='text-sm text-gray-500'>VEEL VAJA</p>
          </span>
        </div>

        <a
          className='px-8 py-4 rounded-2xl cursor-pointer text-white transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg hover:brightness-90 hover:saturate-125'
          style={{
            backgroundColor: goal.color,
          }}
          href={goal.link}
          onClick={() => setDonationCode(goal.code)}
        >
          {goal.message}
        </a>
      </main>
    </section>
  );
};

export default Bar;
