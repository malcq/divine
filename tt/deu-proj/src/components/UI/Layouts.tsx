import styled, { css } from 'styled-components';
import media from '../../utils/media';
const STOP_CUSTOM_BREAKPOINT = media.custom(960);
export const BaseContentLayout = styled.main`
  max-width: ${props => props.theme.gridValues.maxContentWidth + (2 * props.theme.gridValues.sideDesktopPadding) + 1}px;
  margin: 0 auto;
  ${media.desktop} {
    padding: 0 ${props => props.theme.gridValues.sideDesktopPadding}px;
  }
  ${media.ld} {
    padding: 0 ${props => props.theme.gridValues.sideDesktopPadding}px;
  }

  .adBox {
    display: flex;
    justify-content: center;
  }
`;

export const JourneyLandingLayout = styled.main`
  max-width: ${props => props.theme.gridValues.maxContentWidth + (2 * props.theme.gridValues.sideDesktopPadding) + 1}px;
  margin: 0 auto;
  ${media.desktop} {
    padding: 0 ${props => props.theme.gridValues.sideDesktopPadding}px;
  }
  ${media.ld} {
    padding: 0 ${props => props.theme.gridValues.sideDesktopPadding}px;
  }

  .adBox {
    display: flex;
    justify-content: center;
  }
  .journey-landing {
    &__reise-title {
      ${props => props.theme.typography.fnTitle1};
      ${props => props.theme.typography.fnRegular};
      color: ${props => props.theme.colorValues.grey};
      padding: 0 16px;
      margin-bottom: 45px;
      text-align: center;
    }
  }
`;

export const BaseSection = styled.section`
  padding: 32px 16px;
  ${media.desktop} {
    padding: 56px 0;
  }
`;

