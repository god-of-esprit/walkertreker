import React from 'react';
import styled, { css } from 'styled-components/native';

//////////////////////////////////////
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const widthUnit = wp('1%');
const heightUnit = hp('1%');
/////////////////////////////////////


function SubHeader(props) {
  const StyledText = styled.Text`
  font-family: gore;
  font-size: ${widthUnit*8};
  

  color: ${props => props.color || "white"};

  ${props => props.withShadow && css`
    text-shadow-color: #444;
    text-shadow-offset: 0px 2px;
    text-shadow-radius: 1px;`
  }
  `;
  return (
    <StyledText {...props}>{props.children}</StyledText>
  )
}

export default SubHeader;