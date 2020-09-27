import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';

import { useTranslation } from '../../i18n';
import media from '../utils/media';

import Header from '../components/Headers/JourneyHeader';
import Footer from '../components/Footer';
import { Button, ButtonSizes } from '../components/UI/Button';
import Ripple from '@components/UI/Ripple';

const Custom404: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>404 page</title>
      </Head>
      <Header />
        <StyledContainer>
          <h1 className="not-found__headline">
            404

            <p className="not-found__description">
              {t('not-found__description')}
            </p>
          </h1>
          <Button
            size={ButtonSizes.small}
            onClick={() => router.replace('/')}
            className="not-found__button"
          >
            <Ripple />
            {t('not-found__button')}
          </Button>


        </StyledContainer>
      <Footer />
    </>
  )
}

const StyledContainer = styled.main`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;

  max-width: calc(${props => props.theme.gridValues.maxContentWidth}px + 10px);
  min-height: calc(100vh - 152px);


  .not-found {
    &__headline {
      ${props => props.theme.typography.fnRegular};
      font-size: 64px;
      line-height: 64px;
      letter-spacing: -2px;
      text-align: center;
      margin-bottom: 24px;

      ${media.desktop} {
        font-size: 80px;
        letter-spacing: -2.5px;
        line-height: 80px;
      }
    }


    &__description {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnTitle2};
      letter-spacing: initial;
      margin-top: 12px;

      ${media.desktop} {
        margin-top: 16px;
      }
    }

    &__button {
      text-transform: initial;
    }

  }

`;


Custom404.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'search-widget'],
  }
}

export default Custom404;
