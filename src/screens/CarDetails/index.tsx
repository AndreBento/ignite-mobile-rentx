import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import speedSVG from '../../assets/speed.svg';
import accelerationSVG from '../../assets/acceleration.svg';
import forceSVG from '../../assets/force.svg';
import gasolineSVG from '../../assets/gasoline.svg';
import exchangeSVG from '../../assets/exchange.svg';
import peopleSVG from '../../assets/people.svg';

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Acessories,
    Footer,
} from './styles';

export function CarDetails() {
    const navigation = useNavigation();

    function handleConfirmRental() {
        navigation.navigate('Scheduling');
    }
    return (
        <Container>
            <Header>
                <BackButton onPress={() => {}} />
            </Header>

            <CarImages>
                <ImageSlider
                    imagesUrl={[
                        'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
                    ]}
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>

                <Acessories>
                    <Accessory name="380Km/h" icon={speedSVG} />
                    <Accessory name="3.2s" icon={accelerationSVG} />
                    <Accessory name="800 HP" icon={forceSVG} />
                    <Accessory name="gasolina" icon={gasolineSVG} />
                    <Accessory name="Auto" icon={exchangeSVG} />
                    <Accessory name="2 pessoas" icon={peopleSVG} />
                </Acessories>

                <About>
                    Este é automóvel desportivo. Surgiu do lendário touro de
                    lide indultado na praça Real Maestranza de Sevilla. É um
                    belíssimo carro para quem gosta de acelerar.
                </About>
            </Content>

            <Footer>
                <Button
                    title="Escolher período do aluguel"
                    onPress={handleConfirmRental}
                />
            </Footer>
        </Container>
    );
}
