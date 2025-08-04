import Logo from '../assets/logo.svg';
import Arrow from '../assets/arrow.svg';

const Hero = () => {
  return (
    <section
      className='bg-gray-100 xl:h-[1000px] relative p-10 rounded-b-3xl shadow-xl'
      aria-label='Main hero section'
    >
      <div className='pb-12 md:pb-0'>
        <header>
          <div>
            <img className='h-16 md:h-20' src={Logo} alt='Website logo' />
          </div>
        </header>

        <main>
          <div className='mt-14'>
            <h1 className='flex flex-col text-start text-4xl text-pink-400 lg:text-5xl xl:text-6xl'>
              <div className='flex flex-col'>
                <span>TEREEE!</span>
                <span className='text-cyan-400'>MEIE SIIN!</span>
              </div>
              <span className='my-2'>KAS SUL</span>
              <span>KONSERVI ON?</span>
            </h1>

            <div className='flex flex-col gap-4 mt-8 text-start xl:max-w-4/6 text-lg xl:text-xl font-normal'>
              <p>
                Ega ma muidu ei küsiks, kui et kahejalgne räägib, et{' '}
                <strong className='font-bold'>konservivaru</strong> hakkab otsa
                saama ja võib-olla me ei saa seda nii pea juurde osta. See oleks
                hullem, kui eelmisel aastal - kui meil liiv peaaegu otsa sai.
                PALJU-PALJU HULLEM!!{' '}
                <strong className='font-bold'>
                  Seega kui sul on konservi, siis teeme pooleks!
                </strong>
              </p>

              <p>
                Ja tead, mis veel hirmus on? Nurga taga sosistatakse, et kui
                keegi haigeks peaks jääma,{' '}
                <strong className='font-bold'>
                  siis me ei saa isegi arsti juurde minna
                </strong>
                , sest nii paljud kiisud on juba enne meid haiged olnud, et
                lihtsalt ei ole millegi eest arvet maksta. Ma ei tea mis see
                arve küll on, aga tundub hirmus loom. Kas sina oskaks arvet
                maksta? Kui oskad, äkki aitad mind ka? Kasvõi natuke?
              </p>

              <div className='mt-6 md:mt-9 text-base md:text-2xl flex justify-between items-center'>
                <span className='text-cyan-400'>
                  ANNETAMISTALGUD Cats HELPis
                </span>

                <div className='relative z-10'>
                  <button className='px-5 py-2 rounded-full cursor-pointer text-white bg-cyan-400 transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:brightness-90 hover:saturate-125'>
                    <a href='#donation-section' aria-label='Anneta'>
                      Toeta
                    </a>
                  </button>

                  <img
                    className='absolute -left-2/4 md:-left-3/4 top-10 h-16 md:h-auto'
                    src={Arrow}
                    alt=''
                    aria-hidden='true'
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <img
        className='absolute max-w-1/2 max-h-[1000px] right-0 top-0 object-contain'
        src='/cat.png'
        alt='Playful cat illustration'
        loading='lazy'
      />
    </section>
  );
};

export default Hero;
