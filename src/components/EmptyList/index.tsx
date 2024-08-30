import React from "react";
import {
    Container,
    Text,
} from './styles'

export function EmptyList(){
    return (
        <Container>
            <Text>
                Não há registros cadastrados ainda.
            </Text>
        </Container>
    )
}