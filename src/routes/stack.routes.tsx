import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDatails } from '../screens/SchedulingDatails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
    return (
        <Navigator headerMode="none" initialRouteName="Splash">
            <Screen name="Splash" component={Splash} />
            <Screen
                name="Home"
                component={Home}
                options={{
                    gestureEnabled: false,
                }}
            />
            <Screen name="CarDetails" component={CarDetails} />
            <Screen name="Scheduling" component={Scheduling} />
            <Screen name="SchedulingDatails" component={SchedulingDatails} />
            <Screen name="SchedulingComplete" component={SchedulingComplete} />
            <Screen name="MyCars" component={MyCars} />
        </Navigator>
    );
}
