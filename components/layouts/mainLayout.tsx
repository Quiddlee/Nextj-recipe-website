import Head from 'next/head';

import Logo from '../logo/logo';
import SearchInput from '../searchInput/searchInput';
import SeoScripts from '../seo/seoScripts';

type propsType = {
  children: React.ReactElement;
};

const MainLayout = ({ children }: propsType) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="sticky top-0 z-40 mx-auto w-full bg-primary-50 pb-5 2xl:container sm:pb-0">
        <Logo />
        <SearchInput />
      </header>
      <section className="mx-auto mb-8 mt-5 w-full max-w-[955px] px-6 sm:mt-10 lg:px-0">
        {children}
        <SeoScripts />
      </section>
    </>
  );
};

export default MainLayout;
