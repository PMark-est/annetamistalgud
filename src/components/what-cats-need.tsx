import Arrow from '../assets/arrow.svg';
import { useIsDesktopContext } from '../pages/home.tsx';

const WhatCatsNeed = () => {
  const { isDesktop } = useIsDesktopContext();

  return (
    <section className='pb-20' aria-labelledby='needs-heading'>
      <div className='flex flex-wrap md:flex-nowrap px-10 md:px-32'>
        <div className='flex pt-12 md:pt-14'>
          <div className='text-width flex flex-col gap-5 mt-5 text-start text-lg md:text-xl lg:text-2xl'>
            <h2 className='uppercase text-pink-400 text-xl md:text-4xl lg:text-5xl pink'>
              Mida siis ikkagi vaja on?
            </h2>
            <p>
              See aasta on Cats Helpi jaoks erakordneltraske olnud. Esiteks
              seetõttu, et päästmist on vajanud rekordarv loomi. Ja teiseks,
              sest kogu ühiskonnal on ilmselt majanduslikult raske ja
              sellepärast ongi meie annetused palju kahanenud. Kahjuks oleme me
              aga annetustel põhinev organisatsioon. Ilma annetusteta ei saa me
              ka aidata.
            </p>
            <p>
              Uskuge, me teeme kõik endast oleneva, et vajalikke rahalisi
              vahendeid koguda. Meie vabatahtlikud on erakordselt loovad -
              korraldavad kohvikupäevi,{' '}
              <a
                href='https://www.facebook.com/catshelpoksjonid'
                className='text-cyan-400!'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Vaata Cats Helpi oksjone Facebookis (avatakse uues aknas)'
              >
                oksjone
              </a>
              , müüvad Yagas{' '}
              <a
                href='https://www.yaga.ee/cats-help-kunst'
                className='text-cyan-400!'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Vaata Eesti disainerite annetusi Yagas (avatakse uues aknas)'
              >
                Eesti disainerite annetusi
              </a>{' '}
              ning{' '}
              <a
                href='https://www.yaga.ee/cats-help-riided'
                className='text-cyan-400!'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Vaata kasutatud riideid Yagas (avatakse uues aknas)'
              >
                kasutatud riideid
              </a>{' '}
              ja{' '}
              <a
                href='https://www.facebook.com/profile.php?id=100062951695884'
                className='text-cyan-400!'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Vaata raamatuid Facebookis (avatakse uues aknas)'
              >
                raamatuid
              </a>
              . Uskuge, me tõesti pingutame. Ja mitte enda pärast, vaid ikka
              nende väikeste hingekeste pärast, kes ise ennast aidata ei saa.
            </p>
            <p>See aasta võtsime endale 3 eesmärki.</p>
          </div>
          {isDesktop && (
            <img
              className='img-max-height'
              src='/cat-2.png'
              alt='Abivajav kass, kes ootab toetust'
              loading='lazy'
            />
          )}
        </div>
      </div>

      <div className='flex flex-wrap text-start md:flex-nowrap px-10 md:px-32 mt-8 text-lg md:text-xl lg:text-2xl'>
        <article aria-labelledby='first-goal'>
          <div className='bg-img text-1 gap-6 pt-14'>
            <h3 id='first-goal'>
              <span className='text-pink-400'>Esimeseks</span> eesmärgiks on
              meil kokku koguda 1350 Eurot, et osta koostöös sinuga, kuivtoidu
              kuu aja toiduvaru meie kiisudele. ~400 kassi söövad kuu jooksul
              ära ca 1000 kg krõbinaid.
            </h3>
          </div>

          <div className='mt-8'>
            {isDesktop && (
              <>
                <h4 className='text-center uppercase text-2xl text-pink-400 mb-2'>
                  Selleks, et annetada
                </h4>
                <div className='relative mb-10 md:mb-24'>
                  <p className='text-center uppercase text-pink-400 ml-4 md:ml-28 md:mt-4 text-2xl'>
                    klõpsa siia
                  </p>
                  <img
                    className='absolute h-10 md:h-16 left-4 md:left-24'
                    src={Arrow}
                    alt=''
                    aria-hidden='true'
                  />
                </div>
                <button className='ml-12 px-5 py-2 rounded-full cursor-pointer text-white bg-cyan-400 transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:brightness-90 hover:saturate-125'>
                  <a
                    href='#donation-section'
                    className='text-white text-xl md:text-2xl px-5 py-2 bg-blue rounded-3xl hover:bg-blue-dark transition-colors'
                    aria-label='Toeta meie esimest eesmärki - kiisude toit'
                  >
                    Toeta
                  </a>
                </button>
              </>
            )}
          </div>
        </article>

        <div className='mt-6 md:mt-0'>
          <article
            className='bg-img md:ml-14 lg:ml-14 xl:ml-44 text-1'
            aria-labelledby='second-goal'
          >
            <div className='text-1 flex flex-col gap-6 pt-14'>
              <h3 id='second-goal'>
                <span className='text-pink-400'>Teiseks</span> eesmärgiks koguda
                kokku ühe kliinikuarve tasumiseks vajalik summa, mis on 14 000
                eurot. Sellest loost saad lähemalt lugeda{' '}
                <a
                  href='https://www.facebook.com/catshelpmtu/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-cyan-400!'
                  aria-label='Loe kliinikuarve loo kohta Facebookis (avatakse uues aknas)'
                >
                  Facebookist
                </a>
                . Oleme tänulikud kliinikutele, et nad meid nii palju aidanud on
                ja see on ju mõistetav, et nad ei saa päris tasuta meid aidata.
                Tahaksime oma võlad ilusti ära tasuda.
              </h3>
            </div>
          </article>

          <article
            className='bg-img md:mx-11 lg:mx-20 mt-8 text-1'
            aria-labelledby='third-goal'
          >
            <div className='text-1 flex flex-col gap-6 pt-14'>
              <h3 id='third-goal'>
                <span className='text-pink-400'>Kolmandaks</span> eesmärgiks on
                meil see aasta koguda uusi{' '}
                <a
                  href='https://forms.gle/sbkhFneH4awG93hYA'
                  target='_blank'
                  className='text-cyan-400!'
                  rel='noopener noreferrer'
                  aria-label='Täida hoiukodu ankeet (avatakse uues aknas)'
                >
                  hoiukodusid
                </a>
                . Sest justnimelt hoiukodude hulk on see, mis piirab meid
                kiisude tänavalt päästmisel. Meil lihtsalt pole neile pakkuda
                sooja toanurgakest, kuhu nad peale kliinikut minna saaksid. Kõik
                meie hoiukodud on kiisusid täis ja vabu kohti tekib vaid siis,
                kui mõni kiisu koju läheb.
              </h3>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default WhatCatsNeed;
