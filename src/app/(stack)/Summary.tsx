import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Avatar from '../../components/Avatar';
import { Button } from '../../components/Button';
import SummaryDetails from '../../components/SummaryDetails';
import { useToast } from '../../components/Toast';
import { api } from '../../service/api';
import { useLocalSearchParams } from 'expo-router';
import Loading from '../../components/Loading';

interface IClubs {
	teamId: string | undefined;
	avatar: string | null;
	name: string | undefined;
	cards: {
		id: string;
		type: 'yellow_card' | 'red_card' | 'goal' | 'substitution';
		playerNumber: number;
		period: string;
		time: string;
		isConfirmed: boolean;
	}[] | undefined,
	goals: {
		id: string;
		playerNumber: number;
		period: string;
		time: string;
		isConfirmed: boolean;
	}[] | undefined,
	substitutions: {
		id: string;
		stop: string;
		playerIn: number;
		playerOut: number | null;
		period: string;
		time: string;
		isConfirmed: boolean;
	}[] | undefined
}

interface IGame {
	home: IClubs;
	away: IClubs;
}

interface IDeleteDetailGame {
	detailGame: string | string[] | undefined;
	game: string | string[] | undefined
}

interface IUpdateGameDetail {
	gameDetail: string | string[] | undefined;
	game: string | string[] | undefined;
	column: string;
	value: string;
}

