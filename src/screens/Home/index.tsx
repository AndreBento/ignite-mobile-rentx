import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, Button } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../database'
import { api } from '../../services/api';

import Logo from '../../assets/logo.svg';

import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

export function Home() {
    const [cars, setCars] = useState<CarDTO>([]);
    const [loading, setLoading] = useState(true);

    const netInfo = useNetInfo();
    const navigation = useNavigation();

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car });
    }

    async function offlineSynchronize() {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

                const { changes, latestVersion } = response.data;

                console.log("BACKEND PARA APP");
                console.log(changes);

                return { changes, timestamp: latestVersion }
            },
            pushChanges: async ({ changes }) => {
                const user = changes.user;
                await api.post(`/users/sync`, user);

                console.log("APP PARA BACKEND");
                console.log(changes);
            },
        });
    }

    useEffect(() => {
        let isMounted = true;

        async function fetchCars() {
            try {
                const response = await api.get('/cars');
                if (isMounted) {
                    setCars(response.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchCars();
        return () => {
            isMounted = false;
        };
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

            <Button title="Sincronizar" onPress={offlineSynchronize} />

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
        </Container>
    );
}
