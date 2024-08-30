
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    align-items: center;

`;

export const Text = styled.Text`
    font-size: ${RFValue(13)}px;
    font-family: ${({theme}) => theme.fonts.regular};
`;