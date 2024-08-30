import React, {useEffect, useState} from "react";
import { 
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    Alert,
 } from "react-native";

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from "react-hook-form";
import uuid from 'react-native-uuid';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
 } from "./styles";
import { Button } from "@/src/components/forms/Button";
import { TransactionTypeButton } from "@/src/components/forms/TransactionTypeButton";
import { CategorySelectButton } from "@/src/components/forms/CategorySelectButton";
import { InputForm } from "@/src/components/forms/InputForm";
import { CategorySelect } from "../CategorySelect";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/src/hooks/auth";

interface FormData {
    name: string;
    amount: number;
}

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('O campo Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor númerico')
        .positive('O campo Preço não pode ser negativo')
})

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const {user} = useAuth();

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );
    function handleTransactionTypeSelect(type: 'positive' | 'negative'){
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal(){
        setShowCategoryModal(true);
    }

    function handleCloseSelectCategoryModal(){
        setShowCategoryModal(false);
    }

    async function handleSubmitButtonPress(form: FormData){
        if(!transactionType) return Alert.alert('Selecione o tipo de transação');

        if(category.key === 'category') return Alert.alert('Selecione uma categoria'); 

        const newTransaction = {
            id: String(uuid.v4()),
            user_id: user?.id,
            name: form.name,
            amount: form.amount,
            category: category.key,
            type: transactionType,
            date: new Date()
        }

        try {
            // Salva o data no async storage
            const dataKey = '@gofinances:transactions_user:'+user?.id;
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const formattedData = [
                ...currentData,
                newTransaction
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));


            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria',
            });
            reset();
            navigation.navigate('Listagem');

        } catch (error) {
            Alert.alert('Não foi possível salvar');
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header> 
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            autoFocus={true}    
                            error={errors.name && errors.name.message}
                        />
                        <InputForm 
                            name="amount" 
                            control={control} 
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionTypes >
                            <TransactionTypeButton 
                                onPress={() => handleTransactionTypeSelect('positive')}
                                type="up"
                                title="entrada"
                                isActive={transactionType === 'positive'}
                            />
                            <TransactionTypeButton 
                                onPress={() => handleTransactionTypeSelect('negative')}
                                type="down"
                                title="saída"
                                isActive={transactionType === 'negative'}
                            />
                        </TransactionTypes>
                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>

                    <Button 
                        title="Enviar" 
                        onPress={handleSubmit(handleSubmitButtonPress)}
                    />
                </Form>

                <Modal visible={showCategoryModal}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}   
                    ></CategorySelect>
                </Modal>
            </Container>
        </TouchableWithoutFeedback>

    )
}