import { Text, View } from "react-native";
import { Button } from "./Button";
import { useState } from "react";
import { useRouter } from "expo-router";
import React from "react";

interface ISignOutProps {
	setOpen: (key: boolean) => void;
}

export default function SignOut({ setOpen }: ISignOutProps) {
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter()

	const handleSignOut = async () => {
		setIsLoading(oldState => !oldState);

		setTimeout(() => {
			setIsLoading(oldState => !oldState);

			router.navigate('/')
		}, 1 * 5000);
	}

	return (
		<View className="w-full p-7 flex-col items-center h-50 bg-green-300">
			<View className="flex-1 flex-row items-end justify-end">
				<Text className="font-rajdhaniMedium text-gray-100 text-lg">
					Deseja sair do
				</Text>
				<Text className="text-yellow-100 font-rajdhaniBold text-2xl"> Soccer</Text>
				<Text className="text-red-100 font-rajdhaniBold text-2xl">Manager</Text>
				<Text className="text-gray-100 font-rajdhaniMedium text-lg">?</Text>
			</View>
			<View className="flex flex-1 flex-row gap-4 mt-10 mb-6">
				<Button label='Não' bgColor='green' onPress={() => setOpen(false)} />
				<Button label='Sim' bgColor='red' onPress={handleSignOut} isPressed={isLoading} />
			</View>
		</View>
	)
}