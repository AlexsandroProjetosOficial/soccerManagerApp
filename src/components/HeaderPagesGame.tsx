import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import React from "react";

export default function HeaderPagesGame({ ...props }) {
	console.log(props);
	return (
		<>
			<View className="w-full bg-green-400 flex-row h-30 px-7 pt-14 pb-5 justify-center items-center">
				<Text className="text-gray-100 text-2xl text-center font-rajdhaniBold">
					{props.options.headerTitle} -
					{" "}<Text className="text-yellow-100 text-2xl text-center font-rajdhaniBold">{props.route.params.half === 'first' ? '1º tempo' : '2º tempo'}</Text>
				</Text>
			</View>
		</>
	)
}