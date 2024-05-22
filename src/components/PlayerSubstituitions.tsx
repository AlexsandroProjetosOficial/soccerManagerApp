import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { InputGame } from "./InputGame";
import { Button } from "./Button";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import Avatar from "./Avatar";

interface IPlayerRegisteredCard {
	teamId: string;
	type: string;
}
interface IPlayerSubstituitions {
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
	setPlayerRegisterCardTwo: (value: string) => void;
	handleRegisterDetails: (props: IPlayerRegisteredCard) => void;
	playerRegisterCardOne: string;
	playerRegisterCardTwo: string;
	stopSubstituition: string;
	setStopSubstituition: (value: string) => void;
	setOpen: (value: boolean) => void;
}

interface ITeam {
	id: string;
	avatar: string | null;
}

export default function PlayerSubstituitions({
	team,
	isLoadingRegisterDetails,
	setPlayerRegisterCardOne,
	setPlayerRegisterCardTwo,
	handleRegisterDetails,
	playerRegisterCardOne,
	playerRegisterCardTwo,
	stopSubstituition,
	setStopSubstituition,
	setOpen
}: IPlayerSubstituitions) {
	const [teamSelected, setTeamSelected] = useState<ITeam | null>(null);

	return (
		<View className="w-full p-7 flex-col items-center">
			<View className="w-full flex-row justify-center items-center">
				{teamSelected?.avatar ? <Avatar width={20} height={20} uri={teamSelected?.avatar || ''} /> : ''}
				<Text className="font-rajdhaniBold text-gray-100 text-2xl ml-4">
					Substituições
				</Text>
			</View>
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
				<View className="w-full mt-10 flex-col items-center h-50">
					<View className="flex-1 flex-row justify-between items-center">
						<View className="flex-1 flex-row items-center justify-center">
							<MaterialIcons name="local-parking" size={50} color={colors.green[100]} />
							<InputGame keyboardType="name-phone-pad" color='green' value={stopSubstituition} onChangeText={(value) => setStopSubstituition(value)} />
						</View>
						<View className="flex-1 flex-row items-center justify-center">
							<MaterialIcons name="north" size={50} color={colors.green[100]} />
							<InputGame keyboardType="number-pad" color='green' maxLength={3} value={playerRegisterCardOne} onChangeText={(value) => setPlayerRegisterCardOne(value)} />
						</View>
						<View className="flex-1 flex-row items-center">
							<MaterialIcons name="south" size={50} color={colors.red[100]} />
							<InputGame keyboardType="number-pad" color='red' maxLength={3} value={playerRegisterCardTwo} onChangeText={(value) => setPlayerRegisterCardTwo(value)} />
						</View>
					</View>
					<View className="flex-1 flex-row justify-between items-center mt-10 gap-2">
						<Button isPressed={isLoadingRegisterDetails} label='Salvar' bgColor='green' onPress={() => handleRegisterDetails({ teamId: teamSelected.id, type: 'substitution' })} />
						<Button label='Limpar / Fechar' bgColor='red' onPress={() => { setStopSubstituition(''); setPlayerRegisterCardOne(''); setPlayerRegisterCardTwo(''); setOpen(false); }} />
					</View>
				</View>
			) : ''}
		</View>
	)
}