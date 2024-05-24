import { Text, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";
import { ButtonPlus } from "./ButtonPlus";
import Modal from "./Modal";
import { useState } from "react";
import SignOut from "./SignOut";
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
	const [open, setOpen] = useState(false);

	const { userData } = useAuth();

	return (
		<>
			<Modal open={open} setOpen={setOpen}>
				<SignOut setOpen={setOpen} />
			</Modal>

			<View className="w-full bg-green-400 flex-row h-30 px-7 pt-7 pb-5 items-center justify-between">
				<TouchableOpacity onPress={() => setOpen(true)}>
					<Avatar width={14} height={14} uri={userData.avatar || ''} />
				</TouchableOpacity>
				<View className="flex-1 h-14 ml-6 flex-col gap-2">
					<View className="flex-1 flex-row">
						<Text className="text-gray-100 text-2xl font-rajdhaniMedium">Ola,</Text>
						<Text className="text-gray-100 text-2xl font-rajdhaniBold ml-3">Alexsandro</Text>
					</View>
					<Text className="text-gray-200 text-sm font-rajdhaniRegular">Seus Jogos.</Text>
				</View>
				<ButtonPlus />
			</View>
		</>
	)
}