import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import { colors } from "../styles/colors";
import { Link } from "expo-router";
import ButtonTimer from "./ButtonTimer";
import ButtonTimerCheck from "./ButtonTimerCheck";
import React from 'react';

interface IOfficialTimer {
	isTime: boolean;
	avatar: string;
	name: string;
	position: string;
	phoneNumber: string;
	handleRegisterTimer: () => void;
}

export default function OfficialTimer({
	isTime,
	avatar,
	name,
	position,
	phoneNumber,
	handleRegisterTimer
}: IOfficialTimer) {
	return (
		<View className="flex-row h-auto mt-10 justify-between items-center">
			<Image className="w-16 h-16 rounded-lg" source={{ uri: avatar }} />
			<View className="w-full flex-1 ml-4 flex-row justify-between items-center border-b-2 border-green-100 pb-2">
				<View className="flex-col">
					<Text className="text-gray-100 font-rajdhaniBold text-lg">{name}</Text>
					<Text className="text-gray-200 font-rajdhaniRegular text-sm mb-4">{position}</Text>
					<View className="flex-row items-end justify-start">
						<MaterialIcons name="phone" color={colors.gray[200]} size={15} />
						<Link href={`tel:${phoneNumber.match(/[0-9]+/g)?.join('')}`} className="ml-2">
							<Text className="text-gray-200 font-rajdhaniRegular text-sm">{phoneNumber}</Text>
						</Link>
					</View>
				</View>
				{isTime ? (
					<ButtonTimerCheck />
				) : (
					<ButtonTimer onPress={handleRegisterTimer}/>
				)}
			</View>
		</View>
	)
}