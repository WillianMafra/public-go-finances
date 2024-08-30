import React from "react";
import { 
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
 } from "./styles";
import { FlatList } from "react-native";
import { categories } from "@/src/utils/categories";
import { Button } from "@/src/components/forms/Button";

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

 export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory
 } : Props){

    function handleCategorySelect(category : Category){
        setCategory(category)
    }
    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>

            <FlatList
                data={categories}
                style={{
                    flex: 1,
                    width: '100%'
                }}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => (
                    <Category 
                        onPress={() => handleCategorySelect(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon}></Icon>
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator></Separator>}
            >
            </FlatList>

            <Footer>
                <Button onPress={closeSelectCategory} title="Selecionar"></Button>
            </Footer>
        </Container>
    );
 }