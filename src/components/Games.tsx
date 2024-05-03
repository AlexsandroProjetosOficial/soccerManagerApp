import { Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import ButtonGames from "./ButtonGames";
import { useRouter } from "expo-router";
import React from "react";

interface IGamesProps {
	item: {
		id: string;
		clubs: string;
		category: string;
		date: string;
		location: string;
	}
}

export default function Games({ item: { id, clubs, category, date, location } }: IGamesProps) {
	const router = useRouter();

	return (
		<View className="w-full h-auto py-1 flex-1 flex-row items-center">
			<Image className="w-16 h-16 rounded-lg" source={{ uri: "https://github.com/AlexsandroProjetosOficial.png" }} />
			<View className="py-4 gap-2 w-full flex-1 flex-col ml-4 border-b-2 border-green-100">
				<View className="flex-row flex-1 items-center justify-between">
					<Text className="text-gray-100 font-rajdhaniBold text-lg">{clubs}</Text>
					<Text className="text-gray-200 font-rajdhaniBold text-sm">{category}</Text>
				</View>
				<View className="flex-row flex-1 items-center justify-between">
					<View className="flex-row flex-1 items-center">
						<MaterialIcons name="calendar-today" color={colors.gray[100]} />
						<Text className="text-gray-100 font-rajdhaniMedium text-sm ml-2">
							{date}
						</Text>
					</View>
					<Text className="text-gray-200 font-rajdhaniRegular text-sm">{location}</Text>
				</View>
				<View className="flex-row flex-1 gap-4 items-center justify-between">
					<ButtonGames
						label="Horario"
						onPress={() => router.push({ pathname: "/Timer", params: { game: id } })}
					/>
					<ButtonGames
						label="Jogo"
						onPress={() => router.push({ pathname: "/GameTimer", params: { game: id } })}
					/>
					<ButtonGames
						label="RDJ"
					/>
					<ButtonGames
						label="Sumula"
					/>
				</View>
			</View>
		</View>
	)
}