import { Image, Text, View } from "react-native";
import React from "react";
import { InputGame } from "./InputGame";
import { Button } from "./Button";

interface ICards {
	color: 'red' | 'yellow' | 'green';
}

export default function IncreasedTime({ color }: ICards) {
	return (
		<View className="w-full p-7 flex-col items-center">
			<Text className="font-rajdhaniBold text-gray-100 text-2xl">
				Acréscimo
			</Text>
			<View className="flex flex-row gap-4 mt-10 mb-6 items-center justify-between">
				<InputGame keyboardType="number-pad" color={color}/>
				<Button label='Salvar' bgColor={color} />
			</View>
		</View>
	)
}