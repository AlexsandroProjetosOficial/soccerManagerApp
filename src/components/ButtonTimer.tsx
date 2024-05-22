import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";
import React from "react";

export interface IButtonGames extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
	isLoading: boolean;
	id: string;
	idSelected: string;
}

export default function ButtonTimer({ isLoading, id, idSelected, ...props }: IButtonGames) {
	return (
		<TouchableOpacity
			className='w-14 h-14 rounded-lg bg-red-100 items-center justify-center'
			activeOpacity={0.7}
			{...props}
		>
			{isLoading && id === idSelected ? <ActivityIndicator className="text-yellow-100" size='small' /> : <MaterialIcons name="watch-later" size={25} color={colors.gray[100]} />}
		</TouchableOpacity>
	)
}