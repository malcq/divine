import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';

import Header from '../components/Headers/JourneyHeader';
import { useTranslation } from '../../i18n';

import { useScrollToTopPage } from '../utils/hooks/useScrollToTopPage';

import { ImpressumPageLayout } from '../components/UI/Layouts';
import Footer from '../components/Footer';
import Imprint from '../components/Imprint';
import MetaInfo from '../components/UI/MetaInfo';
import { privacyPagesMeta } from '../utils/meta.constants';



const ImpressumPage: React.FC = (props) => {
  const { t } = useTranslation('law');

  useScrollToTopPage([]);
  return(
    <>
      <Head>
        <title>{t(`impressum-page__title`)}</title>
      </Head>
      <MetaInfo
        info={privacyPagesMeta}
      />

      <Header />
      <ImpressumPageLayout>
        <div className="impressum__content">
          <Imprint />
        </div>
      </ImpressumPageLayout>
     <Footer />
    </>
  )
}

/**
 * Wrapping page into hocs
 */
const FinalPage: NextPage = ImpressumPage;

FinalPage.getInitialProps = (ctx: NextPageContext) => {
  return {
    namespacesRequired: ['law'],
  };
}

export default FinalPage;
