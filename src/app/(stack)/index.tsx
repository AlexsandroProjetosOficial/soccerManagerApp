import Union from '@/assets/union.svg';
import { View } from 'react-native';
import { InputGroup } from '@/components/InputGroup';
import { Button } from '@/components/Button';
import { SetStateAction, useState } from 'react';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
	const [email, setEmail] = useState<string>('alexsandrofpf2011@gmail.com');
	const [password, setPassword] = useState<string>('Stx33608500++');

	const { signIn, isLoading } = useAuth();

	const clear = () => {
		setEmail('');
		setPassword('');
	}

	return (
		<View className='w-full bg-green-200 h-full flex-1 items-center justify-around'>
			<View className='mt-6'>
				<Union />
			</View>
			<View className='w-full flex-col gap-4 px-6'>
				<InputGroup
					label='E-mail:'
					keyboardType="email-address"
					placeholder="Digite seu e-mail"
					value={email}
					autoCapitalize='none'
					onChangeText={(e: SetStateAction<string>) => setEmail(e)}
				/>
				<InputGroup
					label='Senha:'
					placeholder="Digite sua senha"
					value={password}
					autoCapitalize='none'
					onChangeText={(e: SetStateAction<string>) => setPassword(e)}
				/>
				<View className='w-full flex-row gap-4 justify-center mt-2'>
					<Button label='Limpar' bgColor='red' onPress={clear} />
					<Button label='Entrar' bgColor='green' onPress={() => signIn(email, password)} isPressed={isLoading} />
				</View>
			</View>
		</View>
	)
}