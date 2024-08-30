import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, {css} from "styled-components/native";

interface IconsProps {
    type: 'up' | 'down'
}

interface ButtonProps {
    isActive: boolean,
    type: 'up' | 'down'
}

export const Container = styled(RectButton)<ButtonProps>`
    width: 48%;
    flex-direction: row;
    align-items: center;

    border-width: ${({ isActive }) => isActive ? 1.5 : 0.5}px;
    border-style: solid;
    border-color: ${({theme}) => theme.colors.text};
    border-radius: 5px;
    padding: 16px;
    justify-content: center;


    ${({isActive,  type}) => 
        isActive  && type === 'up' && css`
        background-color: ${({theme}) => theme.colors.success_light};
    `};

    ${({isActive,  type}) => 
        isActive  && type === 'down' && css`
        background-color: ${({theme}) => theme.colors.error_light};
    `};

`;

export const Icon = styled(Feather)<IconsProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${({type, theme,}) => 
        type === 'up' ? theme.colors.success : theme.colors.error
    };
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};

`;
