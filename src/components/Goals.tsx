import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { InputGame } from "./InputGame";
import { Button } from "./Button";
import Avatar from "./Avatar";

interface IPlayerRegisteredCard {
	teamId: string;
	type: string;
}
interface IGoals {
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
	isLoadingRegisterDetails: boolean;
	setPlayerRegisterCardOne: (value: string) => void;
	handleRegisterDetails: (props: IPlayerRegisteredCard) => void;
	playerRegisterCardOne: string;
}

interface ITeam {
	id: string;
	avatar: string | null;
}

export default function Goals({
	team,
	isLoadingRegisterDetails,
	setPlayerRegisterCardOne,
	playerRegisterCardOne,
	handleRegisterDetails
}: IGoals) {
	const [teamSelected, setTeamSelected] = useState<ITeam | null>(null);

	return (
		<View className="w-full p-7 flex-col items-center">
			<Text className="font-rajdhaniBold text-gray-100 text-2xl">
				Gols
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
					<InputGame keyboardType="number-pad" color='green' maxLength={3} value={playerRegisterCardOne} onChangeText={(value) => setPlayerRegisterCardOne(value)} />
					<Button isPressed={isLoadingRegisterDetails} label='Salvar' bgColor='green' onPress={() => handleRegisterDetails({ teamId: teamSelected.id, type: 'goal' })} />
				</View>
			) : ''}
		</View>
	)
}