import React from "react";

import styled, { css } from "styled-components/native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const widthUnit = wp("1%");
const heightUnit = hp("1%");

function MainText(props) {
  const StyledText = styled.Text`
  font-family: Gill Sans MT Condensed;
  line-height: ${widthUnit * 7};
  letter-spacing: ${widthUnit * 0.3}
  font-size: ${p =>
    (p.size === "sm" && widthUnit * 4.5) ||
    (p.size === "md" && widthUnit * 6.5) ||
    (p.size === "lg" && widthUnit * 7) ||
    widthUnit * 6};
  letter-spacing: 1.15;
  color: ${p => p.color || "white"};
  font-weight: ${p => p.weight || "normal"};
  `;
  return <StyledText {...props}>{props.children}</StyledText>;
}

export default MainText;
