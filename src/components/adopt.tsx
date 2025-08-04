import Arrow from '../assets/arrow.svg';
import Button from './button/button.tsx';
import { useIsDesktopContext } from '../pages/home.tsx';
const Adopt = () => {
  const { isDesktop } = useIsDesktopContext();
  return (
    <section
      className='text-start bg-gray-100 pt-7 md:pt-14'
      aria-labelledby='adoption-heading'
    >
      <div className='px-10 lg:w-4/5 text-lg lg:text-2xl'>
        <p>
          Anna hüljatud kassile võimalus leida uuesti kodusoojus ja hoolitsus -
          võta kass meie varjupaigast! Või paku hoiukodu mõnele tänaval külmas
          ootavale kassile!
        </p>
        <p className='mt-8'>
          Meil on üle 400 päästetud kassi hoiukodudes üle Eesti. Kõik nad on
          isemoodi erilised, kuid ühtemoodi tänulikud uue võimaluse eest
          paremale elule.
        </p>
      </div>

      <div className='grid grid-cols-12'>
        <div className='col-start-1 col-span-12 row-start-1'>
          <img
            src='/cat-3.png'
            alt='Adorable rescued cat looking for a home'
            className='mt-24 md:mt-0 lg:relative lg:top-6'
            loading='lazy'
          />
        </div>

        <div className='pl-3 md:pl-10 pt-6 md:pt-10 col-start-2 col-span-6 row-start-1 z-10'>
          <h2
            id='adoption-heading'
            className='uppercase text-xl md:text-4xl lg:text-5xl xl:text-6xl text-pink-400 mb-2 md:mb-8'
          >
            Adopteeri, ära shoppa!
          </h2>

          <p className='uppercase text-pink-400'>Vaata kiisusid siin</p>

          <Button className='text-lg lg:text-xl' disabled={false}>
            <a
              href='https://www.catshelp.ee/hoiukodude-kassid'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Vaata päästetud kasse Cats HELPi lehel'
            >
              Cats HELPi lehele
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Adopt;
