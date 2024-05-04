import React from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

interface ISubstitutionsDetails {
	stop: string;
	playerIn: number;
	playerOut: number;
	time: string;
	period: string;
}

export default function SubstitutionsDetails({
	stop,
	playerIn,
	playerOut,
	time,
	period
}: ISubstitutionsDetails) {
	return (
		<View className="flex-row items-center justify-between">
			<Text className="text-gray-100 font-rajdhaniBold text-base">{stop}</Text>
			<View className="flex-row items-center justify-between">
				<MaterialIcons name="north" size={16} color={colors.green[100]} />
				<Text className="text-gray-100 font-rajdhaniBold text-base">{playerIn}</Text>
			</View>
			<View className="flex-row items-center justify-between">
				<MaterialIcons name="south" size={16} color={colors.red[100]} />
				<Text className="text-gray-100 font-rajdhaniBold text-base">{playerOut}</Text>
			</View>
			<Text className="text-gray-100 font-rajdhaniBold text-base">{time} ({period === 'firstHalf' ? '1º' : '2º'}) </Text>
		</View>
	)
}