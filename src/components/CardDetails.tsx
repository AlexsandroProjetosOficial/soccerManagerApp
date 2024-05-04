import React from "react";
import { Text, View } from "react-native";
import YellowCard from '@/assets/yellowCard.svg'
import RedCard from '@/assets/redCard.svg'

interface ICardDetails {
	playerNumber: number;
	time: string;
	period: string;
	type: 'yellow' | 'red';
}

export default function CardDetails({
	playerNumber,
	time,
	period,
	type
}: ICardDetails) {
	const renderCards = {
		'yellow': <YellowCard width={16} height={16} />,
		'red': <RedCard width={16} height={16} />
	}

	return (
		<View className="flex-row items-center justify-between">
			<Text className="text-gray-100 font-rajdhaniBold text-base">N {playerNumber}</Text>
			<Text className="text-gray-100 font-rajdhaniBold text-base">T {time} ({period === 'firstHalf' ? '1º' : '2º'})</Text>
			{renderCards[type]}
		</View>
	)
}