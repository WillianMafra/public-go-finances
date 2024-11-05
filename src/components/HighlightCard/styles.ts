import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

interface TypeProps {
    type: 'up' | 'down' | 'total';
}

interface AmountProps extends TypeProps {
    isNegative: boolean;
}

export const Container = styled.View<TypeProps>`
    background-color: ${({ theme, type }) =>
        type === 'total' ? theme.colors.secondary : theme.colors.shape};
    width: ${RFValue(250)}px;
    border-radius: 5px;

    height: 200px;
    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;

    margin-right: 16px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
export const Icon = styled(Feather)<TypeProps>`
    font-size: ${RFValue(40)}px;

    ${({type}) => type === 'up' && css`
        color: ${({theme}) => theme.colors.success};
    `};

    ${({type}) => type === 'down' && css`
        color: ${({theme}) => theme.colors.error};
    `};

    ${({type}) => type === 'total' && css`
        color: ${({theme}) => theme.colors.shape};
    `};

`;

export const Footer = styled.View`

`;

export const Title = styled.Text<TypeProps>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    color: ${({theme, type}) =>
        type === 'total' ? theme.colors.shape : theme.colors.text_dark};

`;
export const Amount = styled.Text<AmountProps>`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(28)}px;

    color: ${({theme, type, isNegative}) =>
        type === 'total' && isNegative ? theme.colors.error : 
        type === 'total' ? theme.colors.shape : 
        theme.colors.text_dark};

    margin-top: 32px;
`;
export const LastTransaction = styled.Text<TypeProps>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;

    color: ${({theme, type}) =>
        type === 'total' ? theme.colors.shape : theme.colors.text};
`;

