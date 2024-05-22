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
			<View className="w-7 mr-2 flex-row items-center justify-end">
				<Text className="text-gray-100 font-rajdhaniBold text-base">{stop}</Text>
			</View>
			<View className="w-10 flex-row items-center justify-start">
				<MaterialIcons name="north" size={16} color={colors.green[100]} />
				<Text className="text-gray-100 font-digitalBold text-base text-center">{playerIn}</Text>
			</View>
			<View className="w-10 flex-row items-center justify-start">
				<MaterialIcons name="south" size={16} color={colors.red[100]} />
				<Text className="text-gray-100 font-digitalBold text-base">{playerOut}</Text>
			</View>
			<View className="w-20 flex-row items-center justify-start">
				<Text className="text-gray-100 font-digitalBold text-base">
					{time}
					<Text className="text-gray-100 font-rajdhaniBold text-base">
						{" "}({period === 'firstHalf' ? '1º' : '2º'})
					</Text>
				</Text>
			</View>
		</View>
	)
}