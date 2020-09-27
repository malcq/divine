import React from 'react';
import Head from 'next/head';

import { PageMetaInformation } from '../../models/meta';

type Props = {
  info: PageMetaInformation,
}
const MetaInfo: React.FC<Props> = (props) => {
  const { info } = props;

  return (
    <Head>
      {info.description && (
        <meta
          name="description"
          content={info.description}
        />
      )}
      {info.keywords && (
        <meta
          name="keywords"
          content={info.keywords}
        />
      )}
      {info.robots && (
        <meta
          name="robots"
          content={info.robots}
        />
      )}
    </Head>
  )
}

export default MetaInfo;