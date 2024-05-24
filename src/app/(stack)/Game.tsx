import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from "../../components/Button";
import { useRouter } from "expo-router";
import YellowCard from '@/assets/yellowCard.svg'
import RedCard from '@/assets/redCard.svg'
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import ModalGame from "../../components/ModalGame";
import Cards from "../../components/Cards";
import IncreasedTime from "../../components/IncreasedTime";
import PlayerSubstituitions from "../../components/PlayerSubstituitions";
import Goals from "../../components/Goals";
import CardDetails from "../../components/CardDetails";
import GoalDetails from "../../components/GoalDetails";
import SubstitutionsDetails from "../../components/SubstitutionsDetails";
import { api } from "../../service/api";
import { useToast } from "../../components/Toast";
import moment from "moment";
import Avatar from "../../components/Avatar";

let initialTimer: NodeJS.Timeout | null = null;
let ss = 0;
let mm = 0;

interface IClubs {
	teamId: string | undefined;
	avatar: string | null;
	name: string | undefined;
	cards: {
		id: string;
		type: string;
		playerNumber: number;
		period: string;
		time: string;
	}[] | undefined,
	goals: {
		id: string;
		playerNumber: number;
		period: string;
		time: string;
	}[] | undefined,
	substitutions: {
		id: string;
		stop: string;
		playerIn: number;
		playerOut: number | null;
		period: string;
		time: string;
	}[] | undefined
}

interface IGame {
	home: IClubs;
	away: IClubs;
}

interface ITeam {
	home: {
		id: string;
		avatar: string | null;
	};
	away: {
		id: string;
		avatar: string | null;
	}
};

interface IPlayerRegisteredCard {
	teamId: string;
	type: string;
}

interface IUpdateGame {
	game: string | string[] | undefined;
	column: string;
	value: Date | number | string;
	message: string;
}

