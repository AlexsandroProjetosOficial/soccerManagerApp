import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from 'react';
import { Button } from "../../components/Button";
import clsx from 'clsx';
import { useRouter } from "expo-router";
import YellowCard from '@/assets/yellowCard.svg'
import RedCard from '@/assets/redCard.svg'
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { InputGroup } from "../../components/InputGroup";
import ModalGame from "../../components/ModalGame";
import { InputGame } from "../../components/InputGame";
import Cards from "../../components/Cards";
import IncreasedTime from "../../components/IncreasedTime";
import PlayerSubstituitions from "../../components/PlayerSubstituitions";
import Goals from "../../components/Goals";

let initialTimer: NodeJS.Timeout | null = null;
let ss = 0;
let mm = 0;

export default function Game() {
	const [open, setOpen] = useState(false);
	const [stopwatch, setStopwatch] = useState('00:00');
	const [color, setColor] = useState<'red' | 'green' | 'yellow'>('green');
	const [type, setType] = useState<'cards' | 'goals' | 'substitutions' | 'increasedTime' | ''>('');
	const [stop, setStop] = useState(false);
	const [timeIncrease, setTimeIncrease] = useState(10);
	const [team, setTeam] = useState({
		home: {
			id: 'e7349c88-4b7a-424a-82f7-aa2c15956eea',
			avatar: 'https://github.com/AlexsandroProjetosOficial.png'
		},
		away: {
			id: 'b441fa5f-17c9-4ce8-a936-213758e2770c',
			avatar: 'https://github.com/AlexsandroProjetosOficial.png'
		}
	});
	const router = useRouter();
	const params = useLocalSearchParams();
	const { game, half } = params;

	const renderModal = {
		cards: <Cards color={color} team={team} />,
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
			setStop(oldState => !oldState);
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

			setStop(oldState => !oldState);
		}
	}

	const endMatch = () => {
		if (initialTimer !== null) {
			clearInterval(initialTimer);
			initialTimer = null;

			setStopwatch('00:00');
			setStop(oldState => !oldState);
			ss = 0;
			mm = 0;

			router.push({ pathname: "/GameTimer", params: { game: game } })
		}
	}

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
			<View className='w-full flex-row items-center justify-between mt-10 gap-4 p-2'>
				<Image className="w-16 h-16 rounded-lg" source={{ uri: 'https://github.com/AlexsandroProjetosOficial.png' }} />
				<Text className="text-gray-100 font-digitalBold text-5xl">2</Text>
				<Text className="text-yellow-100 font-digitalBold text-3xl">X</Text>
				<Text className="text-gray-100 font-digitalBold text-5xl">0</Text>
				<Image className="w-16 h-16 rounded-lg" source={{ uri: 'https://github.com/AlexsandroProjetosOficial.png' }} />
			</View>
			<View className="w-full flex-row items-center justify-between mt-10 gap-4 p-2">
				<TouchableOpacity onPress={() => { setOpen(true); setColor('yellow'); setType('cards'); }}>
					<YellowCard width={50} height={50} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => { setOpen(true); setColor('red'); setType('cards'); }}>
					<RedCard width={50} height={50} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => { setOpen(true); setColor('green'); setType('goals'); }}>
					<MaterialIcons name="sports-soccer" size={50} color={colors.green[100]} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => { setOpen(true); setColor('green'); setType('substitutions'); }}>
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
								<View className="flex-row items-center justify-between">
									<Text className="text-gray-100 font-rajdhaniBold text-base">N 10</Text>
									<Text className="text-gray-100 font-rajdhaniBold text-base">T 25:00 ({half === 'first' ? '1º' : '2º'})</Text>
									<YellowCard width={16} height={16} />
								</View>
								<View className="flex-row items-center justify-between">
									<Text className="text-gray-100 font-rajdhaniBold text-base">N 10</Text>
									<Text className="text-gray-100 font-rajdhaniBold text-base">T 29:00 ({half === 'first' ? '1º' : '2º'})</Text>
									<YellowCard width={16} height={16} />
								</View>
								<View className="flex-row items-center justify-between">
									<Text className="text-gray-100 font-rajdhaniBold text-base">N 10</Text>
									<Text className="text-gray-100 font-rajdhaniBold text-base">T 40:00 ({half === 'first' ? '1º' : '2º'})</Text>
									<RedCard width={16} height={16} />
								</View>
							</View>
						</View>

						{/* visitante */}
						<View className="w-1/2 flex-col pl-4">
							<View className="flex-col gap-2">
								<View className="flex-row items-center justify-between">
									<Text className="text-gray-100 font-rajdhaniBold text-base">N 10</Text>
									<Text className="text-gray-100 font-rajdhaniBold text-base">T 25:00 ({half === 'first' ? '1º' : '2º'})</Text>
									<RedCard width={16} height={16} />
								</View>
							</View>
						</View>
					</View>

					{/* goals */}
					<View className="w-full flex-row justify-between mt-10">
						{/* mandante */}
						<View className="w-1/2 flex-col pr-4 border-r-2 border-green-100">
							<View className="flex-col gap-2">
								<View className="flex-row items-center justify-between">
									<Text className="text-gray-100 font-rajdhaniBold text-base">N 10</Text>
									<Text className="text-gray-100 font-rajdhaniBold text-base">T 25:00 ({half === 'first' ? '1º' : '2º'}) </Text>
									<MaterialIcons name="sports-soccer" size={16} color={colors.green[100]} />
								</View>
								<View className="flex-row items-center justify-between">
									<Text className="text-gray-100 font-rajdhaniBold text-base">N 10</Text>
									<Text className="text-gray-100 font-rajdhaniBold text-base">T 35:00 ({half === 'first' ? '1º' : '2º'}) </Text>
									<MaterialIcons name="sports-soccer" size={16} color={colors.green[100]} />
								</View>
							</View>
						</View>

						{/* visitante */}
						<View className="w-1/2 flex-col pl-4">
							<View className="flex-col gap-2">

							</View>
						</View>
					</View>

					{/* substituicoes */}
					<View className="w-full flex-row justify-between mt-10">
						{/* mandante */}
						<View className="w-1/2 flex-col pr-4 border-r-2 border-green-100">
							<View className="flex-col gap-2">
								<View className="flex-row items-center justify-between">
									<Text className="text-gray-100 font-rajdhaniBold text-base">1</Text>
									<View className="flex-row items-center justify-between">
										<MaterialIcons name="north" size={16} color={colors.green[100]} />
										<Text className="text-gray-100 font-rajdhaniBold text-base">10</Text>
									</View>
									<View className="flex-row items-center justify-between">
										<MaterialIcons name="south" size={16} color={colors.red[100]} />
										<Text className="text-gray-100 font-rajdhaniBold text-base">20</Text>
									</View>
									<Text className="text-gray-100 font-rajdhaniBold text-base">25:00 ({half === 'first' ? '1º' : '2º'}) </Text>
								</View>
								<View className="flex-row items-center justify-between">
									<Text className="text-gray-100 font-rajdhaniBold text-base">1</Text>
									<View className="flex-row items-center justify-between">
										<MaterialIcons name="north" size={16} color={colors.green[100]} />
										<Text className="text-gray-100 font-rajdhaniBold text-base">12</Text>
									</View>
									<View className="flex-row items-center justify-between">
										<MaterialIcons name="south" size={16} color={colors.red[100]} />
										<Text className="text-gray-100 font-rajdhaniBold text-base">22</Text>
									</View>
									<Text className="text-gray-100 font-rajdhaniBold text-base">29:00 ({half === 'first' ? '1º' : '2º'}) </Text>
								</View>
								<View className="flex-row items-center justify-between">
									<Text className="text-gray-100 font-rajdhaniBold text-base">1</Text>
									<View className="flex-row items-center justify-between">
										<MaterialIcons name="north" size={16} color={colors.green[100]} />
										<Text className="text-gray-100 font-rajdhaniBold text-base">4</Text>
									</View>
									<View className="flex-row items-center justify-between">
										<MaterialIcons name="south" size={16} color={colors.red[100]} />
										<Text className="text-gray-100 font-rajdhaniBold text-base">2</Text>
									</View>
									<Text className="text-gray-100 font-rajdhaniBold text-base">35:00 ({half === 'first' ? '1º' : '2º'}) </Text>
								</View>
							</View>
						</View>

						{/* visitante */}
						<View className="w-1/2 flex-col pl-4">
							<View className="flex-col gap-2">
								<View className="flex-row items-center justify-between">
									<Text className="text-gray-100 font-rajdhaniBold text-base">INT</Text>
									<View className="flex-row items-center justify-between">
										<MaterialIcons name="north" size={16} color={colors.green[100]} />
										<Text className="text-gray-100 font-rajdhaniBold text-base">10</Text>
									</View>
									<View className="flex-row items-center justify-between">
										<MaterialIcons name="south" size={16} color={colors.red[100]} />
										<Text className="text-gray-100 font-rajdhaniBold text-base">20</Text>
									</View>
									<Text className="text-gray-100 font-rajdhaniBold text-base">25:00 ({half === 'first' ? '1º' : '2º'})</Text>
								</View>
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