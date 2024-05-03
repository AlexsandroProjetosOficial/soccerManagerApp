import React from "react"
import { Image, ImageProps } from "react-native"

export default function Avatar({ ...rest }: ImageProps) {
	return (
		<Image
		className="w-14 h-14 rounded-lg"
      {...rest}
    />
	)
}