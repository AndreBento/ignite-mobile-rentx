import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring,
} from 'react-native-reanimated';

import Logo from '../../assets/logo.svg';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
    const [cars, setCars] = useState<CarDTO>([]);
    const [loading, setLoading] = useState(true);

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value },
            ],
        };
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.positionsX = positionX.value;
            ctx.positionsY = positionY.value;
        },
        onActive(event, ctx: any) {
            positionX.value = ctx.positionsX + event.translationX;
            positionY.value = ctx.positionsY + event.translationY;
        },
        onEnd() {
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        },
    });

    const navigation = useNavigation();
    const theme = useTheme();

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car });
    }

    function handleOpenMyCars() {
        navigation.navigate('MyCars');
    }

    useEffect(() => {
        async function fetcCars() {
            try {
                const response = await api.get('/cars');
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetcCars();
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
    }, []);

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo width={RFValue(108)} height={RFValue(12)} />
                    {!loading && (
                        <TotalCars>
                            Total de {cars.length} carro
                            {cars.length === 1 ? '' : 's'}
                        </TotalCars>
                    )}
                </HeaderContent>
            </Header>
            {loading ? (
                <LoadAnimation />
            ) : (
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Car
                            data={item}
                            onPress={() => handleCarDetails(item)}
                        />
                    )}
                />
            )}

            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22,
                        },
                    ]}
                >
                    <ButtonAnimated
                        onPress={handleOpenMyCars}
                        style={[
                            styles.button,
                            { backgroundColor: theme.colors.main },
                        ]}
                    >
                        <Ionicons
                            name="ios-car-sport"
                            size={32}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
}
const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
