import { Text, View } from "react-native";
import React, { useState } from "react";
import { InputGame } from "./InputGame";
import { Button } from "./Button";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

interface IUpdateGameDetail {
	gameDetail: string | string[] | undefined;
	game: string | string[] | undefined;
	column: string;
	value: string;
}

interface ICardSummaryDetail {
	playerOne: number;
	playerTwo?: number | null;
	time: string;
	stop?: string | null;
	id: string | string[] | undefined;
	game: string | string[] | undefined;
	period: string;
	isLoadingUpdatedDetails: boolean;
	handleUpdateGameDetail: (props: IUpdateGameDetail) => void;
}

export default function SubstitutionSummaryDetail({
	playerOne,
	playerTwo,
	time,
	id,
	game,
	period,
	isLoadingUpdatedDetails,
	handleUpdateGameDetail,
	stop
}: ICardSummaryDetail) {
	const [playerNumberOne, setPlayerNumberOne] = useState(playerOne);
	const [playerNumberTwo, setPlayerNumberTwo] = useState(playerTwo);
	const [stoper, setStoper] = useState(stop);
	const [timer, setTimer] = useState(time);
	const [half, setHalf] = useState(period);
	const [fieldSelected, setFieldSelected] = useState('');

	console.log('stoper', stoper);
	return (
		<View className="w-full p-7 flex-col items-center">
			<Text className="font-rajdhaniBold text-gray-100 text-2xl">
				Substituição
			</Text>
			<View className="flex flex-col gap-4 mt-2 mb-6 items-center justify-between">
				<View className="flex flex-row gap-4 items-end justify-between">
					<View className="flex-1 flex-col gap-2 items-start justify-between">
						<Text className="text-gray-100 font-rajdhaniBold text-base">Parada</Text>
						<InputGame
							keyboardType="number-pad"
							color='green'
							maxLength={3}
							value={String(stoper)}
							onChangeText={(value) => setStoper(String(value))}
						/>
					</View>
					<Button
						isPressed={isLoadingUpdatedDetails && fieldSelected === 'stop'}
						label="Salvar"
						bgColor="green"
						onPress={() => {
							setFieldSelected('stop');
							handleUpdateGameDetail({
								game,
								gameDetail: id,
								column: 'stop',
								value: String(stoper)
							})
						}} />
				</View>
				<View className="flex flex-row gap-4 items-end justify-between">
					<View className="flex-1 flex-col gap-2 items-start justify-between">
						<Text className="text-gray-100 font-rajdhaniBold text-base">Tempo</Text>
						<InputGame
							keyboardType="number-pad"
							color='green'
							maxLength={2}
							value={timer}
							onChangeText={(value) => setTimer(value)}
						/>
					</View>
					<Button
						isPressed={isLoadingUpdatedDetails && fieldSelected === 'time'}
						label="Salvar"
						bgColor="green"
						onPress={() => {
							setFieldSelected('time');
							handleUpdateGameDetail({
								game,
								gameDetail: id,
								column: 'time',
								value: `${timer}:00`
							});
						}} />
				</View>
				<View className="flex flex-row gap-4 items-end justify-between">
					<View className="flex-1 flex-col gap-2 items-start justify-between">
						<Text className="text-gray-100 font-rajdhaniBold text-base">Período</Text>
						<InputGame
							keyboardType="name-phone-pad"
							color='green'
							maxLength={1}
							value={half === '' ? '' : half === 'firstHalf' ? '1' : '2'}
							onChangeText={(value) => setHalf(String(value) === '' ? '' : String(value) === '1' ? 'firstHalf' : 'secondHalf')}
						/>
					</View>
					<Button
						isPressed={isLoadingUpdatedDetails && fieldSelected === 'half'}
						label="Salvar"
						bgColor="green"
						onPress={() => {
							setFieldSelected('half');
							handleUpdateGameDetail({
								game,
								gameDetail: id,
								column: half === 'firstHalf' ? 'first_half' : 'second_half',
								value: 'true'
							});
						}} />
				</View>
				<View className="flex flex-row gap-4 items-end justify-between">
					<View className="flex-1 flex-col gap-2 items-start justify-between">
					<View className="flex flex-row gap-2 items-center justify-center">
							<Text className="text-gray-100 font-rajdhaniBold text-base">Entra</Text>
							<MaterialIcons name="north" size={16} color={colors.green[100]} />
						</View>
						<InputGame
							keyboardType="number-pad"
							color='green'
							maxLength={3}
							value={String(playerNumberOne)}
							onChangeText={(value) => setPlayerNumberOne(Number(value))}
						/>
					</View>
					<Button
						isPressed={isLoadingUpdatedDetails && fieldSelected === 'playerOne'}
						label="Salvar"
						bgColor="green"
						onPress={() => {
							setFieldSelected('playerOne');
							handleUpdateGameDetail({
								game,
								gameDetail: id,
								column: 'player_number_one',
								value: String(playerNumberOne)
							})
						}} />
				</View>
				<View className="flex flex-row gap-4 items-end justify-between">
					<View className="flex-1 flex-col gap-2 items-start justify-between">
						<View className="flex flex-row gap-2 items-center justify-center">
							<Text className="text-gray-100 font-rajdhaniBold text-base">Sai</Text>
							<MaterialIcons name="south" size={16} color={colors.red[100]} />
						</View>
						<InputGame
							keyboardType="number-pad"
							color='red'
							maxLength={3}
							value={String(playerNumberTwo)}
							onChangeText={(value) => setPlayerNumberTwo(Number(value))}
						/>
					</View>
					<Button
						isPressed={isLoadingUpdatedDetails && fieldSelected === 'playerTwo'}
						label="Salvar"
						bgColor="red"
						onPress={() => {
							setFieldSelected('playerTwo');
							handleUpdateGameDetail({
								game,
								gameDetail: id,
								column: 'player_number_two',
								value: String(playerNumberTwo)
							})
						}} />
				</View>
			</View>
		</View>
	)
}