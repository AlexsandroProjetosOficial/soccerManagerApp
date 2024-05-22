import '@/styles/global.css';
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Rajdhani_700Bold, Rajdhani_400Regular, Rajdhani_500Medium } from '@expo-google-fonts/rajdhani';
import Loading from '@/components/Loading';
import { ToastProvider } from '@/components/Toast';
import React from 'react';
import { AuthContextProvider } from '../context/AuthContext';

export default function Layout() {
	const [fontsLoaded] = useFonts({
		Rajdhani_700Bold,
		Rajdhani_400Regular,
		Rajdhani_500Medium,
		DigitalBold: require('../../assets/fonts/FontsFree-Net-DS-DIGIB-2.ttf')
	});

	if (!fontsLoaded) {
		return <Loading />
	}

	return (
		<ToastProvider position='top'>
			<AuthContextProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<StatusBar style='light' backgroundColor='#1D521F' />
					<Slot />
				</GestureHandlerRootView>
			</AuthContextProvider>
		</ToastProvider>
	)
}