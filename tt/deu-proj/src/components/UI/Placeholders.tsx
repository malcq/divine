import styled from 'styled-components';

export const AdPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: ${props => props.theme.gridValues.maxContentWidth + 1};
  color:  ${props => props.theme.colorValues.black};
  font-size: 15px;
  height: 273px;
  background-color: rgba(255, 0, 0, 0.1);

  .adplaceholder{
    &__ok {
      color: #28a745;
    }
    &__note {
      color: #ffc107;
    }
  }
`;