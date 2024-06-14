"use client"; // Marca o componente como um Componente de Cliente

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Table from "../components/tabela/tabela";
import Image from "next/image";
import logo from "../../assets/logo.png";
import "../globals.css";
import { VideoBNCC } from "../types"; // Importar o tipo compartilhado

const Consulta: React.FC = () => {
  const [videos, setVideos] = useState<VideoBNCC[]>([]);
  const [filters, setFilters] = useState({
    id: "",
    title: "",
    url: "",
    stage: "",
    curricularComponent: "",
    yearTeaching: 0,
    axis: "",
    skills: "",
  });

  const [axisTags, setAxisTags] = useState<string[]>([]);
  const [skillsTags, setSkillsTags] = useState<string[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    let url = `http://localhost:3000/videosbncc/filter?`;

    if (axisTags.length > 0) {
      const paramsArray = axisTags.map((val) => encodeURIComponent(val.trim()));
      url += `axis=[${paramsArray.join(",")}]&`;
    }

    if (skillsTags.length > 0) {
      const paramsArray = skillsTags.map((val) =>
        encodeURIComponent(val.trim())
      );
      url += `skills=[${paramsArray.join(",")}]&`;
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== "axis" && key !== "skills") {
        url += `${key}=${encodeURIComponent(value)}&`;
      }
    });

    if (url.endsWith("&") || url.endsWith("?")) {
      url = url.slice(0, -1);
    }

    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setVideos(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Erro ao buscar vídeos:", error));
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTag = (type: string) => {
    const inputId = type === "axis" ? "axis" : "skills";
    const inputValue = (
      document.getElementById(inputId) as HTMLInputElement
    ).value.trim();

    if (inputValue !== "") {
      if (type === "axis") {
        setAxisTags([...axisTags, inputValue]);
        setSkillsTags([]);
      } else {
        setSkillsTags([...skillsTags, inputValue]);
        setAxisTags([]);
      }
      (document.getElementById(inputId) as HTMLInputElement).value = "";
    }
  };

  const removeTag = (type: string, index: number) => {
    if (type === "axis") {
      setAxisTags((prevTags) => prevTags.filter((_, i) => i !== index));
    } else {
      setSkillsTags((prevTags) => prevTags.filter((_, i) => i !== index));
    }
  };

  const handleSearch = () => {
    fetchVideos();
  };

  return (
    <div className="text-black min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-4">
        <Image src={logo} alt="EducaRecife Logo" width={150} height={50} />
        <nav>
          <Link href="/consulta" legacyBehavior>
            <a className="text-blue-500 hover:underline mr-4">CONSULTAR</a>
          </Link>
          <Link href="/cadastroVideo" legacyBehavior>
            <a className="text-blue-500 hover:underline">CADASTRAR VÍDEO</a>
          </Link>
        </nav>
        <div className="text-blue-500">Bem-vindo usuario</div>
      </header>
      <h1 className="text-3xl mb-4 text-center text-gray-700">Consultar</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          name="url"
          placeholder="URL do vídeo no YouTube"
          value={filters.url}
          onChange={handleFilterChange}
          className="col-span-2 p-2 border border-gray-300 rounded"
        />
        <input
          name="title"
          placeholder="Título do vídeo no YouTube"
          value={filters.title}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          name="stage"
          value={filters.stage}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Etapa</option>
          <option value="ensino-medio">Ensino Médio</option>
          <option value="ensino-fundamental">Ensino Fundamental</option>
        </select>
        <input
          name="curricularComponent"
          placeholder="Componente Curricular"
          value={filters.curricularComponent}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          name="yearTeaching"
          type="number"
          placeholder="Ano de Ensino"
          value={filters.yearTeaching}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
        <div className=" col-span-1 p-2 border border-gray-300 rounded">
          <div className="flex items-center">
            <input
              id="axis"
              name="axis"
              placeholder="Eixos"
              className="flex-grow p-2 border border-gray-300 rounded mr-2"
            />
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() => addTag("axis")}
            >
              Adicionar Eixo
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {axisTags.map((tag, index) => (
              <div
                key={index}
                className="bg-gray-200 p-1 rounded flex items-center"
              >
                {tag}
                <button
                  className="ml-2 text-red-500"
                  onClick={() => removeTag("axis", index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 p-2 border border-gray-300 rounded">
          <div className="flex items-center">
            <input
              id="skills"
              name="skills"
              placeholder="Habilidades"
              className="flex-grow p-2 border border-gray-300 rounded mr-2"
            />
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() => addTag("skills")}
            >
              Adicionar Habilidade
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {skillsTags.map((tag, index) => (
              <div
                key={index}
                className="bg-gray-200 p-1 rounded flex items-center"
              >
                {tag}
                <button
                  className="ml-2 text-red-500"
                  onClick={() => removeTag("skills", index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded text-lg"
        onClick={handleSearch}
      >
        Consultar
      </button>
      <Table videos={videos} />
    </div>
  );
};

export default Consulta;
