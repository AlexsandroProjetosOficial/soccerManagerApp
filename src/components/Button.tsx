import { forwardRef } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import clsx from 'clsx';
import React from 'react';

export interface ButtonProps extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
	label: string;
	bgColor: string;
	isPressed?: boolean;
}

const Button = forwardRef<React.ElementRef<typeof TouchableOpacity>, ButtonProps>(
	({ label, bgColor, isPressed, ...props }, ref) => {
		return (
			<TouchableOpacity
				className={clsx('flex-1 h-14 rounded-lg items-center justify-center', {
					'bg-yellow-100': bgColor === 'yellow',
					'bg-red-100': bgColor === 'red',
					'bg-green-300 border-2 border-green-100': bgColor === 'green'
				})}
				activeOpacity={0.7}

				{...props}
			>
				<Text
					className={clsx('text-lg font-rajdhaniBold items-center justify-center', {
						'text-yellow-100': bgColor === 'green',
						'text-gray-100': bgColor === 'red',
						'text-red-100': bgColor === 'yellow'
					})}
				>
					{isPressed ? <ActivityIndicator className={clsx('', {
						'text-gray-100': bgColor === 'red',
						'text-red-100': bgColor === 'yellow',
						'text-yellow-100': bgColor === 'green',
					})} size='small' /> : label}
				</Text>
			</TouchableOpacity>
		)
	}
);

export { Button }