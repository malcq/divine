import { normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';
import media from '../utils/media';

const GlobalStyle = createGlobalStyle`

  ${normalize};

  /** Main resets and styles */
  html,
  body,
  body > #__next {
    height: 100%;
    width: 100%;
  }
  body {
    background-color: ${props => props.theme.bgColor};
    ${props => props.theme.typography.fnText};
    ${props => props.theme.typography.fnBody};
    color: ${props => props.theme.fontColor};
  }

  html {
    box-sizing: border-box;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  p {
    margin: 0;
    padding: 0;
  }

  ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  input {
    border: none;
  }

  select {
    background-color: white;
    padding: 0;
    margin: 0;
    border: none;
  }

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
      outline: none;
  }

  button,
  input[type="submit"] {
    text-transform: none;
    background: none;
    color: inherit;
    border: none;
    margin: 0;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  ::placeholder {
    color: ${props => props.theme.colorValues.lightergrey};
  }

  /** End main resets and styles */


  /** Modals styles  */

  .places-search-modal {
    &__overlay {
      z-index: ${props => props.theme.zIndex.autocompleteModal};
      width: 100%;
      height: 100%;
      background-color: ${props => props.theme.colorValues.white};
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    &__content {
      width: 100%;
      height: 100%;
    }

    &__body--open {
      overflow: hidden;
    }
  }


  .ReactModal {
    &__Overlay {
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
      &--after-open{
          opacity: 1;
      }
  
      &--before-close{
          opacity: 0;
      }
    }
  }

  .modal-transition-enter {
    opacity: 0;
  }
  .modal-transition-enter-active {
    opacity: 1;
    transition: opacity 200ms;
  }
  .modal-transition-exit {
    opacity: 1;
  }
  .modal-transition-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }


  .base-modal {
    &__overlay {
      overflow-x: hidden;
      overflow-y: auto;
      display: block;
      position: fixed;
      z-index: ${props => props.theme.zIndex.autocompleteModal};
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      outline: 0;
      background-color: rgba(0,0,0,0.2);
      ${media.desktop} {
        padding-right: 15px;
        transition: padding-right 200ms;
      }
    }
    
    &__dialog {
      position: relative;
      max-width: 100%;
      min-height: calc(100% - (48px * 2));
      margin: 48px 0;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100001;
    }
    &__content {
      pointer-events: all;
      position: relative;
      display: flex;
      justify-content: center;
      flex-direction: column;
      border-radius: 2px;
      margin: 0px;
      outline: none;
      background-color: ${props => props.theme.colorValues.white};
      border-radius: 12px;
      box-shadow: rgba(0,0,0,0.16) 0 2px 12px 0;
      padding: 16px;
      z-index: 100002;
    }
  }

  .facilities-modal {
    &__content {
      border-radius: 8px;
    }
  }

  .modal-open { 
    overflow: hidden;
  }

  .modal-open--scroll { 
    overflow: hidden;
    
    ${media.desktop} {
      padding-right: 15px;
    }
  }

  .modal-open--body-overflowing { 
    ${media.desktop} {
      padding-right: 0px;
    }

    .base-modal {
      &__overlay {
        ${media.desktop} {
          padding-right: 0px;
          transition: padding-right 0ms;
        }
      }
    }
  }

  /** End modals styles  */

  
`;

export default GlobalStyle;
