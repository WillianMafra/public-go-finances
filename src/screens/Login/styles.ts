import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
 flex: 1;
`;
export const Header = styled.View`
    width: 100%;
    height: 70%;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: flex-end;
    align-items: center;

`;
export const TitleWrapper = styled.View`
    align-items: center;

`;
export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(20)}px;
    text-align: center;

    margin-top: 45px;
`;
export const LoginTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(16)}px;
    text-align: center;
    
    margin-top: 70px;
    margin-bottom: 50px;
`;
export const Footer = styled.View`
    width: 100%;
    height: 30%;
    background-color: ${({theme}) => theme.colors.secondary};
`;

export const AppName = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.colors.shape};
`
export const FooterWrapper = styled.View`

    margin-top: ${RFPercentage(-4)}px;
    padding: 0 32px;
    justify-content: space-between;
`