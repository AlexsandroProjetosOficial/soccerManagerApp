import { FlatList, Text, View } from "react-native";
import { Category, CategoryItem } from "@/components/Category";
import { useMemo, useState } from "react";
import Games from "@/components/Games";
import React from "react";

export default function Home() {
	const [value, setValue] = useState('professional');

	const games = [
		{
			id: '1',
			clubs: 'Coritiba SAF x Rio Branco',
			category: 'Sub 20',
			nivel: 'base',
			date: '23/03 as 15:30h',
			location: 'CT Bayard',
		},
		{
			id: '2',
			clubs: 'Coritiba SAF x Rio Branco',
			category: 'Sub 20',
			nivel: 'base',
			date: '23/03 as 15:30h',
			location: 'CT Bayard',
		},
		{
			id: '3',
			clubs: 'Coritiba SAF x Rio Branco',
			category: 'Sub 20',
			nivel: 'base',
			date: '23/03 as 15:30h',
			location: 'CT Bayard',
		},
		{
			id: '4',
			clubs: 'Coritiba SAF x Rio Branco',
			category: 'Sub 20',
			nivel: 'base',
			date: '23/03 as 15:30h',
			location: 'CT Bayard',
		},
		{
			id: '5',
			clubs: 'Coritiba SAF x Rio Branco',
			category: 'Sub 20',
			nivel: 'base',
			date: '23/03 as 15:30h',
			location: 'CT Bayard',
		},
		{
			id: '6',
			clubs: 'Coritiba SAF x Rio Branco',
			category: 'Sub 20',
			nivel: 'base',
			date: '23/03 as 15:30h',
			location: 'CT Bayard',
		},
		{
			id: '7',
			clubs: 'Coritiba SAF x Rio Branco',
			category: 'Sub 20',
			nivel: 'base',
			date: '23/03 as 15:30h',
			location: 'CT Bayard',
		},
		{
			id: '8',
			clubs: 'Coritiba SAF x Rio Branco',
			category: 'Sub 20',
			nivel: 'base',
			date: '23/03 as 15:30h',
			location: 'CT Bayard',
		},
		{
			id: '9',
			clubs: 'Coritiba SAF x Rio Branco',
			category: 'Sub 20',
			nivel: 'base',
			date: '23/03 as 15:30h',
			location: 'CT Bayard',
		},
		{
			id: '10',
			clubs: 'Coritiba SAF x Rio Branco',
			category: 'Sub 20',
			nivel: 'base',
			date: '23/03 as 15:30h',
			location: 'CT Bayard',
		},
		{
			id: '11',
			clubs: 'Coritiba SAF x Rio Branco',
			category: 'Sub 20',
			nivel: 'base',
			date: '23/03 as 15:30h',
			location: 'CT Bayard',
		},
		{
			id: '12',
			clubs: 'Coritiba SAF x Rio Branco',
			category: 'Profissional',
			nivel: 'professional',
			date: '23/03 as 15:30h',
			location: 'CT Bayard',
		},
		{
			id: '13',
			clubs: 'Coritiba SAF x Rio Branco',
			category: 'Adulto',
			nivel: 'amateur',
			date: '23/03 as 15:30h',
			location: 'CT Bayard',
		}
	]

	const gamesFiltered = useMemo(() => {
		return games.filter(game => game.nivel === value);
	}, [value, games])

	console.log('value category item', gamesFiltered);
	console.log('value category item', gamesFiltered.length);
	return (
		<View className='w-full bg-green-200 flex-1 px-7'>
			<View className="h-auto flex-row gap-4 mt-10 justify-center">
				<Category setValue={setValue} value={value}>
					<CategoryItem value="professional" />
					<CategoryItem value="base" />
					<CategoryItem value="amateur" />
				</Category>
			</View>
			<View className="flex mt-8 mb-4 flex-row h-auto justify-between items-end">
				<Text className="text-gray-100 font-rajdhaniBold text-xl">Jogos agendados</Text>
				<Text className="text-gray-200 font-rajdhaniRegular text-lg">Total {gamesFiltered.length}</Text>
			</View>
			<View className="pb-10">
				<FlatList
					showsVerticalScrollIndicator={false}
					data={gamesFiltered}
					renderItem={({ item }) => <Games item={item} />}
					keyExtractor={item => item.id}
				/>
			</View>
		</View>
	)
}