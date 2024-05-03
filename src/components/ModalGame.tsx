import clsx from "clsx";
import React from "react";
import { ReactNode } from "react";
import { View, Modal as ModalComponent, TouchableOpacity, Text } from "react-native";

interface IModalProps {
	open: boolean;
	setOpen: (key: boolean) => void;
	children: ReactNode;
}

export default function ModalGame({ open, setOpen, children }: IModalProps) {
	return (
		<ModalComponent
			transparent
			animationType="fade"
			visible={open}
			onRequestClose={() => setOpen(false)}
		>
			<TouchableOpacity
				className="w-full h-full"
				onPress={() => setOpen(false)}
			>
				<View className="flex w-full bg-green-400 absolute bottom-0 left-0">
					<TouchableOpacity
						activeOpacity={0.7}
					>
						{children}
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		</ModalComponent>
	)
}