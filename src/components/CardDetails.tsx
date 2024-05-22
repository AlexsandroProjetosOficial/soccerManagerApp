import React from "react";
import { Text, View } from "react-native";
import YellowCard from '@/assets/yellowCard.svg'
import RedCard from '@/assets/redCard.svg'

interface ICardDetails {
	playerNumber: number;
	time: string;
	period: string;
	type: string;
}

export default function CardDetails({
	playerNumber,
	time,
	period,
	type
}: ICardDetails) {
	const renderCards = {
		'yellow_card': <YellowCard width={16} height={16} />,
		'red_card': <RedCard width={16} height={16} />
	}

	return (
		<View className="flex-row items-center justify-between">
			<Text className="text-gray-100 font-digitalBold text-base">N {playerNumber}</Text>
			<Text className="text-gray-100 font-digitalBold text-base">T {time} ({period === 'firstHalf' ? '1º' : '2º'})</Text>
			{renderCards[type as 'yellow_card' | 'red_card']}
		</View>
	)
}