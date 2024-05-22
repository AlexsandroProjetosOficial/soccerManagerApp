import { Image, Text, View } from "react-native";
import React from "react";
import { InputGame } from "./InputGame";
import { Button } from "./Button";

interface IUpdateGame {
	game: string | string[] | undefined;
	column: string;
	value: Date | number | string;
	message: string;
}
interface ICards {
	color: 'red' | 'yellow' | 'green';
	isLoadingRegisterDetails: boolean;
	timeIncrease: string;
	setTimeIncrease: (value: string) => void;
	handleUpdateGame: (props: IUpdateGame) => void;
	game: string | string[] | undefined;
	timeHalf: string | string[] | undefined;
}

export default function IncreasedTime({
	color,
	isLoadingRegisterDetails,
	timeIncrease,
	setTimeIncrease,
	handleUpdateGame,
	game,
	timeHalf
}: ICards) {
	return (
		<View className="w-full p-7 flex-col items-center">
			<Text className="font-rajdhaniBold text-gray-100 text-2xl">
				Acréscimo
			</Text>
			<View className="flex flex-row gap-4 mt-10 mb-6 items-center justify-between">
				<InputGame keyboardType="number-pad" color={color} maxLength={3} value={timeIncrease} onChangeText={(value) => setTimeIncrease(value)} />
				<Button
					isPressed={isLoadingRegisterDetails}
					label='Salvar'
					bgColor={color}
					onPress={() => handleUpdateGame({
						game,
						column: timeHalf === 'firstHalf' ? 'additional_time_first_half' : 'additional_time_second_half',
						value: timeIncrease,
						message: 'Acréscimo registrado com sucesso.'
					})}
				/>
			</View>
		</View>
	)
}