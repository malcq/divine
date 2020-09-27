import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from '../../components/Headers/JourneyHeader';

import { ErrorPageLayout } from '../../components/UI/Layouts';
import Footer from '../../components/Footer';
import { PillButton } from '../../components/UI/Button';

type Props = {
  statusCode?: number,
  message?: string
}

const ErrorPage: React.FC<Props> = (props) => {
  const router = useRouter();

  return (
    <>
      <Header />
      <ErrorPageLayout>
        <h1 className="ff-page__title">
          oops!
        </h1>
        <h2 className="ff-page__sub-title">
          {props.message ? props.message : (
            <>
              4<span>0</span>4 the page can't be found
            </>
          )}
        </h2>
        <PillButton
          onClick={() => router.replace('/')}
          className="ff-page__button"
        >
          Home
        </PillButton>
      </ErrorPageLayout>
      <Footer />
    </>
  )
}

export default ErrorPage;
