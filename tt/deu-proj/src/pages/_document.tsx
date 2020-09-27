import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import { STATIC_URLS } from '../utils/constants';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href={`${STATIC_URLS.META}/apple-touch-icon.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`${STATIC_URLS.META}/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`${STATIC_URLS.META}/favicon-16x16.png`} />
          <link rel="manifest" href={`${STATIC_URLS.META}/site.webmanifest`} />
          <link rel="mask-icon" href={`${STATIC_URLS.META}/safari-pinned-tab.svg`} color="#0081ff" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}