"use client"; // Isso marca o componente como um Componente de Cliente

import Link from "next/link";
import "../globals.css";
import { useState } from "react";
import Image from "next/image";
import logo from "../../assets/logo.png"; // Importando a logo

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!email) {
      setError("O campo de email é obrigatório.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const res = await fetch(`http://localhost:3000/api/recover-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccess(
          "Instruções de recuperação de senha enviadas para o seu email."
        );
        setEmail("");
      } else {
        const data = await res.json();
        setError(
          data.message || "Erro ao enviar instruções de recuperação de senha"
        );
      }
    } catch (error) {
      setError("Falha ao conectar ao servidor");
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
            <p className="text-4xl text-blue-500 font-bold">
              Esqueceu sua senha? Não se preocupe, estamos aqui para ajudar!
            </p>
            <p className="mt-5 text-xl text-black">
              Insira seu email abaixo e enviaremos instruções para recuperar sua
              senha.
            </p>
          </div>
        </div>
        <div className="w-1/2 bg-blue-500 flex flex-col justify-center items-center">
          <form
            className="bg-white p-8 rounded shadow-md w-3/4 max-w-md"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl mb-4 text-center text-blue-500">
              RECUPERAR SENHA
            </h2>
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
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Enviar Instruções
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
          <p className="text-4xl text-blue-500 font-bold mt-8 text-center">
            Esqueceu sua senha? Não se preocupe, estamos aqui para ajudar!
          </p>
          <p className="mt-5 text-xl text-black text-center">
            Insira seu email e enviaremos instruções para recuperar sua senha.
          </p>
        </div>
        <div className="w-full  flex flex-col justify-center items-center">
          <form
            className="bg-white p-8 rounded shadow-md w-full max-w-md"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl mb-4 text-center text-blue-500">
              RECUPERAR SENHA
            </h2>
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
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Enviar Instruções
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
