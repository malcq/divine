import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'i18n';

import { AvailableScheme } from '@models/stopLanding';
import media from '@utils/media';

type Props = {
  schemes: AvailableScheme[],
  place: string,
  className?:string;
}

const SchemeSection: React.FC<Props> = (props) => {
  const { t } = useTranslation('common');
  const [showMore, setShowMore] = React.useState(false);

  return (
    <StyledWrapper className={props.className}>
      <h3>
        {t('federal__scheme-section-title', {place: props.place})}
      </h3>
      <ul>
        {
          props.schemes.map((item, idx) => {
            if (!showMore && idx >= 5) return null;
            return (
              <li key={idx}>
                {`${item.scheme_name_short} ${item.scheme_name_long}`}
              </li>
            )
          })
        }
      </ul>
      {!showMore && props.schemes.length > 5 &&
        < button
          onClick={() => setShowMore(true)}
          type="button"
        >
          {t('federal__show-more')}
        </button>
      }
    </StyledWrapper >
  )
};

const StyledWrapper = styled.div`
  /* padding-bottom: 40px; */

  ${media.desktop} {
    /* padding-bottom: 44px; */
  }

  & > h3 {
    ${props => props.theme.typography.fnTitle2};
    ${props => props.theme.typography.fnText};
    color: ${props => props.theme.colorValues.grey};
  }
  
  & > ul {
    padding: 16px 0;
    list-style-type: disc;
    ${props => props.theme.typography.fnBody};
    ${props => props.theme.typography.fnText};
    color: ${props => props.theme.colorValues.lightgrey};

    & li {
      margin-left: 20px;
    }

    & > li:not(:last-child) {
      padding-bottom: 4px;
    }
  }
  & > button {
    margin-left: 20px;
    text-transform: uppercase;
    cursor: pointer;
    ${(props) => props.theme.typography.fnMedium}
    ${(props) => props.theme.typography.fnLabel2}
    color: ${(props) => props.theme.colorValues.primary};

    :hover {
      color: ${(props) => props.theme.colorValues.primaryHover};
    }
  }
`;

export default SchemeSection;