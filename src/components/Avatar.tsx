import { MaterialCommunityIcons } from "@expo/vector-icons";
import clsx from "clsx";
import React from "react"
import { Image, ImageProps } from "react-native"
import { colors } from "../styles/colors";

export interface AvatarProps extends ImageProps {
	width: 14 | 16 | 20;
	height: 14 | 16 | 20;
	uri: string;
}

export default function Avatar({ width, height, uri, ...rest }: AvatarProps) {
	return (
		uri && uri.length ? (
			<Image
				style={{ resizeMode: 'contain' }}
				className={clsx('rounded-lg', {
					'w-14': width === 14,
					'h-14': height === 14,
					'w-16': width === 16,
					'h-16': height === 16,
					'w-20': width === 20,
					'h-20': height === 20,
				})}
				source={{ uri: uri }}
				{...rest}
			/>
		) : (
			<MaterialCommunityIcons name="robot-dead" size={50} color={colors.gray[100]} />
		)
	)
}