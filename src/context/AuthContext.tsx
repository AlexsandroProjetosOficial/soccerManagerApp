import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { api } from "../service/api";
import { Alert } from "react-native";
import { useToast } from "../components/Toast";
import { useRouter } from "expo-router";

interface AuthProviderProps {
	children: ReactNode
}

interface userProps {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	avatar: string;
	created_at: Date;
	updated_at: Date;
}

export interface AuthContextDataProps {
	isUserLogged: boolean;
	isLoading: boolean;
	userData: userProps;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => void;
}

const AuthContext = createContext({} as AuthContextDataProps);

const AuthContextProvider = ({ children }: AuthProviderProps) => {
	const [isUserLogged, setIsUserLogged] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState({} as userProps);

	const { toast } = useToast();
	const router = useRouter();

	const signIn = async (email: string, password: string): Promise<void> => {
		try {
			if (!email || !password) {
				toast('Email ou senha inválido.', 'warning', 4000, 'top');
				return;
			}

			setIsLoading(oldState => !oldState);

			const data = {
				email: email,
				password: password
			};

			console.log('data', data);

			const hasHardware = await LocalAuthentication.hasHardwareAsync();
			const isEnrolled = await LocalAuthentication.isEnrolledAsync();

			const { status, data: { error, message, data: { user } } } = await api.post('/system/login', data);

			console.log('response', status, error, message, user);

			if (status === 200 && !error) {
				const useBio = await AsyncStorage.getItem("@useBio");

				if (hasHardware && isEnrolled && useBio === null) {
					await new Promise((resolve) => {
						Alert.alert('Biometria', 'Deseja user biometria para salvar o login?', [
							{
								text: "Sim",
								onPress: async () => {
									const bioPassed = await LocalAuthentication.authenticateAsync();

									if (bioPassed.success) {
										await AsyncStorage.setItem("@useBio", 'true');
										await AsyncStorage.setItem("@emailBio", email);
										await AsyncStorage.setItem("@passwordBio", password);
									}

									resolve('');
								}
							},
							{
								text: "Não",
								onPress: async () => {
									await AsyncStorage.setItem("@useBio", 'false');

									resolve('');
								}
							},
						]);
					});
				}
				setIsUserLogged(true);

				toast(message, 'success', 4000, 'top');

				setUserData(user);
				setIsLoading(oldState => !oldState);

				router.push('/Home');

				return;
			}

			setIsLoading(oldState => !oldState);

			return;
		} catch (error) {
			console.log(error);
			toast('Email ou senha inválido.', 'warning', 4000, 'top');
			return;
		}
	}

	const signOut = async () => {
		const { status, data: { error, message } } = await api.get('/system/logout');

		if (status === 200 && !error) {
			toast(message, 'success', 4000, 'top');
			router.push('/');
			setIsUserLogged(false);
		}
		console.log('response', status, error, message);
	}

	return (
		<AuthContext.Provider value={{
			signIn,
			signOut,
			userData,
			isUserLogged,
			isLoading
		}}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);

	return context;
};

export { AuthContextProvider, useAuth };