import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.primary};

    width: 100%;
    height: ${RFValue(113)}px;

    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;
export const Title = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};

    font-size: ${RFValue(18)}px;
`;

export const Form = styled.View`
    flex: 80%;
    width: 100%;
    padding: 24px;
    justify-content: space-between;
`

export const Fields = styled.View`

`;
export const TransactionTypes = styled.View`
    flex-direction: row;
    justify-content: space-between;

    margin-top: 8px;
    margin-bottom: 8px;
`;