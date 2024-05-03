import { SetStateAction, createContext, useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Professional from '@/assets/professional.svg'
import Base from '@/assets/base.svg'
import Amateur from '@/assets/amateur.svg'
import clsx from 'clsx';
import React from 'react';

interface CategoryGroupContextType {
	value: string;
	setValue: (value: string) => void;
}
const CategoryGroupContext = createContext<CategoryGroupContextType | undefined>(
	undefined
);

interface CateogryGroupProps {
	children: React.ReactNode;
	setValue: ([key]: string) => void;
	value: string;
}

function Category({ children, setValue, value }: CateogryGroupProps) {
	return (
		<CategoryGroupContext.Provider value={{ value, setValue }}>
			{children}
		</CategoryGroupContext.Provider>
	);
}

interface RadioGroupItemProps
	extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
	value: 'professional' | 'base' | 'amateur';
}

function CategoryItem({
	value,
	...props
}: RadioGroupItemProps) {
	const context = useContext(CategoryGroupContext);
	if (!context) {
		throw new Error('Category Group Item must be used within a RadioGroup');
	}
	const { value: selectedValue, setValue } = context;

	const icons = {
		professional: <Professional width={50} height={50} />,
		base: <Base width={50} height={50} />,
		amateur: <Amateur width={50} height={50} />,
	}

	const labelText = {
		professional: 'Profisional',
		base: 'Base',
		amateur: 'Amador',
	}

	return (
		<TouchableOpacity
			onPress={() => setValue(value)}
			className='rounded-lg border-2 border-green-100 w-32 h-36 bg-green-400 items-center justify-center gap-4 flex-col'
			activeOpacity={0.7}
			{...props}
		>
			<View
				className={clsx(
					'w-4 h-4 border border-green-100 rounded absolute right-2 top-2',
					{
						'bg-green-100': selectedValue === value,
					}
				)}
			>
			</View>
			<View className='flex flex-row items-center justify-center gap-2 mt-8'>
				{icons[value]}
			</View>
			{value && (
				<Text className='text-gray-100 text-lg font-rajdhaniBold'>{labelText[value]}</Text>
			)}
		</TouchableOpacity>
	);
}

export { Category, CategoryItem }