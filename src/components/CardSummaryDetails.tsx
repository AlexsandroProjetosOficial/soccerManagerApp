import { Text, View } from "react-native";
import React, { useState } from "react";
import { InputGame } from "./InputGame";
import { Button } from "./Button";

interface IUpdateGameDetail {
	gameDetail: string | string[] | undefined;
	game: string | string[] | undefined;
	column: string;
	value: string;
}

interface ICardSummaryDetail {
	playerOne: number;
	time: string;
	id: string | string[] | undefined;
	game: string | string[] | undefined;
	period: string;
	type: string;
	isLoadingUpdatedDetails: boolean;
	handleUpdateGameDetail: (props: IUpdateGameDetail) => void;
}

export default function CardSummaryDetail({
	playerOne,
	time,
	id,
	game,
	period,
	isLoadingUpdatedDetails,
	handleUpdateGameDetail,
	type
}: ICardSummaryDetail) {
	const [player, setPlayer] = useState(playerOne);
	const [timer, setTimer] = useState(time);
	const [half, setHalf] = useState(period);
	const [fieldSelected, setFieldSelected] = useState('');

	console.log('period', period);

	return (
		<View className="w-full p-7 flex-col items-center">
			<Text className="font-rajdhaniBold text-gray-100 text-2xl">
				Cartão {type === 'yellow_card' ? 'Amarelo' : 'Vermelho'}
			</Text>
			<View className="flex flex-col gap-4 mt-2 mb-6 items-center justify-between">
				<View className="flex flex-row gap-4 items-end justify-between">
					<View className="flex-1 flex-col gap-2 items-start justify-between">
						<Text className="text-gray-100 font-rajdhaniBold text-base">Número</Text>
						<InputGame
							keyboardType="number-pad"
							color='green'
							maxLength={3}
							value={String(player)}
							onChangeText={(value) => setPlayer(Number(value))}
						/>
					</View>
					<Button
						isPressed={isLoadingUpdatedDetails && fieldSelected === 'player'}
						label="Salvar"
						bgColor="green"
						onPress={() => {
							setFieldSelected('player');
							handleUpdateGameDetail({
								game,
								gameDetail: id,
								column: 'player_number_one',
								value: String(player)
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
			</View>
		</View>
	)
}