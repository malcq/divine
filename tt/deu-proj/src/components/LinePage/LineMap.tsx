import React from 'react';
import styled, { ThemeContext } from 'styled-components';
import { BASE_URL } from '@utils/constants';
import qs from 'query-string';
import ElipsisAnimation from '@components/UI/icons/ElipsisAnimation';
import media from '@utils/media';

type Props = {
  scheme: string,
  line: string,
  type: string,
  isReverse: boolean,
  current_stop?: string
};

const LineMap: React.FC<Props> = (props) => {
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [isLoad, setIsLoad] = React.useState(true);
  const [isLoadFailed, setIsLoadFailed] = React.useState(false);
  const { colorValues } = React.useContext(ThemeContext);

  React.useEffect(() => {
    const imgSrc = qs.stringifyUrl({
      url: `${BASE_URL}/api/karten/linie?`,
      query: {
        name: props.line,
        type: props.type,
        scheme: props.scheme,
        current_stop: props.current_stop ?? '',
        reverse: `${props.isReverse}`
      }
    });

    if (imgRef.current) {
      imgRef.current.src = imgSrc;
      imgRef.current.onload = () => {
        setIsLoad(false)
      }
      imgRef.current.onerror = () => {
        setIsLoad(false);
        setIsLoadFailed(true)
      }
    }
  }, [props]);

  return (
    <StyledWrapper >
      {isLoad &&
        <div className="loading-cirle">
          <ElipsisAnimation color={colorValues.primary} />
        </div>
      }
      {isLoadFailed ?
        <div className="default-img"> No image available</div> :
        <img ref={imgRef} alt={`${props.line} route map`}/>
      }
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  position: relative;
  padding-top: 63.90%;
  ${media.desktop} {
    margin: 0 5px;
  }

  ${media.ld} {
    margin: 0;
  }

  .loading-cirle {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colorValues.white};
    z-index: 5;
  };
  & > img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
  } 
  .default-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colorValues.white};
    ${props => props.theme.typography.fnTitle3};
    ${props => props.theme.typography.fnMedium};
    color: ${props => props.theme.colorValues.lightergrey};
  }
`;

export default LineMap;