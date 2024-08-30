import React from 'react';
import {Platform} from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Resume } from '../screens/Resume';

const Tab = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();
  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text,
          tabBarLabelPosition: 'beside-icon',
          tabBarStyle: {
            height: 75,
            paddingVertical: Platform.OS === 'ios' ? 20 : 0
          }
        }}
      >
        <Tab.Screen 
          name="Listagem"
          component={Dashboard}
          options={{
            tabBarIcon: (({ size, color}) => 
              <MaterialIcons 
                name='format-list-bulleted'
                size={size}
                color={color}
                />
            ) 
          }}
        />
        <Tab.Screen 
          name="Cadastrar"
          component={Register}
          options={{
            tabBarIcon: (({ size, color}) => 
              <MaterialIcons 
                name='attach-money'
                size={size}
                color={color}
                />
            ) 
          }}
        />
        <Tab.Screen 
          name="Gastos"
          component={Resume}
          options={{
            tabBarIcon: (({ size, color}) => 
              <MaterialIcons 
                name='bar-chart'
                size={size}
                color={color}
                />
            ) 
          }}
        />
      </Tab.Navigator>
  );
}
