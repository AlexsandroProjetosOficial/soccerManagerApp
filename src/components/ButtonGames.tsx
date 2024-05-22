import clsx from "clsx";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export interface IButtonGames extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
	label: string;
	isAllArrived?: boolean;
	completed?: boolean;
}

export default function ButtonGames({ label, isAllArrived, completed, ...props }: IButtonGames) {
	return (
		<TouchableOpacity
			className={clsx('flex-1 rounded-lg h-9 bg-green-400 items-center justify-center', {
				'opacity-20': isAllArrived || completed,
			})}
			activeOpacity={0.7}
			{...props}
		>
			<Text
				className='text-sm font-rajdhaniBold text-gray-100 items-center justify-center'
			>
				{label}
			</Text>
		</TouchableOpacity>
	)
}