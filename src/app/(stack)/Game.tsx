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

let initialTimer: NodeJS.Timeout | null = null;
let ss = 0;
let mm = 0;

interface IClubs {
	teamId: string;
	name: string;
	avatar: string;
	score: number;
	cards: {
		id: string;
		type: 'yellow' | 'red';
		playerNumber: number;
		period: string;
		time: string;
	}[] | [];
	goals: {
		id: string;
		playerNumber: number;
		period: string;
		time: string;
	}[] | [];
	substitutions: {
		id: string;
		stop: string;
		playerIn: number;
		playerOut: number;
		time: string;
		period: string;
	}[] | []
}

interface IGame {
	gameId: string;
	home: IClubs;
	away: IClubs;
}

interface ITeam {
	home: {
		id: string;
		avatar: string;
	},
	away: {
		id: string;
		avatar: string;
	}
}

interface IPlayerRegisteredCard {
	teamId: string;
	type: string;
}

export default function Game() {
	const [open, setOpen] = useState(false);
	const [stopwatch, setStopwatch] = useState('00:00');
	const [result, setResult] = useState('00:00');
	const [color, setColor] = useState<'red' | 'green' | 'yellow'>('green');
	const [type, setType] = useState<'cards' | 'goals' | 'substitutions' | 'increasedTime' | ''>('');
	const [timeIncrease, setTimeIncrease] = useState(10);
	const [gameSelected, setGameSelected] = useState<IGame | null>(null)
	const [playerRegisterCard, setPlayerRegisterCard] = useState('')
	const [team, setTeam] = useState<ITeam>({
		home: {
			id: '',
			avatar: ''
		},
		away: {
			id: '',
			avatar: ''
		}
	});
	const router = useRouter();
	const params = useLocalSearchParams();
	const { game, half } = params;

	const handleRegisterCard = async ({ teamId, type }: IPlayerRegisteredCard) => {
		try {
			console.log(playerRegisterCard, game, half, teamId, result, type);
			setOpen(oldState => !oldState);
			setPlayerRegisterCard('')
		} catch (error) {
			console.log(error);
		}
	}

	const renderModal = {
		cards: <Cards color={color} team={team} playerRegisterCard={playerRegisterCard} handleRegisterCard={handleRegisterCard} setPlayerRegisterCard={setPlayerRegisterCard} />,
		goals: <Goals team={team} />,
		substitutions: <PlayerSubstituitions team={team} />,
		increasedTime: <IncreasedTime color={color} />,
		'': ''
	}

	const startMatch = () => {
		if (initialTimer !== null) {
			// here stop timer
			clearInterval(initialTimer);
			initialTimer = null;
		} else {
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
				console.log(format);

				setStopwatch(format);
			}, 1000);
		}
	}

	const endMatch = () => {
		if (initialTimer !== null) {
			clearInterval(initialTimer);
			initialTimer = null;

			setStopwatch('00:00');

			ss = 0;
			mm = 0;

			router.push({ pathname: "/GameTimer", params: { game: game } })
		}
	}

	const getGame = useCallback(async () => {
		try {
			const game: IGame = {
				gameId: '3d25f9b8-8f74-4985-af1d-5b74482b1bb9',
				home: {
					teamId: 'f866952e-91fd-44fd-ab73-a07f0ad52b73',
					avatar: 'https://federacaopr.com.br/wp-content/uploads/2023/12/cap.webp',
					name: 'Athletico Paranaense',
					score: 2,
					cards: [
						{
							id: '16e86d0b-ce37-457a-909d-5daa5ee8153b',
							type: 'yellow',
							playerNumber: 10,
							period: 'firstHalf',
							time: '25:33'
						}
					],
					goals: [
						{
							id: '08f1ff6f-1181-4da6-a9e9-8d01aea99021',
							playerNumber: 10,
							period: 'firstHalf',
							time: '26:00'
						},
						{
							id: '74709a8e-50c6-402d-a8c7-91af5232e57d',
							playerNumber: 5,
							period: 'firstHalf',
							time: '40:22'
						}
					],
					substitutions: [
						{
							id: '77200e29-b1a6-488e-b93f-1a11e7fd81a5',
							stop: '1',
							playerIn: 22,
							playerOut: 8,
							time: '22:44',
							period: 'firstHalf'
						},
						{
							id: '9bbbabc9-7562-4336-af1a-9c242340c753',
							stop: '2',
							playerIn: 17,
							playerOut: 7,
							time: '25:44',
							period: 'firstHalf'
						}
					]
				},
				away: {
					teamId: 'd907081a-3fc8-4cbd-9f3e-bad8abfd5579',
					avatar: 'https://federacaopr.com.br/wp-content/uploads/2023/12/Coritiba.webp',
					name: 'Coritiba SAF',
					score: 0,
					cards: [
						{
							id: '98e524b3-aa41-4a30-99b1-4a98e9083eb5',
							type: 'yellow',
							playerNumber: 10,
							period: 'firstHalf',
							time: '25:33'
						}
					],
					goals: [],
					substitutions: [
						{
							id: '7f657539-9489-45b2-bbb2-fd6a4786a562',
							stop: '1',
							playerIn: 22,
							playerOut: 8,
							time: '22:44',
							period: 'firstHalf'
						}
					]
				}
			};

			setTeam({
				home: {
					id: game.home.teamId,
					avatar: game.home.avatar
				},
				away: {
					id: game.away.teamId,
					avatar: game.away.avatar
				}
			})
			setGameSelected(game)
		} catch (error) {
			console.log(error);
		}
	}, [])

	useEffect(() => {
		getGame();
	}, [getGame]);

	return (
		<View className='w-full bg-green-200 flex-1 px-7'>
			{timeIncrease > 0 ? (
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
				<Image className="w-20 h-20 rounded-lg" source={{ uri: gameSelected?.home.avatar }} />
				<Text className="text-gray-100 font-digitalBold text-5xl">{gameSelected?.home.score}</Text>
				<Text className="text-yellow-100 font-digitalBold text-3xl">X</Text>
				<Text className="text-gray-100 font-digitalBold text-5xl">{gameSelected?.away.score}</Text>
				<Image className="w-20 h-20 rounded-lg" source={{ uri: gameSelected?.away.avatar }} />
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
					<MaterialIcons name="swap-vert" size={50} color={colors.green[100]} />
				</TouchableOpacity>
			</View>
			<View className="w-full flex-row items-center justify-between mt-10 gap-4 py-2 border-b-2 border-t-2 border-green-100">
				<Text className="text-gray-100 font-rajdhaniBold text-base">Mandante</Text>
				<Text className="text-gray-100 font-rajdhaniBold text-base">Visitante</Text>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="w-full flex-col items-center justify-between mt-1 gap-4 pb-20">
					{/* cards */}
					<View className="w-full flex-row justify-between">
						{/* mandante */}
						<View className="w-1/2 flex-col pr-4 border-r-2 border-green-100">
							<View className="flex-col gap-2">
								{gameSelected?.home.cards.map(game => <CardDetails playerNumber={game.playerNumber} time={game.time} period={game.period} type={game.type} key={game.id} />)}
							</View>
						</View>

						{/* visitante */}
						<View className="w-1/2 flex-col pl-4">
							<View className="flex-col gap-2">
								{gameSelected?.away.cards.map(game => <CardDetails playerNumber={game.playerNumber} time={game.time} period={game.period} type={game.type} key={game.id} />)}
							</View>
						</View>
					</View>

					{/* goals */}
					<View className="w-full flex-row justify-between mt-10">
						{/* mandante */}
						<View className="w-1/2 flex-col pr-4 border-r-2 border-green-100">
							<View className="flex-col gap-2">
								{gameSelected?.home.goals.map(game => <GoalDetails playerNumber={game.playerNumber} time={game.time} period={game.period} key={game.id} />)}
							</View>
						</View>

						{/* visitante */}
						<View className="w-1/2 flex-col pl-4">
							{gameSelected?.away.goals.map(game => <GoalDetails playerNumber={game.playerNumber} time={game.time} period={game.period} key={game.id} />)}
						</View>
					</View>

					{/* substituicoes */}
					<View className="w-full flex-row justify-between mt-10">
						{/* mandante */}
						<View className="w-1/2 flex-col pr-4 border-r-2 border-green-100">
							<View className="flex-col gap-2">
								{gameSelected?.home.substitutions.map(game => <SubstitutionsDetails stop={game.stop} playerIn={game.playerIn} playerOut={game.playerOut} time={game.time} period={game.period} key={game.id} />)}
							</View>
						</View>

						{/* visitante */}
						<View className="w-1/2 flex-col pl-4">
							<View className="flex-col gap-2">
								{gameSelected?.away.substitutions.map(game => <SubstitutionsDetails stop={game.stop} playerIn={game.playerIn} playerOut={game.playerOut} time={game.time} period={game.period} key={game.id} />)}
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