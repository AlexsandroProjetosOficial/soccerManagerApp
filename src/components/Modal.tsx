import clsx from "clsx";
import React from "react";
import { ReactNode } from "react";
import { View, Modal as ModalComponent, TouchableOpacity, Text } from "react-native";

interface IModalProps {
	open: boolean;
	setOpen: (key: boolean) => void;
	children: ReactNode;
}

export default function Modal({ open, setOpen, children }: IModalProps) {
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
				<View className="flex flex-1 w-full justify-center items-center bg-green-400/80">
					<TouchableOpacity
						className={clsx(
							'absolute bottom-0 left-0 w-full',
						)}
						activeOpacity={0.7}
					>
						{children}
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		</ModalComponent>
	)
}