import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { InputGame } from "./InputGame";
import { Button } from "./Button";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

interface IPlayerSubstituitions {
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

export default function PlayerSubstituitions({
	team,
}: IPlayerSubstituitions) {
	const [teamSelected, setTeamSelected] = useState<ITeam | null>(null);

	return (
		<View className="w-full p-7 flex-col items-center">
			<View className="w-full flex-row justify-center items-center">
				{teamSelected ? <Image className="w-20 h-20 rounded-lg" source={{ uri: teamSelected?.avatar }} /> : ''}
				<Text className="font-rajdhaniBold text-gray-100 text-2xl">
					Substituições
				</Text>
			</View>
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
				<View className="w-full mt-10 flex-col items-center h-50">
					<View className="flex-1 flex-row justify-between items-center">
						<View className="flex-1 flex-row items-center justify-center">
							<MaterialIcons name="local-parking" size={50} color={colors.green[100]} />
							<InputGame keyboardType="number-pad" color='green' maxLength={1}/>
						</View>
						<View className="flex-1 flex-row items-center justify-center">
							<MaterialIcons name="north" size={50} color={colors.green[100]} />
							<InputGame keyboardType="number-pad" color='green' maxLength={3}/>
						</View>
						<View className="flex-1 flex-row items-center">
							<MaterialIcons name="south" size={50} color={colors.red[100]} />
							<InputGame keyboardType="number-pad" color='red' maxLength={3}/>
						</View>
					</View>
					<View className="flex-1 flex-row justify-between items-center mt-10">
						<Button label='Salvar' bgColor='green' />
					</View>
				</View>
			) : ''}
		</View>
	)
}