export const StopPageLayout = styled.main`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: calc(${props => props.theme.gridValues.maxContentWidth}px + 11px);
  ${media.desktop} {
    display: flex;
    flex-direction: column;
  }
  ${media.ld} {
    flex-direction: row;
    margin-top: 32px;
    margin-bottom: 40px;
    padding: 0 5px;
    justify-content: space-between;
  }
  .stop-page {
    &__stops {
      z-index: 1;
      ${media.desktop} {
        width: 100%;
        margin: 0 auto;
        padding: 0;
      }
      ${media.ld} {
        max-width: 730px;
        margin: 0;
        /* margin-right: 44px; */
        /* margin-top: 32px; */
      }
    }
    &__aside {
      background-color: ${(props) => props.theme.bgColor};
      padding: 0 16px;
      position: relative;
      ${media.desktop} {
        display: flex;
        width: 100%;
        margin: 32px auto;
        padding: 0;
      }
      ${media.ld} {
        margin: 0;
        max-width: 305px;
      }
    }

    &__faq {
      margin: 40px 0 42px;
      ${media.desktop} {
        margin-top: 0;
        margin-bottom: 0;
      }

      ${media.ld} {
        width: 305px;
        margin: 0 44px 0 0;
      }
    }
  }
  .aside {
    &__content {
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      ${media.desktop} {
        display: flex;
        width: 100%;
        justify-content: space-between;
        flex-direction: row-reverse;
        padding: 0 16px;
      }
      ${media.ld} {
        display: block;
        padding: 0;
        height: max-content;
        user-select: none;
        width: 305px;
        
      }
    }
  }

  .simplebar-scrollbar::before {
    /* opacity: 1; */
    /* background-color: ${props => props.theme.colorValues.primary};   */
 }

 .simplebar-scrollbar.simplebar-visible:before {
   opacity: .3;
 }

  .adBox {
    display: flex;
    justify-content: center;
  }
`;
export const JourneysPageLayout = styled.main`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: ${props => props.theme.gridValues.maxContentWidth + 11}px;
  
  ${media.desktop} {
    margin-top: 32px;
    margin-bottom: 40px;
    /* 76px = footer, 245px = header, 72px = margin-top + margin-bottom */
    min-height: calc(100vh - 76px - 245px - 72px); 
  }
  ${media.ld} {
    padding: 0 5px;
    flex-direction: row;
    justify-content: space-between;
  }
  .reise-page {
   
    &__stops {
      position: relative;
      width: 100%;
      ${media.ld} {
        max-width: 730px;
        /* margin-right: 44px; */
      }
   }
  }

  .aside {
    &__content {
      ${media.desktop} {
        display: flex;
        max-width: 305px;
        justify-content: space-between;
        flex-direction: row-reverse;
        padding: 0 16px;
        margin: 20px;
        margin-left: auto;
      }
      ${media.ld} {
        display: block;
        margin: 0;
        padding: 0;
        /* overflow: hidden;
        position: sticky;
        top: 215px;
        height: max-content; */
      }
    }
  }
`;
export const PrivacyPageLayout = styled.main`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: calc(${props => props.theme.gridValues.maxContentWidth}px + 11px);
  min-height: calc(100vh - 152px);
  ${media.desktop} {
    width: 632px;
  }
  .privacy__content {
    padding: 55px 16px;
    ${media.desktop} {
      padding: 80px 0 58px 0;
  }
}
`;
export const ImpressumPageLayout = styled.main`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: calc(${props => props.theme.gridValues.maxContentWidth}px + 11px);
  min-height: calc(100vh - 152px);
  ${media.desktop} {
    width: 632px;
  }
  .impressum__content {
    padding: 55px 16px;
    ${media.desktop} {
      padding: 80px 0 58px 0;
  }
}
`;
export const PhotoCreditsPageLayout = styled.main`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: calc(${props => props.theme.gridValues.maxContentWidth}px + 11px);
  min-height: calc(100vh - 152px);
  ${media.desktop} {
    width: 632px;
  }
  .photo-credits__content {
    padding: 55px 16px;
    ${media.desktop} {
      padding: 80px 0 58px 0;
  }
}
`;
export const LinePageLayout = styled.main`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: calc(${props => props.theme.gridValues.maxContentWidth}px + 11px);
  ${media.desktop} {
    display: block;
    
  }
  ${media.ld} {
    display: flex;
    padding: 0 5px 0;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .line-page {
    &__content {
      border-bottom:1px solid ${props => props.theme.colorValues.lightestgrey};
      padding-bottom: 24px;
      ${media.ld} {
        width: 100%;
        max-width: 730px;
        overflow: hidden;
        border: 1px solid ${props => props.theme.colorValues.lightestgrey};
        border-radius: 8px;
        padding-bottom: 28px;
        height: max-content;
        margin-bottom: 40px;
        margin-top: 18px;
      }
    }
    &__additional-info {
      padding: 32px 16px;
      ${media.desktop} {
        padding: 0;
        margin-bottom: 40px;
      }
      ${media.ld} {
        display: block;
        margin-top: 18px;
      }
    }
    &__faq {
      margin-bottom: 42px;

      ${media.ld} {
        width: 305px;
        margin-bottom: 0%;
        margin-right: 0;
      }
    }
    &__aside-content {
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      ${media.desktop} {
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
        margin-top: 32px;
        padding: 0 16px;
      }
      ${media.ld} {
        display: block;
        user-select: none;
        padding: 0;
        margin: 0;

      }
    }
  }
  .simplebar-scrollbar.simplebar-visible:before {
   opacity: .3;
 }
`;
export const FederalPageLayout = styled.main`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: calc(${props => props.theme.gridValues.maxContentWidth}px + 11px);
  min-height: calc(100vh - 96px);
  
  ${media.desktop} {
    min-height: calc(100vh - 72px);
  }
  ${media.ld} {
    padding: 0 5px;
  }
  .federal-page {
    &__content {
      ${media.desktop} {
        display: flex;
        margin-bottom: 32px;
        margin-top: 32px;
        flex-direction: column;
      }
      ${media.ld} {
        flex-direction: row;
      }
    }
    &__stations {
      width: 100%;

      ${media.ld} {
        max-width: 730px;
        margin-right: 44px;
      }
    }
    &__aside-content {
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      ${media.desktop} {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
      }
      ${media.ld} {
        display: block;
        width: 305px;
      }
    }
    &__aside {
      padding: 32px 16px 0;
      
      ${media.ld} {
        padding: 0;
        max-width: 305px;
      }
    }

    &__scheme-section {
      margin-bottom: 16px;
    }
    &__sub-scheme-section {
      margin-bottom: 40px;
      & > * {
        margin-bottom: 16px;
      }
      ${media.ld} {
        margin-bottom: 0;
      } 
    }
  }

  .simplebar-scrollbar.simplebar-visible:before {
   opacity: .3;
 }
  .adBox {
    display: flex;
    justify-content: center;
  }
`;
export const ErrorPageLayout = styled.main`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: calc(${props => props.theme.gridValues.maxContentWidth}px + 11px);
  min-height: calc(100vh - 152px);
  
  ${media.desktop} {
    padding: 0 5px;
    min-height: calc(100vh - 146px);
  }
  .ff-page {
    &__title {
      margin: 100px auto 0;
      text-transform: uppercase;
      ${props => props.theme.typography.fnTitle1};
      ${props => props.theme.typography.fnMedium};
      color: ${props => props.theme.colorValues.grey};
    }
    &__sub-title {
      margin: 30px auto;
      color: ${props => props.theme.colorValues.lightergrey};
      ${props => props.theme.typography.fnCaption3};
      & > span {
        color: ${props => props.theme.colorValues.primary};
      }
    }
    &__button {
      margin: 0 auto;
      cursor: pointer;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
    }
  }
`;