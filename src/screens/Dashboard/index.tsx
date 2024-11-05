import React, { useCallback, useEffect, useState } from "react";

import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    Icon,
    UserName,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
    LoadContainer,
    HeaderButtonContainer,
    EyeButton,
    EyeIcon,

} from "./styles";

import { HighlightCard } from "@/src/components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "@/src/components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useAuth } from "@/src/hooks/auth";
import { EmptyList } from "@/src/components/EmptyList";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}
interface HighlightData {
    entries: HighlightProps;
    expenses: HighlightProps;
    total: HighlightProps;
}

export function Dashboard(){
    const { user, logout } = useAuth();
    const userName = user?.name.split(' ')[0];
    const transactionKey = '@gofinances:transactions_user:'+user?.id;
    const [isLoaded, setIsLoaded] = useState(false);
    const [showValue, setShowValue] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'positive' | 'negative'
    ) {
        const filteredTransactions = collection.filter(transaction => transaction.type === type);
    
        if (filteredTransactions.length === 0) {
            return false;
        }
    
        const lastTransaction = Math.max.apply(Math, filteredTransactions.map(transaction => new Date(transaction.date).getTime()));
   
        const lastTransactionDate = new Date(lastTransaction);
        return `${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleString('pt-BR', { month: 'long' })}`;
    }
    
    function handleEyeButtonPress(){
        setShowValue(!showValue);
    }

    async function loadTrasanctions() {
        const response = await AsyncStorage.getItem(transactionKey);   
        const transactions = response ? JSON.parse(response) : [];
        let entriesSum = 0;
        let expensesSum = 0; 

        const formattedTrasactions: DataListProps[] = transactions.map((item: DataListProps) => {
            if(item.type === 'positive'){
                entriesSum += Number(item.amount);
            } else {
                expensesSum += Number(item.amount);
            }

            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL' 
            }); 
            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: "2-digit",
                year: '2-digit'
            }).format(new Date(item.date));
            return {
                id: item.id, 
                name: item.name, 
                amount: amount,
                date: date,
                type: item.type,
                category: item.category,
            }
        });
        setTransactions(formattedTrasactions);
        
        const lastEntryTrasaction = getLastTransactionDate(transactions, 'positive');
        const lastExpenseTrasaction = getLastTransactionDate(transactions, 'negative');
        const date = new Date();
        const highlightCardInterval = lastExpenseTrasaction ? `01 à ${lastExpenseTrasaction}` : `01 à ${
            Intl.DateTimeFormat('pt-BR', {
                day: "2-digit"
            }).format(date)
        } de ${
            Intl.DateTimeFormat('pt-BR', {
                month: "long"
            }).format(date)
        }`;

        const total = entriesSum - expensesSum; 
        setHighlightData({
            entries: {
                amount: entriesSum.toLocaleString('pt-BR', {
                    style: "currency",
                    currency: 'BRL'
                }),
                lastTransaction: lastEntryTrasaction ? `Última entrada dia ${lastEntryTrasaction}` : 'Sem registro'
            },
            expenses: {
                amount: expensesSum.toLocaleString('pt-BR', {
                    style: "currency",
                    currency: 'BRL'
                }),
                lastTransaction: lastExpenseTrasaction ? `Última saída dia ${lastExpenseTrasaction}` : 'Sem registro'
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: highlightCardInterval
            }
        });

        // Seta como carregado
        setIsLoaded(true);
    }

    useEffect(() => { 
        loadTrasanctions();
    }, [])
 
    useFocusEffect(useCallback(() => {
        loadTrasanctions();
    }, [transactions])); 

    return (
        <Container>
            {
                !isLoaded ? <LoadContainer><ActivityIndicator color='green' /></LoadContainer> : 
             <>
                <Header>
                    <UserWrapper>
                        <UserInfo>
                            <Photo 
                            source={{ uri: user?.photo }}
                            />
                            <User>
                                <UserGreeting>Olá,</UserGreeting>
                                <UserName>{userName}</UserName>
                            </User>
                        </UserInfo>
                        <HeaderButtonContainer>
                            <EyeButton onPress={handleEyeButtonPress}>
                                <EyeIcon name={showValue ? 'eye-off' : 'eye'} ></EyeIcon>
                            </EyeButton>
                            <LogoutButton onPress={logout}>
                                <Icon name="power"></Icon>
                            </LogoutButton>
                        </HeaderButtonContainer>
                    </UserWrapper>
                </Header>

                <HighlightCards>
                    <HighlightCard  
                        title="Total"
                        amount={highlightData.total && showValue ? highlightData.total.amount : 'R$ .....'}
                        lastTransaction={highlightData.total && showValue ? highlightData.total.lastTransaction : ''}
                        type="total"
                    ></HighlightCard>
                    <HighlightCard 
                        title="Entradas"
                        amount={highlightData.entries && showValue ? highlightData.entries.amount : 'R$ .....'}
                        lastTransaction={highlightData.entries && showValue ? highlightData.entries.lastTransaction : ''}
                        type="up"
                    ></HighlightCard>
                    <HighlightCard 
                        title="Saídas"
                        amount={highlightData.expenses && showValue ? highlightData.expenses.amount : 'R$ .....'}
                        lastTransaction={highlightData.expenses && showValue ? highlightData.expenses.lastTransaction : ''}
                        type="down"
                    ></HighlightCard>
                </HighlightCards>

                <Transactions>
                    <Title>Listagem</Title>
                     <TransactionList 
                        data={transactions}
                        keyExtractor={item => item.id} 
                        renderItem={({ item }) => <TransactionCard showValue={showValue} data={item} />}
                        ListEmptyComponent={<EmptyList/>}
                    />                

                </Transactions>
                </>
            }
        </Container>
    )
}