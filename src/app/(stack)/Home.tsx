import { FlatList, Text, View } from "react-native";
import { Category, CategoryItem } from "@/components/Category";
import { useCallback, useEffect, useMemo, useState } from "react";
import Games from "@/components/Games";
import React from "react";
import { api } from "../../service/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/Toast";
import { Button } from "../../components/Button";
import Loading from "../../components/Loading";

interface IGames {
	id: string;
	league: string;
	avatar: string | null;
	teams: string;
	category: string;
	nivel: string;
	date: string;
	location: string;
	status: string;
	isAllArrived: boolean;
}

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [categoryValue, setCategoryValue] = useState('professional');
	const [gameStatus, setGameStatus] = useState('Em aberto');
	const [games, setGames] = useState<Array<IGames>>([]);

	const { userData } = useAuth();
	const { toast } = useToast();

	const gamesFiltered = useMemo(() => {
		return games.filter(game => game.nivel === categoryValue && game.status === gameStatus);
	}, [categoryValue, gameStatus, games]);

	const getGames = useCallback(async () => {
		try {
			setIsLoading(oldState => !oldState);

			const {
				status,
				data: {
					error,
					message,
					data: {
						games: gamesSelected
					}
				}
			} = await api.get(`/game/games?user=${userData.id}&category=${categoryValue}`);

			if (status === 200 && !error) {
				setGames(gamesSelected);
				toast(message, 'success', 4000, 'top');

				setIsLoading(oldState => !oldState);
			}
		} catch (error) {
			toast('Jogos não encontrado.', 'error', 4000, 'top');
		}
	}, [categoryValue])

	useEffect(() => {
		getGames();
	}, [getGames])

	return (
		<View className='w-full bg-green-200 flex-1 px-7'>
			<View className="h-auto flex-row gap-4 mt-10 justify-center">
				<Category setValue={setCategoryValue} value={categoryValue}>
					<CategoryItem value="professional" />
					<CategoryItem value="base" />
					<CategoryItem value="amateur" />
				</Category>
			</View>
			<View className="mt-6 flex-row justify-between items-center gap-4">
				<Button label="Em aberto" bgColor="yellow" onPress={() => setGameStatus('Em aberto')} />
				<Button label="Concluído" bgColor="green" onPress={() => setGameStatus('Concluído')} />
			</View>
			{isLoading ? (
				<Loading />
			) : (
				gamesFiltered && gamesFiltered.length ? (
					<>
						<View className="flex mt-8 mb-4 flex-row h-auto justify-between items-end">
							<Text className="text-gray-100 font-rajdhaniBold text-xl">Jogos {gameStatus}</Text>
							<Text className="text-gray-200 font-rajdhaniRegular text-lg">Total {gamesFiltered.length}</Text>
						</View>
						<View className="pb-10">
							<FlatList
								showsVerticalScrollIndicator={false}
								data={gamesFiltered}
								renderItem={({ item }) => <Games item={item} />}
								keyExtractor={item => item.id}
							/>
						</View>
					</>
				) : (
					<View className="flex mt-12 flex-row justify-center items-center">
						<Text className="text-gray-100 font-rajdhaniBold text-xl">Não há jogos selecionados.</Text>
					</View>
				)
			)}
		</View>
	)
}