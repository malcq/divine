import React from 'react';
import styled from 'styled-components';

type Props = {}

interface IPhotoCreditsPage {
  page_title: string,
  main_text: string,
  creds: ICred[]
}
interface ICred {
  text: string;
}
const PhotoCredits: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h1 className="imprint__title-main">
        {photoCreditsPage.page_title}
      </h1>
      {photoCreditsPage.creds.map((cred: ICred, index: number): React.ReactNode => {
        return (
          <p
            key={index}
            className="imprint__text"
          >
            {cred.text}
          </p>
        )
      })}
    </StyledWrapper>
  )
  
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .imprint {
    &__title-main {
      ${props => props.theme.typography.fnTitle1};
      ${props => props.theme.typography.fnRegular};
      color: ${props => props.theme.colorValues.grey};
      margin-bottom: 12px;
    }

    &__text {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
      padding-left: 25px;
    }

    &__main-text {
      margin-bottom: 12px;
    }
  }
`;

const photoCreds = [
  'Berlin Zoo: © flickr, Metro Centric',
  'Bielefeld Hbf: © flickr, Evgeny Borisov',
  'Bremen: © flickr, J-Cornelius',
  'Cottbus: © flickr, IngolfBLN',
  'Darmstadt Hbf: © flickr, hugh llewelyn',
  'Dortmund Hbf: © flickr,qdos',
  'Dresden Hbf: © flickr, FunkBrothers',
  'Dresden Neustadt: © flickr, sethschoen',
  'Duisburg Hbf: © flickr, coolagad',
  'Erfurt Hbf: © flickr,larssteffens.de',
  'Essen Hbf: © flickr,Casey Hugelfink',
  'Freankfurst am Main Flgh Fern: © flickr, warrenski',
  'Hackescher Markt: © Flickr,IngolfBLN',
  'Halle Saale: © flickr,onnola',
  'Hamburg Dammtor: © flickr, s.bär',
  'Hannover Hbf: © flickr,interbeat',
  'Heidelberg Hbf: © flickr, hugh llewelyn',
  'Karlsruhe Hbf: © flickr, hugh llewelyn',
  'Kassel Hbf: © flickr, Ladycliff',
  'Kiel Hbf: © flickr, J-Cornelius',
  'Koblenz Hbf: © flickr, larssteffens.de',
  'Köln Hbf: © flickr, myahya',
  'Leipzig: © flickr, achimh',
  'Magdeburg Hbf: © flickr, sludgegulper',
  'Mainz Hbf: © flickr, myahya',
  'Mannheim Hbf: © flickr, Loz Flowers',
  'München Hbf: © flickr, dustpuppy',
  'München Ost: © flickr, blu-news.org',
  'Rostock Hbf: © flickr, sludgegulper',
  'Saarbrücken Hbf: © flickr, J-Cornelius',
  'Stuttgart Hbf: © flickr, dustpuppy',
  'Weimar bahnhof: © flickr, stiefkind',
  'Wiesbaden Hbf: © flickr, marfis75',
  'Würzburg Hbf: © flickr, Matthew Black'
  ].map((text: string): { text: string } => ({ text }))

const photoCreditsPage: IPhotoCreditsPage = {
  page_title: "Bildernachweis",
  main_text: "Hinweise gem. § 5 des Telemediengesetzes (TMG) in der Fassung vom 26.02.2007. Diese Seiten werden Dir bereitgestellt von:",
  creds: photoCreds
}
export default PhotoCredits;

