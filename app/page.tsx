"use client"; // Isso marca o componente como um Componente de Cliente

import Link from "next/link";
import { useRouter } from "next/navigation"; // Usando useRouter do next/navigation
import { useState } from "react";
import Image from "next/image";
import logo from "../assets/logo.png"; // Importando a logo
import "../app/globals.css";

export default function Home() {
  const router = useRouter(); // Usando useRouter do next/navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:3000/employees/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        router.push("/consulta"); // Usando router.push para navegação
      } else {
        setError(data.message || "Falha no login");
      }
    } catch (error) {
      setError("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Versão Desktop */}
      <div className="hidden lg:flex w-screen h-screen">
        <div className="w-1/2 flex flex-col items-center bg-white relative">
          <div className="absolute top-8">
            <Image src={logo} alt="EducaRecife Logo" width={200} height={60} />
          </div>
          <div className="flex flex-col justify-center items-center flex-grow">
            <p className="text-4xl text-blue-500 text-center font-bold">
              Desperte seu potencial <br /> e alcance seus sonhos com o
              EducaRecife!
            </p>
          </div>
        </div>
        <div className="w-1/2 bg-blue-500 flex flex-col justify-center items-center">
          <form
            className="bg-white p-8 rounded shadow-md w-3/4 max-w-md"
            onSubmit={handleLogin}
          >
            <h2 className="text-2xl mb-4 text-center">Login</h2>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Seu email principal"
              className="w-full p-2 mb-4 border rounded text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              placeholder="Insira uma senha"
              className="w-full p-2 mb-4 border rounded text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center mb-4">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-black">
                Lembrar login?
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Fazer Login"}
            </button>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            <div className="flex justify-between mt-4 text-sm">
              <Link href="/cadastro" legacyBehavior>
                <a className="text-blue-500 hover:underline">SOLICITAR LOGIN</a>
              </Link>
              <Link href="/recuperar-senha" legacyBehavior>
                <a className="text-blue-500 hover:underline">RECUPERAR SENHA</a>
              </Link>
            </div>
            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>Suporte — Termos de Uso — Política de Privacidade</p>
              <p>Todos os Direitos Reservados | Secretaria de Educação</p>
            </div>
          </form>
        </div>
      </div>
      {/* Versão Mobile */}
      <div className="lg:hidden bg-white p-8 flex flex-col items-center justify-center w-screen h-screen">
        <Image src={logo} alt="EducaRecife Logo" width={200} height={60} />
        <p className="text-4xl text-blue-500 text-center font-bold mt-8 mb-10">
          Desperte seu potencial e alcance seus sonhos com o EducaRecife!
        </p>
        <div className="bg-blue-500 p-8 flex flex-col items-center w-full">
          <form
            className="bg-white p-8 rounded shadow-md w-full max-w-md"
            onSubmit={handleLogin}
          >
            <h2 className="text-2xl mb-4 text-center">Login</h2>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Seu email principal"
              className="w-full p-2 mb-4 border rounded text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              placeholder="Insira uma senha"
              className="w-full p-2 mb-4 border rounded text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center mb-4">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-black">
                Lembrar login?
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Fazer Login"}
            </button>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            <div className="flex justify-between mt-4 text-sm">
              <Link href="/cadastro" legacyBehavior>
                <a className="text-blue-500 hover:underline">SOLICITAR LOGIN</a>
              </Link>
              <Link href="/recuperar-senha" legacyBehavior>
                <a className="text-blue-500 hover:underline">RECUPERAR SENHA</a>
              </Link>
            </div>
            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>Suporte — Termos de Uso — Política de Privacidade</p>
              <p>Todos os Direitos Reservados | Secretaria de Educação</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
