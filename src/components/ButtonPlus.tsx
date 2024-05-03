import { MaterialIcons } from '@expo/vector-icons';
import { forwardRef } from 'react';
import { TouchableOpacity } from "react-native";
import { colors } from '../styles/colors';
import React from 'react';

export interface ButtonPlusProps extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {}

const ButtonPlus = forwardRef<React.ElementRef<typeof TouchableOpacity>, ButtonPlusProps>(
	({ ...props }, ref) => {

		return (
			<TouchableOpacity
				className='w-14 h-14 rounded-lg bg-red-100 items-center justify-center'
				activeOpacity={0.7}
				{...props}
			>
				<MaterialIcons name='add' size={25} color={colors.gray[100]}/>
			</TouchableOpacity>
		)
	}
);

export { ButtonPlus }