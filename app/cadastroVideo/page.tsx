"use client"; // Isso marca o componente como um Componente de Cliente
import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo.png";
import "../globals.css";

interface FormData {
  url: string;
  title: string;
  stage: string;
  curricularComponent: string;
  yearTeaching: number;
  axis: string[];
  skills: string[];
  axisInput: string;
  skillsInput: string;
}

const CadastroVideo: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    url: "",
    title: "",
    stage: "",
    curricularComponent: "",
    yearTeaching: 0,
    axis: [],
    skills: [],
    axisInput: "",
    skillsInput: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTag = (value: string, type: keyof FormData) => {
    if (value.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        [type]: [...(prev[type] as string[]), value.trim()],
        [`${type}Input`]: "", // Limpar o input após adicionar a tag
      }));
    }
  };

  const removeTag = (index: number, type: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [type]: (prev[type] as string[]).filter((_, i) => i !== index),
    }));
  };

  const [resultMessage, setResultMessage] = useState<string>("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formDataToSend: FormData = {
      ...formData,
      yearTeaching: parseInt(formData.yearTeaching.toString()), // Converter para número inteiro
      axis: formData.axis.map((tag) => tag.trim()), // Remover espaços em branco
      skills: formData.skills.map((tag) => tag.trim()), // Remover espaços em branco
    };
    try {
      const response = await fetch(
        `https://seduc-api.vercel.app/videosbncc/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSend),
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao cadastrar vídeo.");
      }
      setResultMessage("Vídeo cadastrado com sucesso!");
    } catch (error) {
      console.log("Erro ao cadastrar vídeo:", error);
      setResultMessage(
        "Erro ao cadastrar vídeo. Verifique se a URL já está em uso."
      );
    }
  };

  return (
    <div className="text-black min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-4">
        <Image src={logo} alt="EducaRecife Logo" width={150} height={50} />
        <nav className="flex space-x-4">
          <Link href="/consulta" passHref>
            <div className="text-blue-500 hover:underline">CONSULTAR</div>
          </Link>
          <Link href="/cadastroVideo" passHref>
            <div className="text-blue-500 hover:underline">CADASTRAR</div>
          </Link>
        </nav>
        <div className="text-blue-500">Bem vindo usuário</div>
      </header>
      <h1 className="text-3xl mb-4 text-center text-gray-700">
        Cadastrar vídeo
      </h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <input
          name="title"
          placeholder="Título do vídeo no YouTube"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          name="url"
          placeholder="URL do vídeo no YouTube"
          value={formData.url}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Etapa</option>
          <option value="ensino-medio">Ensino Infantil</option>
          <option value="ensino-fundamental">Ensino Fundamental</option>
        </select>
        <input
          name="curricularComponent"
          placeholder="Componente Curricular"
          value={formData.curricularComponent}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          name="yearTeaching"
          type="number"
          placeholder="Ano de Ensino"
          value={formData.yearTeaching}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <div className="mb-2 p-2 border border-gray-300 rounded">
          <div className="flex items-center">
            <input
              name="axisInput"
              placeholder="Novo Eixo"
              value={formData.axisInput}
              onChange={handleChange}
              className="flex-grow p-2 border border-gray-300 rounded mr-2"
            />
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() => addTag(formData.axisInput, "axis")}
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.axis.map((tag, index) => (
              <div
                key={index}
                className="bg-gray-200 p-1 rounded flex items-center"
              >
                {tag}
                <button
                  className="ml-2 text-red-500"
                  onClick={() => removeTag(index, "axis")}
                >
                  &#x2716;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Input para adicionar nova habilidade */}
        <div className="mb-2 p-2 border border-gray-300 rounded">
          <div className="flex items-center">
            <input
              name="skillsInput"
              placeholder="Nova Habilidade"
              value={formData.skillsInput}
              onChange={handleChange}
              className="flex-grow p-2 border border-gray-300 rounded mr-2"
            />
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() => addTag(formData.skillsInput, "skills")}
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.skills.map((tag, index) => (
              <div
                key={index}
                className="bg-gray-200 p-1 rounded flex items-center"
              >
                {tag}
                <button
                  className="ml-2 text-red-500"
                  onClick={() => removeTag(index, "skills")}
                >
                  &#x2716;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Botão de submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Adicionar
        </button>
      </form>
      <p className="text-center mt-4">{resultMessage}</p>
    </div>
  );
};

export default CadastroVideo;
