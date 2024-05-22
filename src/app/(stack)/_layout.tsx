import { Stack } from "expo-router";
import Header from "../../components/Header";
import { colors } from "../../styles/colors";
import HeaderPages from "../../components/HeaderPages";
import React from "react";
import HeaderPagesGame from "../../components/HeaderPagesGame";

export default function StackLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
					statusBarColor: '#1D521F',
					statusBarTranslucent: true
				}}
			/>
			<Stack.Screen
				name="Home"
				options={{
					statusBarColor: '#061C06',
					navigationBarColor: colors.green[400],
					header: (_props) => {
						return (
							<Header />
						)
					}
				}}
			/>
			<Stack.Screen
				name="Timer"
				options={{
					statusBarColor: '#061C06',
					headerTitle: 'Chegada Arbitragem',
					header: (props) => {
						return (
							<HeaderPages {...props} />
						)
					}
				}}
			/>
			<Stack.Screen
				name="GameTimer"
				options={{
					statusBarColor: '#061C06',
					headerTitle: 'O jogo - registro tempo',
					header: (props) => {
						return (
							<HeaderPages {...props} />
						)
					}
				}}
			/>
			<Stack.Screen
				name="Summary"
				options={{
					statusBarColor: '#061C06',
					headerTitle: 'A Sumula',
					header: (props) => {
						return (
							<HeaderPages {...props} />
						)
					}
				}}
			/>
			<Stack.Screen
				name="Game"
				options={{
					statusBarColor: '#061C06',
					headerTitle: 'O jogo',
					header: (props) => {
						return (
							<HeaderPagesGame {...props} />
						)
					}
				}}
			/>
		</Stack>
	)
}