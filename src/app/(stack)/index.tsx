import Union from '@/assets/union.svg';
import { View } from 'react-native';
import { InputGroup } from '@/components/InputGroup';
import { Button } from '@/components/Button';
import { SetStateAction, useState } from 'react';
import { useToast } from '@/components/Toast';
import { useRouter } from 'expo-router';
import React from 'react';

export default function Login() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { toast } = useToast();
	const router = useRouter();

	const handler = async () => {
		router.push('/Home')
		// if (email === '' || password === '') return toast('Preencha todos os campos.', 'warning', 4000, 'top');

		// if (email === 'alexsandrofpf2011@gmail.com' && password === 'Stx33608500++') {
		// 	setIsLoading(oldState => !oldState);

		// 	setTimeout(() => {
		// 		setIsLoading(oldState => !oldState);
		// 		toast('Login realizado com sucesso.', 'success', 4000, 'top');
		// 		router.push('/Home')
		// 	}, 1 * 5000);
		// } else {
		// 	toast('Usuario ou senha incorretos.', 'error', 4000, 'top');
		// }
	}

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
					<Button label='Entrar' bgColor='green' onPress={handler} isPressed={isLoading} />
				</View>
			</View>
		</View>
	)
}