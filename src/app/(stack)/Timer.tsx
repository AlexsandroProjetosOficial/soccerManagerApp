import { ScrollView, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import OfficialTimer from "@/components/OfficialTimer";
import { useLocalSearchParams } from "expo-router";
import React from 'react';
import { api } from "../../service/api";
import { useToast } from "../../components/Toast";
import Loading from "../../components/Loading";

interface IOfficials {
	id: string;
	isTime: boolean;
	avatar: string | null;
	name: string;
	phone: string;
	position: string;
}

export default function Timer() {
	const [officials, setOfficials] = useState<IOfficials[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingRegisterTime, setIsLoadingRegisterTime] = useState(false);
	const [matchOfficialSelected, setMatchOfficialSelected] = useState('');

	const params = useLocalSearchParams();
	const { game } = params;

	const { toast } = useToast();

	const handleRegisterTimer = async (matchOfficial: string) => {
		try {
			setMatchOfficialSelected(matchOfficial);
			setIsLoadingRegisterTime(oldState => !oldState);

			const data = {
				matchOfficial: matchOfficial,
				game: game,
			}

			const {
				status,
				data: {
					error,
					message,
					data: {
						officials
					}
				}
			} = await api.patch('/game/officials', data);

			if (status === 201 && !error) {
				setOfficials(officials);
				toast(message, 'success', 4000, 'top');

				setIsLoadingRegisterTime(oldState => !oldState);
			}

			setMatchOfficialSelected('');
		} catch (error) {
			setMatchOfficialSelected('');
			setIsLoadingRegisterTime(oldState => !oldState);
			toast('Não foi possível registrar o horário.', 'error', 4000, 'top');
		}
	}

	const getOfficials = useCallback(async () => {
		try {
			setIsLoading(oldState => !oldState);

			const {
				status,
				data: {
					error,
					message,
					data: {
						officials
					}
				}
			} = await api.get(`/game/officials?game=${game}`);

			if (status === 200 && !error) {
				setOfficials(officials);
				toast(message, 'success', 4000, 'top');

				setIsLoading(oldState => !oldState);
			}
		} catch (error) {
			toast('Oficiais da partida não encontrado.', 'error', 4000, 'top');
		}
	}, [game]);

	useEffect(() => {
		getOfficials();
	}, [getOfficials])

	return (
		<View className='w-full bg-green-200 flex-1 px-7'>
			{isLoading ? (
				<Loading />
			) : (
				<ScrollView>
					{officials.map(({ id, isTime, avatar, name, phone, position, }) => (
						<OfficialTimer
							key={id}
							id={id}
							matchOfficialSelected={matchOfficialSelected}
							isTime={isTime}
							avatar={avatar}
							handleRegisterTimer={() => handleRegisterTimer(id)}
							name={name}
							phoneNumber={phone}
							position={position}
							isLoading={isLoadingRegisterTime}
						/>
					))}
				</ScrollView>
			)}
		</View>
	)
}