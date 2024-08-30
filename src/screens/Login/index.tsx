import React from "react";

import AppleSvg from '@/src/assets/apple-icon.svg'
import GoogleSvg from '@/src/assets/google-icon.svg'
import LogoSvg from '@/src/assets/logo.svg'

import { 
    Container,
    Header,
    TitleWrapper,
    AppName,
    Title,
    LoginTitle,
    Footer,
    FooterWrapper,

 } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { SocialLoginButton } from "@/src/components/SocialLoginButton";
import { useAuth } from "@/src/hooks/auth";

export function Login(){
    const {signIn} = useAuth();


    async function handleSignInWithGoogle() {
        try {
            await signIn();
        } catch (error) {
            console.error("Erro ao fazer login com Google", error);
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg width={RFValue(120)} height={RFValue(68)} />
                    <AppName>gofinances</AppName>
                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                    	muito simples
                    </Title>
                </TitleWrapper>

                <LoginTitle>
                    Faça login abaixo com {'\n'}
                    sua conta Google 
                </LoginTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SocialLoginButton 
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />                 
                </FooterWrapper>
            </Footer>
        </Container>
    )
}