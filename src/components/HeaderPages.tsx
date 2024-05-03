import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import React from "react";

export default function HeaderPages({ ...props }) {
	console.log(props);
	console.log(props.navigation);
	return (
		<>
			<View className="w-full bg-green-400 flex-row h-30 px-7 pt-14 pb-5 justify-center items-center">
				<TouchableOpacity className="w-1/4" activeOpacity={0.7} onPress={() => props.navigation.goBack()}>
					<MaterialIcons name="arrow-back" color={colors.gray[100]} size={30} />
				</TouchableOpacity>
				<Text className="text-gray-100 text-2xl text-center font-rajdhaniBold">{props.options.headerTitle}</Text>
			</View>
		</>
	)
}