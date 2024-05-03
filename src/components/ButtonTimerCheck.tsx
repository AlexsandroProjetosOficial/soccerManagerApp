import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";
import React from "react";

export interface IButtonGames extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {}

export default function ButtonTimerCheck() {
	return (
		<TouchableOpacity
			className='w-14 h-14 rounded-lg bg-green-400 items-center justify-center'
		>
			<MaterialIcons name="check" size={25} color={colors.green[100]}/>
		</TouchableOpacity>
	)
}