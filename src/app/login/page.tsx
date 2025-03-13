'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { useState } from "react"
export default function LoginFunc() {
    const [isMenuLogin, setIsMenuLogin] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const { login } = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Regex para validar o username
        const usernameRegex = /^(?!.*\.\.)(?!.*__)(?!.*\.$)(?!.*_$)[a-zA-Z0-9._]{6,10}$/;

        // Regex para validar a senha
        const passwordRegex = /^[\w@$!%*?&]{6,30}$/;

        // Validação do username
        if (!usernameRegex.test(username)) {
            toast.error("O nome de usuário deve ter entre 3 e 10 caracteres e pode conter apenas letras, números, '.' e '_'.");
            return;
        }

        // Validação da senha
        if (!passwordRegex.test(password)) {
            toast.error("A senha deve ter entre 6 e 30 caracteres e conter pelo menos uma letra maiúscula, uma letra minúscula e um número.");
            return;
        }

        // verifica se as senhas são compatíveis
        if (!isMenuLogin && password !== confirmPassword) {
            toast.error("As senhas não coincidem.");
            return;
        }

        const url = isMenuLogin ? '/api/auth/login' : '/api/auth/register';
        const payload = isMenuLogin ? { username, password } : { username, password };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error || "Erro ao processar a requisição");
                return;
            }

            // Se for Register
            if (!isMenuLogin) {
                toast.success('Cadastro realizado com sucesso! Faça login para continuar');
                setIsMenuLogin(true);
                setUsername('');
                setPassword('');
                setConfirmPassword('');

            } else {
                // Salvar o token no localStorage
                toast.success("Login realizado com sucesso!")
                login(data.user, data.token)
                router.push('/')
            }

        } catch (error) {
            toast.error("Erro no servidor. Tente novamente")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="mt-5 w-[95%] mx-auto max-w-[550px] outline-gray-300 outline outline-1 rounded-sm dark:outline-gray-600 ease-in-out duration-300
            flex flex-col px-4 shadow-md">
                <h1 className="my-2 text-xl font-semibold">{isMenuLogin ? "Bem-vindo de volta!" : "Crie sua conta"}</h1>
                <div className="flex flex-col gap-y-2">
                    <div className="flex flex-col">
                        <label htmlFor="">{isMenuLogin ? "Digite seu usuário" : "Escolha um nome de usuário"}</label>
                        <input type="text" placeholder="Usuário"
                            className="input-loginPage"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">{isMenuLogin ? "Digite sua senha" : "Escolha sua senha"}</label>
                        <div className="div-input-loginPage">
                            <input type={showPassword ? "text" : "password"} placeholder={showPassword ? "Senha" : "•••••••••"}
                                className="py-1 pl-1 rounded-sm outline-none grow dark:bg-black duration-300 ease-in-out"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FontAwesomeIcon className="p-2 cursor-pointer duration-300 ease-in-out bg-white dark:bg-black" icon={showPassword ? faEye : faEyeSlash}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>
                    {!isMenuLogin &&
                        <div className="flex flex-col">
                            <label htmlFor="">Redigite sua senha</label>
                            <div className="div-input-loginPage">
                                <input type={showConfirmPassword ? "text" : "password"} placeholder={showConfirmPassword ? "Confirmar senha" : "•••••••••"}
                                    className="py-1 pl-1 rounded-sm outline-none grow dark:bg-black duration-300 ease-in-out"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <FontAwesomeIcon className="p-2 cursor-pointer duration-300 ease-in-out bg-white dark:bg-black" icon={showConfirmPassword ? faEye : faEyeSlash}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            </div>
                        </div>}

                </div>
                <p className="mt-2 ">{isMenuLogin ? "Novo por aqui?" : "Já faz parte?"} <span className="cursor-pointer font-semibold hover:underline"
                    onClick={() => { setIsMenuLogin(!isMenuLogin); setUsername(''); setPassword('') }}
                >{isMenuLogin ? "Cadastre-se" : "Entre aqui"}</span></p>
                <button type="submit" className="py-2 my-4 bg-black dark:bg-white text-white dark:text-black rounded-sm duration-300 ease-in-out transition-colors font-semibold">{isMenuLogin ? "Entrar" : "Criar Conta"}</button>
            </form>
        </div>
    )
}