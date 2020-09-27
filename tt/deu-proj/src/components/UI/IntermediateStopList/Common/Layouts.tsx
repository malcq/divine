import styled from 'styled-components';

type Props = {
}

export const StopItemLayout = styled.li<Props>`
  display: flex;
  align-items: stretch;


  .immediate-stop {
    &__bar {
      width: 32px;
      position: relative;
      flex-shrink: 0;
    }

    &__content {
      margin-left: 16px;
      flex-grow: 1;
      margin-bottom: 16px;
    }
  }
  
`;