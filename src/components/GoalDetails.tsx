import React from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

interface IGoalDetails {
	playerNumber: number;
	time: string;
	period: string;
}

export default function GoalDetails({
	playerNumber,
	time,
	period
}: IGoalDetails) {
	return (
		<View className="flex-row items-center justify-between">
			<Text className="text-gray-100 font-rajdhaniBold text-base">N {playerNumber}</Text>
			<Text className="text-gray-100 font-rajdhaniBold text-base">T {time} ({period === 'firstHalf' ? '1º' : '2º'}) </Text>
			<MaterialIcons name="sports-soccer" size={16} color={colors.green[100]} />
		</View>
	)
}