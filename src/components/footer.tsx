const Footer = () => {
  return (
    <footer
      className='flex text-start px-10 md:px-32 py-12 flex-wrap'
      aria-labelledby='footer-heading'
    >
      <div className='flex-1 flex flex-col gap-7 lg:gap-14'>
        <h2
          id='footer-heading'
          className='uppercase text-xl md:text-4xl lg:text-5xl xl:text-6xl text-pink-400'
        >
          Kuidas meid veel toetada?
        </h2>

        <p className='uppercase text-base sm:text-xl lg:text-2xl'>
          Siis kui tellid toitu või kassitarbeid veebilehelt{' '}
          <a
            href='https://petcenter24.ee/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-cyan-400! hover:underline focus:underline'
            aria-label='Nurreni veebileht (avatakse uues aknas)'
          >
            www.petcenter24.ee
          </a>{' '}
          või
          <a
            href='https://miumjau.ee/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-cyan-400! hover:underline focus:underline'
            aria-label='Nurreni veebileht (avatakse uues aknas)'
          >
            www.miumjau.ee
          </a>{' '}
          ja valid saajaks Cats Help
        </p>

        <p className='uppercase text-base sm:text-xl lg:text-2xl'>
          või{' '}
          <a
            href='http://www.vurrud.ee/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-cyan-400! hover:underline focus:underline'
            aria-label='Vurrude veebileht (avatakse uues aknas)'
          >
            www.vurrud.ee
          </a>{' '}
          ja valid annetus Cats Help-le
        </p>

        <h3 className='uppercase text-xl md:text-4xl lg:text-5xl xl:text-6xl text-pink-400'>
          Aitähhhhhhh!!!!!
          <span className='sr-only'>Teie toetuse eest</span>
        </h3>
      </div>

      <div className='flex-1' aria-hidden='true'>
        <img
          className='ml-8 max-w-full h-auto'
          src='/cat-footer.png'
          alt=''
          loading='lazy'
        />
      </div>
    </footer>
  );
};

export default Footer;
