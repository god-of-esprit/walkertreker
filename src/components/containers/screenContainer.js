import React from 'react';
import styled from 'styled-components/native';

//////////////////////////////////////
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const widthUnit = wp('1%');
const heightUnit = hp('1%');
/////////////////////////////////////

const StyledScreenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  margin: ${widthUnit*5}px;
  margin-top: ${heightUnit*7}px;
`;

function ScreenContainer(props) {
  return (
    <StyledScreenContainer>props.children</StyledScreenContainer>
  )
}

export default ScreenContainer
