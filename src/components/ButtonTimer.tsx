import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";
import React from "react";

export interface IButtonGames extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {}

export default function ButtonTimer({ ...props }: IButtonGames) {
	return (
		<TouchableOpacity
			className='w-14 h-14 rounded-lg bg-red-100 items-center justify-center'
			activeOpacity={0.7}
			{...props}
		>
			<MaterialIcons name="watch-later" size={25} color={colors.gray[100]}/>
		</TouchableOpacity>
	)
}