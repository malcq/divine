import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { DFPSlotsProvider, AdSlot } from 'react-dfp';
import { WithTranslation } from 'next-i18next';

import Header from '../components/Headers/JourneyHeader';

import { withTranslation } from '../../i18n';
import { ErrorPageLayout } from '../components/UI/Layouts';
import Footer from '../components/Footer';
import { PillButton } from '../components/UI/Button';
import { useRouter } from 'next/router';

interface TestProps extends WithTranslation { }


const TestPage: React.FC<TestProps> = (props) => {

  return (
    <>
      <Head>
        <title>Test page</title>
      </Head>
      <Header />     
      {/* <ErrorPageLayout>
        <h1 className="ff-page__title">
          oops!
        </h1>
        <h2 className="ff-page__sub-title">
          4<span>0</span>4 the page can't be found
        </h2>
        <PillButton 
          onClick={() => router.replace('/')}
          className="ff-page__button">
          Home
        </PillButton>
      </ErrorPageLayout> */}
      <Footer />
    </>
  )
}


/**
 * Wrapping page into hocs
 */
const FinalPage: NextPage = withTranslation('common')(TestPage);

FinalPage.getInitialProps = (ctx: NextPageContext) => {
  return {
    namespacesRequired: ['common', 'search-widget'],
  };
}

export default FinalPage;
