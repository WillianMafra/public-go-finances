import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";

interface TransactionProps {
    type: 'positive' | 'negative'
}

export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;

    padding: 17px 24px;
    margin-bottom: 14px;
`;

export const TitleWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const RemoveTransactionButton = styled(BorderlessButton)``;

export const Amount = styled.Text<TransactionProps>`
    color: ${({ theme, type}) => 
        type === 'positive' ? theme.colors.success : theme.colors.error
    };
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
    margin: 2px;
`;
export const Footer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 19px;
`;
export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.text};
`;
export const CategoryName = styled.Text`
    margin-left: 17px;
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.regular};
`;
export const Date = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text};
`;

export const RemoveTransactionIcon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.error};
`