import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { DataListProps } from ".";
import { FlatList, FlatListProps } from "react-native";
import { BorderlessButton} from 'react-native-gesture-handler';

// Defina uma interface que estende FlatListProps e inclui a propriedade adicional
interface ExtendedFlatListProps extends FlatListProps<DataListProps> {
    showsVerticalScrollIndicator?: boolean;
  }

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;

    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.primary};
`;


export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;

    margin-top: ${RFValue(48)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Photo = styled.Image`
    width: ${RFValue(55)}px;
    height: ${RFValue(55)}px;
    border-radius: 10px;
`;
export const User = styled.View`
    margin-left: 17px;
`;
export const UserGreeting = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.background};
    font-size: ${RFValue(18)}px;
`;
export const UserName = styled.Text`
    font-family: ${({ theme}) => theme.fonts.bold };
    font-size: ${RFValue(18)}px;
    color: ${({ theme}) => theme.colors.background };
`;

export const LogoutButton = styled(BorderlessButton)``;

export const EyeButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.error};
    font-size: ${ RFValue(25)}px;
`;

export const EyeIcon = styled(Feather)`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${ RFValue(25)}px;
    margin-right:${ RFValue(28)}px;
`;

export const Transactions = styled.View`
    flex: 1;
    padding: 0 24px;
    margin-top: ${RFPercentage(8)}px;

`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    margin-bottom: 16px;
    font-family: ${({ theme}) => theme.fonts.regular };
`;

// Use a interface estendida para estilizar o componente
export const TransactionList = styled(
    FlatList as new () => FlatList<DataListProps>
  ).attrs<ExtendedFlatListProps>({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      paddingBottom: RFPercentage(5),
    },
  })``;

export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator:false,
    contentContainerStyle:{
        paddingLeft: 24
    }
})
`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;`;
 
export const LoadContainer = styled.View`
    flex: 100%;
    justify-content: center;
    align-items: center;
`;

export const HeaderButtonContainer = styled.View`
    display: flex;
    justify-content: left;
    flex-direction: row;
`