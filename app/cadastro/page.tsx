"use client"; // Isso marca o componente como um Componente de Cliente

import Link from "next/link";
import "../globals.css";
import { useState } from "react";
import Image from "next/image";
import logo from "../../assets/logo.png"; // Importando a logo

export default function Cadastro() {
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificação básica para garantir que todos os campos estão preenchidos
    if (!name || !post || !email || !password) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `http://localhost:3000/employees/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, post }),
        }
      );

      const data = await res.json();
      console.log("Response data:", data); // Adicionado para depuração

      if (res.ok) {
        setSuccess("Cadastro realizado com sucesso!");
        // Limpar formulário após sucesso
        setName("");
        setPost("");
        setEmail("");
        setPassword("");
      } else {
        if (data.message === "Colaborador já cadastrado") {
          setError("Colaborador já cadastrado");
        } else {
          setError(data.message || "Erro ao realizar cadastro");
        }
      }
    } catch (error) {
      console.error("Erro de conexão:", error); // Adicionado para depuração
      setError("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Versão Desktop */}
      <div className="hidden lg:flex w-screen h-screen">
        <div className="w-1/2 flex flex-col items-center bg-white relative">
          <div className="absolute top-8">
            <Link href="/" legacyBehavior className="cursor-pointer">
              <Image
                src={logo}
                alt="EducaRecife Logo"
                width={200}
                height={60}
                className="cursor-pointer"
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center items-start flex-grow p-8">
            <p className="text-3xl text-blue-500 font-bold">
              Nunca foi tão fácil transformar seu conhecimento em oportunidades
              com o EducaRecife!
            </p>
            <p className="mt-4 text-lg text-black">
              Estamos aqui para te guiar desde o primeiro passo.{" "}
              <span className="text-blue-500">Solicite o seu acesso!</span>
            </p>
          </div>
        </div>
        <div className="w-1/2 bg-blue-500 flex flex-col justify-center items-center">
          <form
            className="bg-white p-8 rounded shadow-md w-3/4 max-w-md"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl mb-4 text-center">Cadastro</h2>
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              placeholder="Seu nome completo"
              className="w-full p-2 mb-4 border rounded text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="block text-sm font-medium text-gray-700">
              Cargo
            </label>
            <input
              type="text"
              placeholder="Seu cargo na EducaRecife"
              className="w-full p-2 mb-4 border rounded text-black"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
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
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-sm text-black">
                Ao clicar aqui, (i) concordo com os Termos de Uso e Políticas,
                (ii) tenho ciência da Política de privacidade da EducaRecife e
                (iii) declaro ser maior de idade de acordo com a legislação
                aplicável.
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Solicitar acesso
            </button>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            {success && (
              <p className="mt-4 text-green-500 text-center">{success}</p>
            )}
            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>Suporte — Termos de Uso — Política de Privacidade</p>
              <p>Todos os Direitos Reservados | Secretaria de Educação</p>
            </div>
          </form>
        </div>
      </div>
      {/* Versão Mobile */}
      <div className="lg:hidden flex flex-col items-center justify-center w-screen h-screen bg-white">
        <div className="w-full flex flex-col items-center p-8">
          <Link href="/" legacyBehavior className="cursor-pointer">
            <Image
              src={logo}
              alt="EducaRecife Logo"
              width={200}
              height={60}
              className="cursor-pointer"
            />
          </Link>
          <p className="text-3xl text-blue-500 font-bold mt-8 text-center">
            Nunca foi tão fácil transformar seu conhecimento em oportunidades
            com o EducaRecife!
          </p>
          <p className="mt-4 text-lg text-black text-center">
            Estamos aqui para te guiar desde o primeiro passo.{" "}
            <span className="text-blue-500">Solicite o seu acesso!</span>
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <form
            className="bg-white p-8 rounded shadow-md w-full max-w-md"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl mb-4 text-center">Cadastro</h2>
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              placeholder="Seu nome completo"
              className="w-full p-2 mb-4 border rounded text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="block text-sm font-medium text-gray-700">
              Cargo
            </label>
            <input
              type="text"
              placeholder="Seu cargo na EducaRecife"
              className="w-full p-2 mb-4 border rounded text-black"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
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
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-sm text-black">
                Ao clicar aqui, (i) concordo com os Termos de Uso e Políticas,
                (ii) tenho ciência da Política de privacidade da EducaRecife e
                (iii) declaro ser maior de idade de acordo com a legislação
                aplicável.
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Solicitar acesso
            </button>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            {success && (
              <p className="mt-4 text-green-500 text-center">{success}</p>
            )}
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