export default function Summary() {
	const [gameSelected, setGameSelected] = useState<IGame | null>(null);
	const [idSelected, setIdSelected] = useState<string | string[] | undefined>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
	const [isLoadingUpdatedDetails, setIsLoadingUpdatedDetails] = useState<boolean>(false);

	const { toast } = useToast();
	const params = useLocalSearchParams();

	const { game } = params;

	const handleDeleteGameDetails = async ({ detailGame, game }: IDeleteDetailGame) => {
		try {
			setIsLoadingDelete(oldState => !oldState);
			setIdSelected(detailGame);

			const {
				status,
				data: {
					error,
					message,
					data: {
						datailsGame
					}
				}
			} = await api.delete(`/game/details?detailGame=${detailGame}&game=${game}`);

			if (status === 200 && !error) {
				setGameSelected(datailsGame);
				setIdSelected('');
				setIsLoadingDelete(oldState => !oldState);
				toast(message, 'success', 4000, 'top');
			}
		} catch (error) {
			setIsLoadingDelete(oldState => !oldState);
			setIdSelected('');
			toast('Não foi possível apagar o detalhe da partida.', 'error', 4000, 'top');
		}
	}

	const handleUpdateGameDetail = async ({ gameDetail, game, column, value }: IUpdateGameDetail) => {
		try {
			setIsLoadingUpdatedDetails(oldState => !oldState);
			setIdSelected(gameDetail);

			const data = {
				gameDetail,
				game,
				column,
				value
			};

			const {
				status,
				data: {
					error,
					message,
					data: {
						datailsGame
					}
				}
			} = await api.patch('/game/details', data);

			if (status === 200 && !error) {
				setGameSelected(datailsGame);
				setIdSelected('');
				toast(message, 'success', 4000, 'top');
				setIsLoadingUpdatedDetails(oldState => !oldState);
			}
		} catch (error) {
			setIsLoadingUpdatedDetails(oldState => !oldState);
			setIdSelected('');
			toast('Não foi possível confirmar detalhe da partida.', 'error', 4000, 'top');
		}
	}

	const getGame = useCallback(async () => {
		try {
			setIsLoading(oldState => !oldState);

			const {
				status,
				data: {
					error,
					message,
					data: {
						datailsGame
					}
				}
			} = await api.get(`/game/details?game=${game}`);

			if (status === 200 && !error) {
				setGameSelected(datailsGame);
				setIsLoading(oldState => !oldState);
				toast(message, 'success', 4000, 'top');
			}
		} catch (error) {
			setIsLoading(oldState => !oldState);
			toast('Não foi possível encontrar os detalhes da partida.', 'error', 4000, 'top');
		}
	}, [])

	useEffect(() => {
		getGame();
	}, [getGame]);

	console.log('isLoading', isLoading);

	return (
		<View className='w-full bg-green-200 flex-1 px-7'>
			{isLoading ? <Loading /> : (
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className='w-full flex-row items-center justify-between mt-2 gap-4 p-2'>
						<Avatar width={20} height={20} uri={gameSelected?.home.avatar || ''} />
						<Text className="text-gray-100 font-digitalBold text-5xl">{gameSelected?.home.goals?.length}</Text>
						<Text className="text-yellow-100 font-digitalBold text-3xl">X</Text>
						<Text className="text-gray-100 font-digitalBold text-5xl">{gameSelected?.away.goals?.length}</Text>
						<Avatar width={20} height={20} uri={gameSelected?.away.avatar || ''} />
					</View>
					<View className="w-full flex-row items-center justify-between mt-5 gap-4 py-2 border-b-2 border-t-2 border-green-100">
						<Text className="text-gray-100 font-rajdhaniBold text-base">Mandante</Text>
					</View>
					<View className="w-full flex-row mt-5">
						<ScrollView showsVerticalScrollIndicator={false}>
							{/* cards */}
							<View className="w-full flex-col gap-8">
								{gameSelected?.home.cards?.map(card => <SummaryDetails
									id={card.id}
									period={card.period}
									playerOne={card.playerNumber}
									symbol={card.type}
									time={card.time}
									key={card.id}
									isConfirmed={card.isConfirmed}
									game={game}
									handleDeleteGameDetails={handleDeleteGameDetails}
									isLoadingDelete={isLoadingDelete}
									idSelected={idSelected}
									isLoadingUpdatedDetails={isLoadingUpdatedDetails}
									handleUpdateGameDetail={handleUpdateGameDetail}
								/>)}
							</View>

							{/* goals */}
							<View className="w-full flex-col gap-8 mt-10">
								{gameSelected?.home.goals?.map(goal => <SummaryDetails
									id={goal.id}
									period={goal.period}
									playerOne={goal.playerNumber}
									symbol='goal'
									time={goal.time}
									key={goal.id}
									isConfirmed={goal.isConfirmed}
									game={game}
									handleDeleteGameDetails={handleDeleteGameDetails}
									isLoadingDelete={isLoadingDelete}
									idSelected={idSelected}
									isLoadingUpdatedDetails={isLoadingUpdatedDetails}
									handleUpdateGameDetail={handleUpdateGameDetail}
								/>)}
							</View>

							{/* substitution */}
							<View className="w-full flex-col gap-8  mt-10">
								{gameSelected?.home.substitutions?.map(substitution => <SummaryDetails
									id={substitution.id}
									period={substitution.period}
									playerOne={substitution.playerIn}
									playerTwo={substitution.playerOut}
									symbol='substitution'
									time={substitution.time}
									key={substitution.id}
									stop={substitution.stop}
									isConfirmed={substitution.isConfirmed}
									game={game}
									handleDeleteGameDetails={handleDeleteGameDetails}
									isLoadingDelete={isLoadingDelete}
									idSelected={idSelected}
									isLoadingUpdatedDetails={isLoadingUpdatedDetails}
									handleUpdateGameDetail={handleUpdateGameDetail}
								/>)}
							</View>
						</ScrollView>
					</View>
					<View className="w-full flex-row items-center justify-between mt-10 gap-4 py-2 border-b-2 border-t-2 border-green-100">
						<Text className="text-gray-100 font-rajdhaniBold text-base">Visitante</Text>
					</View>
					<View className="w-full flex-row mt-5">
						<ScrollView showsVerticalScrollIndicator={false}>
							{/* cards */}
							<View className="w-full flex-col gap-8">
								{gameSelected?.away.cards?.map(card => <SummaryDetails
									id={card.id}
									period={card.period}
									playerOne={card.playerNumber}
									symbol={card.type}
									time={card.time}
									key={card.id}
									isConfirmed={card.isConfirmed}
									game={game}
									handleDeleteGameDetails={handleDeleteGameDetails}
									isLoadingDelete={isLoadingDelete}
									idSelected={idSelected}
									isLoadingUpdatedDetails={isLoadingUpdatedDetails}
									handleUpdateGameDetail={handleUpdateGameDetail}
								/>)}
							</View>

							{/* goals */}
							<View className="w-full flex-col gap-8 mt-10">
								{gameSelected?.away.goals?.map(goal => <SummaryDetails
									id={goal.id}
									period={goal.period}
									playerOne={goal.playerNumber}
									symbol='goal'
									time={goal.time}
									key={goal.id}
									isConfirmed={goal.isConfirmed}
									game={game}
									handleDeleteGameDetails={handleDeleteGameDetails}
									isLoadingDelete={isLoadingDelete}
									idSelected={idSelected}
									isLoadingUpdatedDetails={isLoadingUpdatedDetails}
									handleUpdateGameDetail={handleUpdateGameDetail}
								/>)}
							</View>

							{/* substitution */}
							<View className="w-full flex-col gap-8  mt-10">
								{gameSelected?.away.substitutions?.map(substitution => <SummaryDetails
									id={substitution.id}
									period={substitution.period}
									playerOne={substitution.playerIn}
									playerTwo={substitution.playerOut}
									symbol='substitution'
									time={substitution.time}
									key={substitution.id}
									stop={substitution.stop}
									isConfirmed={substitution.isConfirmed}
									game={game}
									handleDeleteGameDetails={handleDeleteGameDetails}
									isLoadingDelete={isLoadingDelete}
									idSelected={idSelected}
									isLoadingUpdatedDetails={isLoadingUpdatedDetails}
									handleUpdateGameDetail={handleUpdateGameDetail}
								/>)}
							</View>
						</ScrollView>
					</View>
					<View className='w-full flex-row items-center justify-between mt-10 mb-5'>
						<Button label='Gerar súmula (PDF)' bgColor='green' />
					</View>
				</ScrollView>
			)}
		</View>
	)
}