export default function Game() {
	const [open, setOpen] = useState(false);
	const [isLoadingRegisterDetails, setIsLoadingRegisterDetails] = useState(false);
	const [stopwatch, setStopwatch] = useState('00:00');
	const [result, setResult] = useState('00:00');
	const [color, setColor] = useState<'red' | 'green' | 'yellow'>('green');
	const [type, setType] = useState<'cards' | 'goals' | 'substitutions' | 'increasedTime' | ''>('');
	const [timeIncrease, setTimeIncrease] = useState('');
	const [gameSelected, setGameSelected] = useState<IGame | null>(null)
	const [playerRegisterCardOne, setPlayerRegisterCardOne] = useState('')
	const [playerRegisterCardTwo, setPlayerRegisterCardTwo] = useState('')
	const [stopSubstituition, setStopSubstituition] = useState('')
	const [team, setTeam] = useState<ITeam>({} as ITeam);

	const router = useRouter();
	const { toast } = useToast();
	const params = useLocalSearchParams();

	const { game, half } = params;

	const handleRegisterDetails = async ({ teamId, type }: IPlayerRegisteredCard) => {
		try {
			setIsLoadingRegisterDetails(oldState => !oldState);

			if (type === 'substitution') {
				const substitutions = gameSelected?.home.teamId === teamId ? gameSelected.home.substitutions : gameSelected?.away.substitutions;

				const isPlayerRegisterCardOne = substitutions?.some(substitution => substitution.playerIn === Number(playerRegisterCardOne) || substitution.playerOut === Number(playerRegisterCardOne))
				const isPlayerRegisterCardTwo = substitutions?.some(substitution => substitution.playerIn === Number(playerRegisterCardTwo) || substitution.playerOut === Number(playerRegisterCardTwo))

				if (isPlayerRegisterCardOne || isPlayerRegisterCardTwo) {
					setIsLoadingRegisterDetails(oldState => !oldState);

					const message = isPlayerRegisterCardOne || isPlayerRegisterCardTwo ? 'Atletas já registrado nas substituições.' : '';

					toast(message, 'error', 4000, 'top');

					return;
				}
			}

			const data = {
				game,
				team: teamId,
				playerRegisterCardOne,
				playerRegisterCardTwo,
				half,
				result,
				type,
				stop: stopSubstituition.toUpperCase()
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
			} = await api.post('/game/details', data);

			if (status === 201 && !error) {
				setGameSelected(datailsGame);
				setTeam({
					home: {
						id: datailsGame.home.teamId,
						avatar: datailsGame.home.avatar
					},
					away: {
						id: datailsGame.away.teamId,
						avatar: datailsGame.away.avatar
					}
				})
				toast(message, 'success', 4000, 'top');
				setIsLoadingRegisterDetails(oldState => !oldState);
			}

			if (!['substitution'].includes(type)) setOpen(oldState => !oldState);

			setPlayerRegisterCardOne('');
			setPlayerRegisterCardTwo('');
		} catch (error) {
			toast('Não foi possível encontrar os detalhes da partida.', 'error', 4000, 'top');
		}
	}

	const handleUpdateGame = async ({ game, column, value, message }: IUpdateGame) => {
		try {
			setIsLoadingRegisterDetails(oldState => !oldState);

			const time = ['additional_time_first_half', 'additional_time_second_half'].includes(column) ? String((Number(value) * 60 * 1000) + (0 * 1000)) : value;

			const data = {
				game,
				column,
				value: time
			};

			const {
				status,
				data: {
					error
				}
			} = await api.patch('/game/game', data);

			if (status === 201 && !error) {
				toast(message, 'success', 4000, 'top');
				setIsLoadingRegisterDetails(oldState => !oldState);
				setOpen(oldState => !oldState);
			}
		} catch (error) {
			toast('Não foi possível registrar horários.', 'error', 4000, 'top');
			setIsLoadingRegisterDetails(oldState => !oldState);
		}
	}

	const renderModal = {
		cards: <Cards
			isLoadingRegisterDetails={isLoadingRegisterDetails}
			color={color}
			team={team}
			playerRegisterCardOne={playerRegisterCardOne}
			handleRegisterDetails={handleRegisterDetails}
			setPlayerRegisterCardOne={setPlayerRegisterCardOne}
		/>,
		goals: <Goals
			isLoadingRegisterDetails={isLoadingRegisterDetails}
			team={team}
			playerRegisterCardOne={playerRegisterCardOne}
			handleRegisterDetails={handleRegisterDetails}
			setPlayerRegisterCardOne={setPlayerRegisterCardOne}
		/>,
		substitutions: <PlayerSubstituitions
			isLoadingRegisterDetails={isLoadingRegisterDetails}
			team={team}
			playerRegisterCardOne={playerRegisterCardOne}
			playerRegisterCardTwo={playerRegisterCardTwo}
			handleRegisterDetails={handleRegisterDetails}
			setPlayerRegisterCardOne={setPlayerRegisterCardOne}
			setPlayerRegisterCardTwo={setPlayerRegisterCardTwo}
			stopSubstituition={stopSubstituition}
			setStopSubstituition={setStopSubstituition}
			setOpen={setOpen}
		/>,
		increasedTime: <IncreasedTime
			color={color}
			isLoadingRegisterDetails={isLoadingRegisterDetails}
			timeIncrease={timeIncrease}
			setTimeIncrease={setTimeIncrease}
			handleUpdateGame={handleUpdateGame}
			game={game}
			timeHalf={half}
		/>,
		'': ''
	}

	const startMatch = () => {
		if (initialTimer !== null) {
			// here stop timer
			clearInterval(initialTimer);
			initialTimer = null;
		} else {
			const matchTimeStart = moment().toDate();
			// Start timer
			initialTimer = setInterval(() => {
				ss++;

				if (ss === 60) {
					ss = 0;
					mm++
				};

				if (mm === 60) {
					mm = 0;
				}

				let format = `${(mm < 10 ? `0${mm}` : mm)}:${(ss < 10 ? `0${ss}` : ss)}`;

				setStopwatch(format);
			}, 1000);

			handleUpdateGame({
				game,
				column: half === 'firstHalf' ? 'start_time_first_half' : 'start_time_second_half',
				value: matchTimeStart,
				message: 'Horário da partida registrado com sucesso.'
			})
		}
	}

	const endMatch = () => {
		if (initialTimer !== null) {
			const matchTimeEnd = moment().toDate();

			clearInterval(initialTimer);
			initialTimer = null;

			setStopwatch('00:00');

			ss = 0;
			mm = 0;

			handleUpdateGame({
				game,
				column: half === 'firstHalf' ? 'end_time_first_half' : 'end_time_second_half',
				value: matchTimeEnd,
				message: 'Horário da partida registrado com sucesso.'
			})

			router.push({ pathname: "/GameTimer", params: { game: game } })
		}
	}

	const getGame = useCallback(async () => {
		try {
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
				setTeam({
					home: {
						id: datailsGame.home.teamId,
						avatar: datailsGame.home.avatar
					},
					away: {
						id: datailsGame.away.teamId,
						avatar: datailsGame.away.avatar
					}
				})
				toast(message, 'success', 4000, 'top');
			}
		} catch (error) {
			toast('Não foi possível encontrar os detalhes da partida.', 'error', 4000, 'top');
		}
	}, [])

	useEffect(() => {
		getGame();
	}, [getGame]);

	return (
		<View className='w-full bg-green-200 flex-1 px-7'>
			{Number(timeIncrease) > 0 ? (
				<View className="w-full flex-row justify-end absolute top-0 right-4">
					<Text className="text-green-100 font-digitalBold text-6xl">+{timeIncrease}</Text>
				</View>
			) : ''}
			<View className='w-full flex-row justify-center mt-6'>
				<Text className="text-gray-100 font-digitalBold text-[10.4rem]">{stopwatch}</Text>
			</View>
			<View className='w-full flex-row justify-center mt-1 gap-4'>
				{stopwatch === '00:00' ? (
					<Button
						label='Iniciar'
						bgColor='yellow'
						onPress={startMatch}
					/>
				) : ''}
				{stopwatch !== '00:00' ? (
					<>
						<Button
							label='Encerrar'
							bgColor='red'
							onPress={endMatch}
						/>
						<Button
							label='Acrescimo'
							bgColor='green'
							onPress={() => { setOpen(true); setColor('green'); setType('increasedTime'); }}
						/>
					</>
				) : ''}
			</View>
			<View className='w-full flex-row items-center justify-between mt-2 gap-4 p-2'>
				<Avatar width={20} height={20} uri={gameSelected?.home.avatar || ''} />
				<Text className="text-gray-100 font-digitalBold text-5xl">{gameSelected?.home.goals?.length}</Text>
				<Text className="text-yellow-100 font-digitalBold text-3xl">X</Text>
				<Text className="text-gray-100 font-digitalBold text-5xl">{gameSelected?.away.goals?.length}</Text>
				<Avatar width={20} height={20} uri={gameSelected?.away.avatar || ''} />
			</View>
			<View className="w-full flex-row items-center justify-between mt-5 gap-4 p-2">
				<TouchableOpacity onPress={() => { setOpen(true); setColor('yellow'); setType('cards'); setResult(stopwatch); }}>
					<YellowCard width={50} height={50} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => { setOpen(true); setColor('red'); setType('cards'); setResult(stopwatch); }}>
					<RedCard width={50} height={50} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => { setOpen(true); setColor('green'); setType('goals'); setResult(stopwatch); }}>
					<MaterialIcons name="sports-soccer" size={50} color={colors.green[100]} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => { setOpen(true); setColor('green'); setType('substitutions'); setResult(stopwatch); }}>
					<View className="flex-row items-center">
						<MaterialIcons name="north" size={50} color={colors.green[100]} />
						<MaterialIcons name="south" size={50} color={colors.red[100]} style={{ marginLeft: -30 }} />
					</View>
				</TouchableOpacity>
			</View>
			<View className="w-full flex-row items-center justify-between mt-10 gap-4 py-2 border-b-2 border-t-2 border-green-100">
				<Text className="text-gray-100 font-rajdhaniBold text-base">Mandante</Text>
				<Text className="text-gray-100 font-rajdhaniBold text-base">Visitante</Text>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="w-full flex-col items-center justify-between mt-1 gap-4 pb-5">
					{/* cards */}
					<View className="w-full flex-row justify-between">
						{/* mandante */}
						<View className="w-1/2 flex-col pr-4 border-r-2 border-green-100">
							<View className="flex-col gap-2">
								{gameSelected?.home.cards?.map(game => <CardDetails playerNumber={game.playerNumber} time={game.time} period={game.period} type={game.type} key={game.id} />)}
							</View>
						</View>

						{/* visitante */}
						<View className="w-1/2 flex-col pl-4">
							<View className="flex-col gap-2">
								{gameSelected?.away.cards?.map(game => <CardDetails playerNumber={game.playerNumber} time={game.time} period={game.period} type={game.type} key={game.id} />)}
							</View>
						</View>
					</View>

					{/* goals */}
					<View className="w-full flex-row justify-between mt-10">
						{/* mandante */}
						<View className="w-1/2 flex-col pr-4 border-r-2 border-green-100">
							<View className="flex-col gap-2">
								{gameSelected?.home.goals?.map(game => <GoalDetails playerNumber={game.playerNumber} time={game.time} period={game.period} key={game.id} />)}
							</View>
						</View>

						{/* visitante */}
						<View className="w-1/2 flex-col pl-4">
							{gameSelected?.away.goals?.map(game => <GoalDetails playerNumber={game.playerNumber} time={game.time} period={game.period} key={game.id} />)}
						</View>
					</View>

					{/* substituicoes */}
					<View className="w-full flex-row justify-between mt-10">
						{/* mandante */}
						<View className="w-1/2 flex-col pr-4 border-r-2 border-green-100">
							<View className="flex-col gap-2">
								{gameSelected?.home.substitutions?.map(game => <SubstitutionsDetails stop={game.stop} playerIn={game.playerIn} playerOut={game.playerOut!} time={game.time} period={game.period} key={game.id} />)}
							</View>
						</View>

						{/* visitante */}
						<View className="w-1/2 flex-col pl-4">
							<View className="flex-col gap-2">
								{gameSelected?.away.substitutions?.map(game => <SubstitutionsDetails stop={game.stop} playerIn={game.playerIn} playerOut={game.playerOut!} time={game.time} period={game.period} key={game.id} />)}
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
			<ModalGame open={open} setOpen={setOpen}>
				{renderModal[type]}
			</ModalGame>
		</View>
	)
}