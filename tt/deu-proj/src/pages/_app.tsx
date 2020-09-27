import App, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { appWithTranslation } from '../../i18n';
import { ThemeProvider } from 'styled-components';
import { DFPSlotsProvider } from 'react-dfp';

import { themeDefault } from '../theme/default';
import GlobalStyles from '../theme/globalStyles';
import SettingsContextProvider from '../contexts/Settings';
import { DeviceInfo } from '../models/appSettings';
import { AD_NETWORK_ID } from '@utils/constants';

import routerHistory from '../utils/routerHistory';

import '../styles/fonts.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface AppProps extends AppInitialProps {
  deviceInfo?: DeviceInfo,
  reqType?: 'user' | 'bot',
}
class MyApp extends App<AppProps> {

  handleRouteChange = (url: string) => {
    routerHistory.setParams(url);
  }

  onTouchStart = () => true;

  componentDidMount() {
    //initialize first loaded URL with custom url history utility
    this.handleRouteChange(Router.router?.asPath ?? '');
    // for preventing scrolling page before data is ready
    window.history.scrollRestoration = 'manual'
    Router.events.on('routeChangeStart', this.handleRouteChange)

    var googletag: any = (window as any).googletag || {};
    googletag.cmd = googletag.cmd || [];
    /**
    * ⚠️⚠️⚠️ Active pseudoclass is not working on mobile safari.
    * To avoid it, we should set touchstart somewhere to trigger it for other elements.
    * here some info about it: https://stackoverflow.com/questions/3885018/active-pseudo-class-doesnt-work-in-mobile-safari
    */

    window.addEventListener('touchstart', this.onTouchStart);
   /*  window.removeEventListener('touchstart', listener); */
  };

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.handleRouteChange);
    window.removeEventListener('touchstart', this.onTouchStart);
  }
  render() {
    const { Component, pageProps } = this.props;
    const deviceInfo: DeviceInfo | undefined = (this.props.deviceInfo as DeviceInfo | undefined);
    return (
      <DFPSlotsProvider
        dfpNetworkId={AD_NETWORK_ID}
        collapseEmptyDivs={false}
      >
        <SettingsContextProvider initialDeviceInfo={deviceInfo} reqType={this.props.reqType}>
          <ThemeProvider theme={themeDefault}>
            <Head>
              <link
                rel="preload"
                href="/static/fonts/IBM_plex/woff2/IBMPlexSans-Regular-Latin1.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
              />
              <link
                rel="preload"
                href="/static/fonts/IBM_plex/woff2/IBMPlexSans-Text-Latin1.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
              />
              <link
                rel="preload"
                href="/static/fonts/IBM_plex/woff2/IBMPlexSans-Medium-Latin1.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
              />
                 {/* <script
                async={true}
                src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
              ></script> */}
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
            </Head>
            <Component
              {...pageProps}
            />

            <GlobalStyles />
          </ThemeProvider>
        </SettingsContextProvider>
      </DFPSlotsProvider>
    );
  }
}

(MyApp.getInitialProps as any) = async (ctx: any) => {
  // do only on server
  // e.g. if (serverSide) { ... }
  const appProps = await App.getInitialProps(ctx)

  let deviceInfo = ctx?.ctx?.req?.deviceInfo;
  let reqType = ctx?.ctx?.req?.reqType;
  return {
    ...appProps,
    deviceInfo,
    reqType,
  }
}

const FinalApp = appWithTranslation(MyApp);;


export default FinalApp;


