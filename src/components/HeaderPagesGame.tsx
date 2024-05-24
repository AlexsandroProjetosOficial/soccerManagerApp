import { Text, View } from "react-native";
import React from "react";

export default function HeaderPagesGame({ ...props }) {
	return (
		<>
			<View className="w-full bg-green-400 flex-row h-30 px-7 pt-7 pb-5 justify-center items-center">
				<Text className="text-gray-100 text-2xl text-center font-rajdhaniBold">
					{props.options.headerTitle} -
					{" "}<Text className="text-yellow-100 text-2xl text-center font-rajdhaniBold">{props.route.params.half === 'firstHalf' ? '1º tempo' : '2º tempo'}</Text>
				</Text>
			</View>
		</>
	)
}