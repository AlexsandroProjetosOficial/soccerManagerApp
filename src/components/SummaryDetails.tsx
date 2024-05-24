import React, { useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/colors";
import YellowCard from '@/assets/yellowCard.svg'
import RedCard from '@/assets/redCard.svg'
import Loading from "./Loading";
import clsx from "clsx";
import ModalGame from "./ModalGame";
import { Button } from "./Button";
import { InputGame } from "./InputGame";
import CardSummaryDetail from "./CardSummaryDetails";
import GoalSummaryDetail from "./GoalSummaryDetail";
import SubstitutionSummaryDetail from "./SubstitutionSummaryDetail";

interface IDeleteDetailGame {
	detailGame: string | string[] | undefined;
	game: string | string[] | undefined
}

interface IUpdateGameDetail {
	gameDetail: string | string[] | undefined;
	game: string | string[] | undefined;
	column: string;
	value: string;
}

interface SummaryDetails {
	id: string | string[] | undefined;
	idSelected: string | string[] | undefined;
	symbol: 'yellow_card' | 'red_card' | 'goal' | 'substitution';
	period: string;
	time: string;
	game: string | string[] | undefined;
	playerOne: number;
	playerTwo?: number | null;
	stop?: string;
	isConfirmed: Boolean;
	handleDeleteGameDetails: (props: IDeleteDetailGame) => void;
	handleUpdateGameDetail: (props: IUpdateGameDetail) => void;
	isLoadingDelete: boolean;
	isLoadingUpdatedDetails: boolean;
};

export default function SummaryDetails({
	id,
	idSelected,
	symbol,
	period,
	time,
	playerOne,
	playerTwo,
	stop,
	isConfirmed,
	handleDeleteGameDetails,
	game,
	isLoadingDelete,
	handleUpdateGameDetail,
	isLoadingUpdatedDetails
}: SummaryDetails) {
	const [open, setOpen] = useState(false);
	const [type, setType] = useState<'yellow_card' | 'red_card' | 'goal' | 'substitution' | ''>('');

	const renderSymbol = {
		'yellow_card': <YellowCard width={16} height={16} />,
		'red_card': <RedCard width={16} height={16} />,
		'goal': <MaterialIcons name="sports-soccer" size={16} color={colors.green[100]} />,
		'substitution': <View className="flex-row items-center">
			<MaterialIcons name="north" size={16} color={colors.green[100]} />
			<MaterialIcons name="south" size={16} color={colors.red[100]} style={{ marginLeft: -8 }} />
		</View>
	}

	return (
		<View className="flex-row items-center justify-between">
			{renderSymbol[symbol]}
			{symbol === 'substitution' ? (
				<>
					<View className="w-8 flex-row items-center justify-end">
						<Text className="text-gray-100 font-rajdhaniBold text-xl">{stop}</Text>
					</View>
					<View className="w-30 flex-row items-center justify-between">
						<View className="flex-row items-center justify-start">
							<MaterialIcons name="north" size={16} color={colors.green[100]} />
							<Text className="text-gray-100 font-digitalBold text-xl">{playerOne}</Text>
						</View>
						<View className="flex-row items-center justify-start">
							<MaterialIcons name="south" size={16} color={colors.red[100]} />
							<Text className="text-gray-100 font-digitalBold text-xl">{playerTwo}</Text>
						</View>
						<View className="flex-row ml-4 items-center justify-start">
							<Text className="text-gray-100 font-rajdhaniBold text-xl">
								T{"  "}
								<Text className="text-gray-100 font-digitalBold text-xl">{time}</Text>
								{"  "}{stop === 'INT' ? 'INT' : period === 'firstHalf' ? '1º' : '2º'}
							</Text>
						</View>
					</View>
				</>
			) : (
				<>
					<Text className="text-gray-100 font-rajdhaniBold text-xl">
						N{" "}
						<Text className="text-gray-100 font-digitalBold text-xl">{playerOne}</Text>
					</Text>
					<Text className="text-gray-100 font-rajdhaniBold text-xl">
						T{"  "}
						<Text className="text-gray-100 font-digitalBold text-xl">{time}</Text>
						{"  "}{period === 'firstHalf' ? '1º' : '2º'}
					</Text>
				</>
			)}
			<TouchableOpacity
				className={clsx('', {
					'opacity-20': isConfirmed,
				})}
				disabled={isConfirmed ? true : false}
				onPress={() => handleUpdateGameDetail({ gameDetail: id, game: game, column: 'is_confirmed', value: 'true' })}
			>
				{isLoadingUpdatedDetails && id === idSelected ?
					<ActivityIndicator
						className="flex-1 opacity-90 items-center justify-center text-yellow-100 bg-green-200"
						size='small'
					/>
					:
					<FontAwesome name="check" size={25} color={isConfirmed ? colors.green[100] : colors.red[100]} />
				}

			</TouchableOpacity>
			<TouchableOpacity onPress={() => { setOpen(true); setType(symbol) }}>
				<FontAwesome name="pencil" size={25} color={colors.gray[100]} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleDeleteGameDetails({ detailGame: id, game: game })}>
				{isLoadingDelete && id === idSelected ?
					<ActivityIndicator
						className="flex-1 opacity-90 items-center justify-center text-yellow-100 bg-green-200"
						size='small'
					/>
					:
					<FontAwesome name="close" size={25} color={colors.red[100]} />
				}
			</TouchableOpacity>
			<ModalGame open={open} setOpen={setOpen}>
				{type === 'yellow_card' ? <CardSummaryDetail
					type={type}
					game={game}
					playerOne={playerOne}
					time={time}
					id={id}
					period={period}
					isLoadingUpdatedDetails={isLoadingUpdatedDetails}
					handleUpdateGameDetail={handleUpdateGameDetail}
				/> : ''}
				{type === 'red_card' ? <CardSummaryDetail
					type={type}
					game={game}
					playerOne={playerOne}
					time={time}
					id={id}
					period={period}
					isLoadingUpdatedDetails={isLoadingUpdatedDetails}
					handleUpdateGameDetail={handleUpdateGameDetail}
				/> : ''}
				{type === 'goal' ? <GoalSummaryDetail
					game={game}
					playerOne={playerOne}
					time={time}
					id={id}
					period={period}
					isLoadingUpdatedDetails={isLoadingUpdatedDetails}
					handleUpdateGameDetail={handleUpdateGameDetail}
				/> : ''}
				{type === 'substitution' ? <SubstitutionSummaryDetail
					game={game}
					playerOne={playerOne}
					playerTwo={playerTwo}
					time={time}
					id={id}
					period={period}
					stop={stop}
					isLoadingUpdatedDetails={isLoadingUpdatedDetails}
					handleUpdateGameDetail={handleUpdateGameDetail}
				/> : ''}
			</ModalGame>
		</View >
	)
}