import { ScrollView, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from 'moment';
import React from 'react';
import ButtonTimerCheck from "@/components/ButtonTimerCheck";
import ButtonTimer from "@/components/ButtonTimer";
import { Button } from "../../components/Button";
import clsx from 'clsx';
import { useRouter } from "expo-router";
import { useToast } from "../../components/Toast";
import { api } from "../../service/api";
import Loading from "../../components/Loading";

interface iHandleRegisterTimer {
	game: string | string[] | undefined;
	half: 'first' | 'second';
	team: 'referee' | 'home' | 'away';
	column: string;
}

interface ITimesGame {
	referee: {
		first: boolean;
		second: boolean;
	},
	home: {
		first: boolean;
		second: boolean;
	},
	away: {
		first: boolean;
		second: boolean;
	}
}

interface IUpdateGame {
	game: string | string[] | undefined;
	column: string;
	value: Date | number | string;
}

export default function GameTimer() {
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingRegisterTime, setIsLoadingRegisterTime] = useState(false);
	const [idSelected, setIdSelected] = useState('');
	const [isFirstHalfCompleted, setIsFirstHalfCompleted] = useState(false);
	const [isSecondHalfCompleted, setIsSecondHalfCompleted] = useState(true);
	const [timeRegistered, setTimeRegistered] = useState<ITimesGame>({} as ITimesGame);
	const params = useLocalSearchParams();
	const router = useRouter();
	const { game } = params;
	const { toast } = useToast();

	const handleRegisterTimer = async ({ game, team, half, column }: iHandleRegisterTimer) => {
		try {
			setIsLoadingRegisterTime(oldState => !oldState);
			setIdSelected(`${half}-${team}`)
			const currentTimer = moment().format('YYYY-MM-DDTHH:mm:ss');

			const data = {
				game,
				column,
				value: currentTimer
			}

			const {
				status,
				data: {
					error,
					message,
					data: {
						timesGame
					}
				}
			} = await api.patch('/game/game', data);

			if (status === 201 && !error) {
				setTimeRegistered(timesGame);
				toast(message, 'success', 4000, 'top');

				if (timesGame.match.first) {
					setIsFirstHalfCompleted(true);
					setIsSecondHalfCompleted(false);
				}

				if (timesGame.match.second) {
					setIsSecondHalfCompleted(true);
				}

				setIsLoadingRegisterTime(oldState => !oldState);
				setIdSelected('');
			}
		} catch (error) {
			toast('Não foi possível registrar o horário.', 'error', 4000, 'top');
		}
	}

	const handleUpdateGame = async ({ game, column, value }: IUpdateGame) => {
		try {
			setIsLoadingRegisterTime(oldState => !oldState);

			const data = {
				game,
				column,
				value
			};

			const {
				status,
				data: {
					error
				}
			} = await api.patch('/game/game', data);

			if (status === 201 && !error) {
				toast('Partida completada com sucesso.', 'success', 4000, 'top');
				setIsLoadingRegisterTime(oldState => !oldState);
				router.push({ pathname: "/Home" })
			}
		} catch (error) {
			toast('Não foi possível registrar horários.', 'error', 4000, 'top');
			setIsLoadingRegisterTime(oldState => !oldState);
		}
	}

	const getTimesGame = useCallback(async () => {
		try {
			setIsLoading(oldState => !oldState);

			const {
				status,
				data: {
					error,
					message,
					data: {
						timesGame
					}
				}
			} = await api.get(`/game/times?game=${game}`);

			if (status === 200 && !error) {
				setTimeRegistered(timesGame);
				toast(message, 'success', 4000, 'top');

				if (timesGame.match.first) {
					setIsFirstHalfCompleted(true);
					setIsSecondHalfCompleted(false);
				}

				if (timesGame.match.second) {
					setIsSecondHalfCompleted(true);
				}

				setIsLoading(oldState => !oldState);
			}
		} catch (error) {
			toast('Horários da partida não encontrado.', 'error', 4000, 'top');
		}
	}, [game]);

	useEffect(() => {
		getTimesGame();
	}, [getTimesGame]);

	return (
		<View className='w-full bg-green-200 flex-1 px-7'>
			{isLoading ? <Loading /> : (
				timeRegistered.hasOwnProperty('referee') ? (
					<ScrollView showsVerticalScrollIndicator={false}>
						<View className={clsx('w-full flex-col mt-5', {
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
												<ButtonTimer
													onPress={() => handleRegisterTimer({ game: game, half: 'first', team: 'referee', column: 'time_match_official_first_half' })}
													disabled={isFirstHalfCompleted ? true : false}
													isLoading={isLoadingRegisterTime}
													id='first-referee'
													idSelected={idSelected}
												/>
											)}
										</View>
										<View className="w-full flex-row justify-between items-center border-b-2 border-green-100 pb-4">
											<Text className="text-gray-100 font-rajdhaniBold text-lg">Entrada equipe mandante</Text>
											{timeRegistered.home.first ? (
												<ButtonTimerCheck />
											) : (
												<ButtonTimer
													onPress={() => handleRegisterTimer({ game: game, half: 'first', team: 'home', column: 'time_team_home_first_half' })}
													disabled={isFirstHalfCompleted ? true : false}
													isLoading={isLoadingRegisterTime}
													id='first-home'
													idSelected={idSelected}
												/>
											)}
										</View>
										<View className="w-full flex-row justify-between items-center border-b-2 border-green-100 pb-4">
											<Text className="text-gray-100 font-rajdhaniBold text-lg">Entrada equipe visitante</Text>
											{timeRegistered.away.first ? (
												<ButtonTimerCheck />
											) : (
												<ButtonTimer
													onPress={() => handleRegisterTimer({ game: game, half: 'first', team: 'away', column: 'time_team_away_first_half' })}
													disabled={isFirstHalfCompleted ? true : false}
													isLoading={isLoadingRegisterTime}
													id='first-away'
													idSelected={idSelected}
												/>
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
												<ButtonTimer
													onPress={() => handleRegisterTimer({ game: game, half: 'second', team: 'referee', column: 'time_match_official_second_half' })}
													disabled={isSecondHalfCompleted ? true : false}
													isLoading={isLoadingRegisterTime}
													id='second-referee'
													idSelected={idSelected}
												/>
											)}
										</View>
										<View className="w-full flex-row justify-between items-center border-b-2 border-green-100 pb-4">
											<Text className="text-gray-100 font-rajdhaniBold text-lg">Entrada equipe mandante</Text>
											{timeRegistered.home.second ? (
												<ButtonTimerCheck />
											) : (
												<ButtonTimer
													onPress={() => handleRegisterTimer({ game: game, half: 'second', team: 'home', column: 'time_team_home_second_half' })}
													disabled={isSecondHalfCompleted ? true : false}
													isLoading={isLoadingRegisterTime}
													id='second-home'
													idSelected={idSelected}
												/>
											)}
										</View>
										<View className="w-full flex-row justify-between items-center border-b-2 border-green-100 pb-4">
											<Text className="text-gray-100 font-rajdhaniBold text-lg">Entrada equipe visitante</Text>
											{timeRegistered.away.second ? (
												<ButtonTimerCheck />
											) : (
												<ButtonTimer
													onPress={() => handleRegisterTimer({ game: game, half: 'second', team: 'away', column: 'time_team_away_second_half' })}
													disabled={isSecondHalfCompleted ? true : false}
													isLoading={isLoadingRegisterTime}
													id='second-away'
													idSelected={idSelected}
												/>
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
							<View className="flex-row h-auto justify-between items-center pb-4">
								<View className='w-full flex-row justify-center mt-1'>
									<Button isPressed={isLoadingRegisterTime} label='Finalizar partida' bgColor='red' onPress={() => handleUpdateGame({ game, column: 'status', value: 'completed' })}/>
								</View>
							</View>
						) : ''}
					</ScrollView>
				) : ''
			)}
		</View>
	)
}