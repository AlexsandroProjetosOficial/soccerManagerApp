import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { InputGame } from "./InputGame";
import { Button } from "./Button";
import Avatar from "./Avatar";

interface IPlayerRegisteredCard {
	teamId: string;
	type: string;
}

interface ICards {
	color: 'red' | 'yellow' | 'green';
	team: {
		home: {
			id: string;
			avatar: string | null;
		};
		away: {
			id: string;
			avatar: string | null;
		}
	};
	handleRegisterDetails: (props: IPlayerRegisteredCard) => void;
	setPlayerRegisterCardOne: (value: string) => void;
	playerRegisterCardOne: string;
	isLoadingRegisterDetails: boolean;
}

interface ITeam {
	id: string;
	avatar: string | null;
}

export default function Cards({
	color,
	team,
	handleRegisterDetails,
	setPlayerRegisterCardOne,
	playerRegisterCardOne,
	isLoadingRegisterDetails
}: ICards) {
	const [teamSelected, setTeamSelected] = useState<ITeam | null>(null);

	return (
		<View className="w-full p-7 flex-col items-center">
			<Text className="font-rajdhaniBold text-gray-100 text-2xl">
				Cartão {color === 'yellow' ? 'Amarelo' : 'Vermelho'}
			</Text>
			{!teamSelected ? (
				<View className="flex w-full flex-row gap-4 mt-10 mb-6 items-center justify-between">
					<TouchableOpacity onPress={() => setTeamSelected(team.home)}>
						<Avatar width={20} height={20} uri={team.home.avatar || ''} />
					</TouchableOpacity>
					<Text className="text-yellow-100 font-rajdhaniBold text-3xl">X</Text>
					<TouchableOpacity onPress={() => setTeamSelected(team.away)}>
						<Avatar width={20} height={20} uri={team.away.avatar || ''} />
					</TouchableOpacity>
				</View>
			) : ''}

			{teamSelected ? (
				<View className="flex flex-row gap-4 mt-10 mb-6 items-center justify-between">
					<Avatar width={20} height={20} uri={teamSelected.avatar || ''} />
					<InputGame keyboardType="number-pad" color={color} value={playerRegisterCardOne} onChangeText={(value) => setPlayerRegisterCardOne(value)} maxLength={3} />
					<Button isPressed={isLoadingRegisterDetails} label='Salvar' bgColor={color} onPress={() => handleRegisterDetails({ teamId: teamSelected.id, type: color === 'yellow' ? 'yellow_card' : 'red_card' })} />
				</View>
			) : ''}
		</View>
	)
}