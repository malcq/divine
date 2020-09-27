import styled from 'styled-components';

const NetSectionWrapper = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
    .plan-section {
      &__title {
        ${(props) => props.theme.typography.fnMedium}
        ${(props) => props.theme.typography.fnTitle3}
        color: ${(props) => props.theme.colorValues.darkGrey};
        margin-bottom: 12px;
      }
      &__cover-box {
        width: 100%;
        height: 173px;
        border-radius: 8px;
        background-color:  #DFDFDF;
        overflow:hidden;
      }
      &__img { 
        width: 100%;
        height: 100%;
      }
      &__subtitle {
        ${(props) => props.theme.typography.fnText}
        ${(props) => props.theme.typography.fnBody}
        color: ${(props) => props.theme.colorValues.lightgrey};
        margin: 8px 0;
      }
    }
`
export default NetSectionWrapper;