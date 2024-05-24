import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import ButtonGames from "./ButtonGames";
import { useRouter } from "expo-router";
import React from "react";
import Avatar from "./Avatar";

interface IGamesProps {
	item: {
		id: string;
		league: string;
		avatar: string | null;
		teams: string;
		category: string;
		nivel: string;
		date: string;
		location: string;
		status: string;
		isAllArrived: boolean;
	}
}

export default function Games({ item: { id, league, avatar, teams, category, date, location, isAllArrived, status } }: IGamesProps) {
	const router = useRouter();

	return (
		<View className="w-full h-auto py-1 flex-1 flex-col items-center">
			<View className="w-full h-auto py-1 flex-1 flex-row items-center">
				<Avatar width={16} height={16} uri={avatar || ''} />
				<View className="py-4 gap-2 w-full flex-1 ml-6 flex-col">
					<View className="flex-row flex-1 items-center">
						<Text className="text-gray-100 font-rajdhaniBold text-base">{league}</Text>
					</View>
					<View className="flex-row flex-1 items-center justify-between">
						<Text className="text-gray-100 font-rajdhaniBold text-lg">{teams}</Text>
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
				</View>
			</View>
			<View className="flex-row gap-3 items-center justify-between border-b-2 border-green-100 pb-4">
				<ButtonGames
					label="Horario"
					onPress={() => router.push({ pathname: "/Timer", params: { game: id } })}
					disabled={isAllArrived}
					isAllArrived={isAllArrived}
				/>
				<ButtonGames
					label="Jogo"
					onPress={() => router.push({ pathname: "/GameTimer", params: { game: id } })}
					disabled={status === 'Concluído' ? true : false}
					completed={status === 'Concluído' ? true : false}
				/>
				<ButtonGames
					label="Pênaltis"
				/>
				<ButtonGames
					label="RDJ"
				/>
				<ButtonGames
					label="Sumula"
					onPress={() => router.push({ pathname: "/Summary", params: { game: id } })}
				/>
				<ButtonGames
					label="Mais"
				/>
			</View>
		</View>
	)
}