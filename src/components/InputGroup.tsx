import { forwardRef, useState } from 'react';
import { TextInput, Text, View } from "react-native";
import { colors } from "@/styles/colors";
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

export interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
	label: string;
}

const InputGroup = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
	({ label, children, ...props }, ref) => {
		const [secureTextEntry, setSecureTextEntry] = useState<boolean>(() => {
			if (label === 'Senha:') return true;

			return false;
		});

		return (
			<View className='w-full h-24 flex-col gap-1.5'>
				{label && <Text className='text-base font-rajdhaniBold text-gray-100'>{label}</Text>}
				<View className='flex-1 flex-row bg-green-300 p-4 rounded-lg border-2 border-green-100 items-center'>
					<TextInput
						className="flex-1 font-rajdhaniBold text-base text-green-100"
						placeholderTextColor={colors.opacity.green[100]}
						cursorColor={colors.green[100]}
						secureTextEntry={secureTextEntry}
						{...props}
					/>
					{label === 'Senha:' &&
						<MaterialIcons
							name={secureTextEntry ? 'visibility-off' : 'visibility'}
							color={colors.green[100]}
							size={20}
							onPress={() => setSecureTextEntry(oldState => !oldState)} />
					}
				</View>
			</View>
		)
	}
);

export { InputGroup }