import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';

import Header from '../components/Headers/JourneyHeader';
import { useTranslation } from '../../i18n';

import { useScrollToTopPage } from '../utils/hooks/useScrollToTopPage';

import { PhotoCreditsPageLayout } from '../components/UI/Layouts';
import Footer from '../components/Footer';
import PhotoCredits from '../components/PhotoCredits';
import MetaInfo from '../components/UI/MetaInfo';
import { privacyPagesMeta } from '../utils/meta.constants';



const PrivacyPage: React.FC = (props) => {
  const { t } = useTranslation('law');

  useScrollToTopPage([]);
  return(
    <>
      <Head>
        <title>{t(`bildernachweis-page__title`)}</title>
      </Head>
      <MetaInfo
        info={privacyPagesMeta}
      />

      <Header />
      <PhotoCreditsPageLayout>
        <div className="photo-credits__content">
          <PhotoCredits />
        </div>
      </PhotoCreditsPageLayout>
     <Footer />
    </>
  )
}

/**
 * Wrapping page into hocs
 */
const FinalPage: NextPage = PrivacyPage;

FinalPage.getInitialProps = (ctx: NextPageContext) => {
  return {
    namespacesRequired: ['law'],
  };
}

export default FinalPage;
