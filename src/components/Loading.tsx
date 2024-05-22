import React from "react";
import { ActivityIndicator } from "react-native";

export default function Loading() {
	return (
		<ActivityIndicator
			className="flex-1 opacity-90 items-center justify-center text-yellow-100 bg-green-200"
			size='large' />
	)
}