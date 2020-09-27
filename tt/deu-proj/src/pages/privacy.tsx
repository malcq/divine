import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';

import Header from '@components/Headers/JourneyHeader';
import { useTranslation } from 'i18n';

import { useScrollToTopPage } from '@utils/hooks/useScrollToTopPage';

import { PrivacyPageLayout } from '@components/UI/Layouts';
import Footer from '@components/Footer';
import Privacy from '@components/Privacy';
import MetaInfo from '@components/UI/MetaInfo';
import { privacyPagesMeta } from '@utils/meta.constants';



const PrivacyPage: React.FC = (props) => {
  const { t } = useTranslation('law');

  useScrollToTopPage([]);
  return(
    <>
      <Head>
        <title>{t(`confidential-page__title`)}</title>
      </Head>
      <MetaInfo
        info={privacyPagesMeta}
      />

      <Header />
      <PrivacyPageLayout>
        <div className="privacy__content">
        <Privacy />
        </div>
      </PrivacyPageLayout>
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
