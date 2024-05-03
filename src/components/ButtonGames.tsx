import React from "react";
import { Text, TouchableOpacity } from "react-native";

export interface IButtonGames extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
	label: string;
}

export default function ButtonGames({ label, ...props }: IButtonGames) {
	return (
		<TouchableOpacity
			className='flex-1 rounded-lg h-9 bg-green-400 items-center justify-center'
			activeOpacity={0.7}
			{...props}
		>
			<Text
				className='text-base font-rajdhaniBold text-gray-100 items-center justify-center'
			>
				{label}
			</Text>
		</TouchableOpacity>
	)
}