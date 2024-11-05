import React from "react";
import {
    Container,
    TitleWrapper,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
    RemoveTransactionButton,
    RemoveTransactionIcon
} from './styles'
import { categories } from "@/src/utils/categories";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/src/hooks/auth";


export interface TransactionCardProps {
    id: string;
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface Props {
    data: TransactionCardProps
    showValue: boolean;
}

export function TransactionCard({data, showValue} : Props){
    const [ category ] = categories.filter( 
        item => item.key === data.category
    );
    const {user} = useAuth();

    async function removeTransaction(transactionId: string) {
        try {
            const transactionKey = '@gofinances:transactions_user:' + user?.id;
            const response = await AsyncStorage.getItem(transactionKey);   
            const transactions = response ? JSON.parse(response) : [];
    
            // Filtra a transação que você quer remover
            const updatedTransactions = transactions.filter(
                (transaction: TransactionCardProps) => transaction.id !== transactionId
            );
    
            // Salva a lista atualizada de transações
            await AsyncStorage.setItem(transactionKey, JSON.stringify(updatedTransactions));
        } catch (error) {
            console.error("Erro ao remover a transação: ", error);
        }
    }
    
    return (
        <Container>
            <TitleWrapper>
                <Title>
                    {data.name} 
                </Title>
                <RemoveTransactionButton
                    onPress={() => removeTransaction(data.id)} 
                >
                    <RemoveTransactionIcon name="x-circle"></RemoveTransactionIcon>
                </RemoveTransactionButton>
            </TitleWrapper>
            {showValue && <Amount type={data.type}>
                { data.type === 'negative' && '- '} 
                {data.amount}
            </Amount> }
            <Footer>
                <Category>
                    <Icon name={category.icon}></Icon>
                    <CategoryName>
                        {category.name}
                    </CategoryName>
                </Category>

                <Date>
                    {data.date}
                </Date>
            </Footer>
        </Container>
    )
}