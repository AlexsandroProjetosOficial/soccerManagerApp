import { forwardRef, useState } from 'react';
import { TextInput, Text, View } from "react-native";
import { colors } from "@/styles/colors";
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import clsx from 'clsx';

export interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
	color: 'yellow' | 'red' | 'green';
}

const InputGame = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
	({ children, color, ...props }, ref) => {

		return (
			<View className={clsx('flex w-1/2 rounded-lg h-14 justify-center items-center align-middle', {
				'border-2 border-yellow-100': color === 'yellow',
				'border-2 border-red-100': color === 'red',
				'border-2 border-green-100': color === 'green'
			})}>
				<TextInput
					className={clsx("font-digitalBold text-3xl", {
						'text-green-100': color === 'green',
						'text-yellow-100': color === 'yellow',
						'text-red-100': color === 'red'
					})}
					placeholderTextColor={colors.opacity[color][100]}
					cursorColor={colors[color][100]}
					{...props}
				/>
			</View>
		)
	});

export { InputGame }