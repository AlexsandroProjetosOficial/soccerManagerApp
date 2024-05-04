import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { InputGame } from "./InputGame";
import { Button } from "./Button";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

interface IGoals {
	team: {
		home: {
			id: string;
			avatar: string;
		};
		away: {
			id: string;
			avatar: string;
		}
	};
}

interface ITeam {
	id: string;
	avatar: string;
}

export default function Goals({
	team,
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
						<Image className="w-20 h-20 rounded-lg" source={{ uri: team.home.avatar }} />
					</TouchableOpacity>
					<Text className="text-yellow-100 font-rajdhaniBold text-3xl">X</Text>
					<TouchableOpacity onPress={() => setTeamSelected(team.away)}>
						<Image className="w-20 h-20 rounded-lg" source={{ uri: team.away.avatar }} />
					</TouchableOpacity>
				</View>
			) : ''}

			{teamSelected ? (
				<View className="flex flex-row gap-4 mt-10 mb-6 items-center justify-between">
					<Image className="w-20 h-20 rounded-lg" source={{ uri: teamSelected.avatar }} />
					<InputGame keyboardType="number-pad" color='green' maxLength={3}/>
					<Button label='Salvar' bgColor='green' />
				</View>
			) : ''}
		</View>
	)
}