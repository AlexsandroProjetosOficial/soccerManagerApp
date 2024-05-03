import { ScrollView, View } from "react-native";
import { useState } from "react";
import OfficialTimer from "@/components/OfficialTimer";
import { useLocalSearchParams } from "expo-router";
import moment from 'moment';
import React from 'react';

interface IReferee {
	refereeId: string;
	isTime: boolean;
	avatar: string;
	name: string;
	phoneNumber: string;
	position: string;
}

export default function Timer() {
	const [referees, setReferees] = useState<IReferee[]>([
		{
			refereeId: 'e658a570-6fc2-434b-8311-713742fb11e8',
			isTime: false,
			avatar: "https://github.com/AlexsandroProjetosOficial.png",
			name: "Alexsandro Euzebio da Silva",
			phoneNumber: "5541987383752",
			position: "Arbitro"
		},
		{
			refereeId: 'bdcd82d4-f6bf-4412-bd2e-1371c89b1af8',
			isTime: false,
			avatar: "https://github.com/AlexsandroProjetosOficial.png",
			name: "Alexsandro Euzebio da Silva",
			phoneNumber: "5541987383752",
			position: "Arbitro Assistente"
		},
	])
	const params = useLocalSearchParams();
	const { game } = params;

	console.log('game', game);

	const handleRegisterTimer = async (refereeId: string) => {
		const currentTimer = moment().format('YYYY-MM-DDTHH:mm:ss');
		const refereesTmp = [...referees];

		console.log(currentTimer);

		refereesTmp.map(referee => {
			if (referee.refereeId === refereeId) {
				referee.isTime = true
			}
		});

		setReferees(refereesTmp);
	}

	return (
		<View className='w-full bg-green-200 flex-1 px-7'>
			<ScrollView>
				{referees.map(({ refereeId, isTime, avatar, name, phoneNumber, position, }) => (
					<OfficialTimer
						key={refereeId}
						isTime={isTime}
						avatar={avatar}
						handleRegisterTimer={() => handleRegisterTimer(refereeId)}
						name={name}
						phoneNumber={phoneNumber}
						position={position}
					/>
				))}
			</ScrollView>
		</View>
	)
}