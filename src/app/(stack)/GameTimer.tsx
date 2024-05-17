import { Text, View } from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from 'moment';
import React from 'react';
import ButtonTimerCheck from "@/components/ButtonTimerCheck";
import ButtonTimer from "@/components/ButtonTimer";
import { Button } from "../../components/Button";
import clsx from 'clsx';
import { useRouter } from "expo-router";

interface iHandleRegisterTimer {
	gameId: string | string[] | undefined;
	half: 'first' | 'second';
	team: 'referee' | 'home' | 'away';
}

export default function GameTimer() {
	const [isFirstHalfCompleted, setIsFirstHalfConpleted] = useState(false);
	const [isSecondHalfCompleted, setIsSecondHalfCompleted] = useState(true);
	const [timeRegistered, setTimeRegistered] = useState({
		referee: {
			first: false,
			second: false
		},
		home: {
			first: false,
			second: false
		},
		away: {
			first: false,
			second: false
		}
	});
	const params = useLocalSearchParams();
	const { game } = params;
	const router = useRouter();

	const handleRegisterTimer = async ({ gameId, team, half }: iHandleRegisterTimer) => {
		console.log(gameId, team, half);
		const currentTimer = moment().format('YYYY-MM-DDTHH:mm:ss');
		const timeRegisteredCurrent = { ...timeRegistered };

		console.log(currentTimer);

		timeRegisteredCurrent[team][half] = true

		setTimeRegistered(timeRegisteredCurrent);
	}
	
	return (
		<View className='w-full bg-green-200 flex-1 px-7'>
			<View className={clsx('w-full flex-col mt-1', {
				'opacity-20': isFirstHalfCompleted,
			})}>
				<Text className="text-gray-100 font-rajdhaniBold text-lg">1º tempo</Text>
				<View className="flex-row h-auto justify-between items-center">
					<View className="w-full flex-1 flex-row justify-between items-center pb-2">
						<View className="flex-col gap-6">
							<View className="w-full flex-row justify-between items-center border-b-2 border-green-100 pb-4">
								<Text className="text-gray-100 font-rajdhaniBold text-lg">Entrada Arbitragem</Text>
								{timeRegistered.referee.first ? (
									<ButtonTimerCheck />
								) : (
									<ButtonTimer onPress={() => handleRegisterTimer({ gameId: game, half: 'first', team: 'referee' })} disabled={isFirstHalfCompleted ? true : false} />
								)}
							</View>
							<View className="w-full flex-row justify-between items-center border-b-2 border-green-100 pb-4">
								<Text className="text-gray-100 font-rajdhaniBold text-lg">Entrada equipe mandante</Text>
								{timeRegistered.home.first ? (
									<ButtonTimerCheck />
								) : (
									<ButtonTimer onPress={() => handleRegisterTimer({ gameId: game, half: 'first', team: 'home' })} disabled={isFirstHalfCompleted ? true : false} />
								)}
							</View>
							<View className="w-full flex-row justify-between items-center border-b-2 border-green-100 pb-4">
								<Text className="text-gray-100 font-rajdhaniBold text-lg">Entrada equipe visitante</Text>
								{timeRegistered.away.first ? (
									<ButtonTimerCheck />
								) : (
									<ButtonTimer onPress={() => handleRegisterTimer({ gameId: game, half: 'first', team: 'away' })} disabled={isFirstHalfCompleted ? true : false} />
								)}
							</View>
							<View className='w-full flex-row justify-center mt-1'>
								<Button
									label='Iniciar 1º tempo'
									bgColor='red'
									disabled={(isFirstHalfCompleted || (!timeRegistered.referee.first || !timeRegistered.home.first || !timeRegistered.away.first)) ? true : false}
									onPress={() => router.push({ pathname: "/Game", params: { game: game, half: 'firstHalf' } })}
								/>
							</View>
						</View>
					</View>
				</View>
			</View>
			<View className={clsx('w-full flex-col mt-1', {
				'opacity-20': isSecondHalfCompleted,
			})}>
				<Text className="text-gray-100 font-rajdhaniBold text-lg">2º tempo</Text>
				<View className="flex-row h-auto justify-between items-center">
					<View className="w-full flex-1 flex-row justify-between items-center pb-2">
						<View className="flex-col gap-6">
							<View className="w-full flex-row justify-between items-center border-b-2 border-green-100 pb-4">
								<Text className="text-gray-100 font-rajdhaniBold text-lg">Entrada Arbitragem</Text>
								{timeRegistered.referee.second ? (
									<ButtonTimerCheck />
								) : (
									<ButtonTimer onPress={() => handleRegisterTimer({ gameId: game, half: 'second', team: 'referee' })} disabled={isSecondHalfCompleted ? true : false} />
								)}
							</View>
							<View className="w-full flex-row justify-between items-center border-b-2 border-green-100 pb-4">
								<Text className="text-gray-100 font-rajdhaniBold text-lg">Entrada equipe mandante</Text>
								{timeRegistered.home.second ? (
									<ButtonTimerCheck />
								) : (
									<ButtonTimer onPress={() => handleRegisterTimer({ gameId: game, half: 'second', team: 'home' })} disabled={isSecondHalfCompleted ? true : false} />
								)}
							</View>
							<View className="w-full flex-row justify-between items-center border-b-2 border-green-100 pb-4">
								<Text className="text-gray-100 font-rajdhaniBold text-lg">Entrada equipe visitante</Text>
								{timeRegistered.away.second ? (
									<ButtonTimerCheck />
								) : (
									<ButtonTimer onPress={() => handleRegisterTimer({ gameId: game, half: 'second', team: 'away' })} disabled={isSecondHalfCompleted ? true : false} />
								)}
							</View>
							<View className='w-full flex-row justify-center mt-1'>
								<Button
									label='Iniciar 2º tempo'
									bgColor='red'
									disabled={(isSecondHalfCompleted || (!timeRegistered.referee.second || !timeRegistered.home.second || !timeRegistered.away.second)) ? true : false}
									onPress={() => router.push({ pathname: "/Game", params: { game: game, half: 'secondHalf' } })}
								/>
							</View>
						</View>
					</View>
				</View>
			</View>
			{isFirstHalfCompleted && isSecondHalfCompleted ? (
				<View className="flex-row h-auto justify-between items-center">
					<View className='w-full flex-row justify-center mt-1'>
						<Button label='Finalizar partida' bgColor='red' />
					</View>
				</View>
			) : ''}
		</View>
	)
}