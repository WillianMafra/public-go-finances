import React, { useCallback, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {VictoryPie} from 'victory-native'
import {addMonths, subMonths, format} from 'date-fns';
import { ptBR } from 'date-fns/locale'

import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month
} from './styles'
import { HistoryCard } from '@/src/components/HistoryCard'
import { categories } from '@/src/utils/categories';
import { RFValue } from 'react-native-responsive-fontsize'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@/src/hooks/auth';
import { EmptyList } from '@/src/components/EmptyList';

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    formattedTotal: string;
    total: number;
    color: string;
    percent: string;
}

export function Resume() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
    const {user} = useAuth();

    function handleMonthChange(action: 'next' | 'previous'){
        if(action === 'next'){
            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    async function loadData() {
        const dataKey = '@gofinances:transactions_user:'+user?.id;
        const response = await AsyncStorage.getItem(dataKey);
        const formattedResponse = response ? JSON.parse(response) : [];

        const expenses = formattedResponse.filter( (expense : TransactionData) => 
            expense.type === 'negative' &&
            new Date(expense.date).getMonth() == selectedDate.getMonth() &&
            new Date(expense.date).getFullYear() == selectedDate.getFullYear()
    );

        const totalExpenses = expenses.reduce((acumullator : number , expensive: TransactionData ) => {
            return acumullator + Number(expensive.amount);
        },0)


        const totalByCategory : CategoryData[] = [];
        categories.forEach(category => {
            let categorySum = 0;
            
            expenses.forEach((expense : TransactionData) => {
                if(expense.category === category.key){
                    categorySum += Number(expense.amount)
                }
            });

            if(categorySum > 0){
                const total = categorySum.toLocaleString('pt-BR', {
                    currency: 'BRL',
                    style: 'currency'
                });

                const percent = `${(categorySum / totalExpenses * 100).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total: categorySum,
                    formattedTotal: total,
                    color: category.color,
                    percent: percent
                });    
            }
        });
        setTotalByCategories(totalByCategory);
    }

    useFocusEffect( useCallback(() => {
        loadData();
    }, [selectedDate]));

    return (
        <Container>
            <Header>
                <Title>Gastos por categoria</Title>
            </Header>
            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ 
                    paddingHorizontal: 24,
                    paddingBottom: useBottomTabBarHeight()
                 }}
            >
                <MonthSelect>
                    <MonthSelectButton
                        onPress={() => handleMonthChange('previous')}
                    >
                        <MonthSelectIcon name='chevron-left' />
                    </MonthSelectButton>

                    <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

                    <MonthSelectButton
                        onPress={() => handleMonthChange('next')}
                    >
                        <MonthSelectIcon name='chevron-right' />
                    </MonthSelectButton>
                </MonthSelect>

                <ChartContainer>
                
                    <VictoryPie 
                        data={totalByCategories}
                        colorScale={totalByCategories.map(category => category.color)}
                        style={{
                            labels: {
                                fontSize: RFValue(18),
                                fontWeight: "bold",
                                fill: 'white'
                            }
                        }}
                        labelRadius={50}
                        x="percent"
                        y="total" 
                    />
                    { totalByCategories.length == 0 && <EmptyList />}
                </ChartContainer>
                {
                    totalByCategories.map(item => (
                        <HistoryCard 
                            key={item.key}
                            title={item.name}
                            amount={item.formattedTotal}
                            color={item.color}
                        />
                    ))
                }
            </Content>
        </Container>
    )
}