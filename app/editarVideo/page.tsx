"use client"; // Isso marca o componente como um Componente de Cliente
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
  createdAt?: string;
  updateAt?: string;
}

const VideoManager: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    url: "",
    title: "",
    stage: "",
    curricularComponent: "",
    yearTeaching: 1,
    axis: [],
    skills: [],
    axisInput: "",
    skillsInput: "",
    createdAt: "",
    updateAt: "",
  });

  const videoId =
    typeof window !== "undefined"
      ? window.location.search.substring(1).replace(/[?=]/g, "")
      : "";

  const [resultMessage, setResultMessage] = useState<string>("");
  useEffect(() => {
    const fetchVideoData = async (id: string) => {
      try {
        const url = `http://localhost:3000/videosbncc/filter?id=${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Erro ao buscar vídeo.");
        }
        const data = await response.json();
        console.log("Dados recebidos:", data);

        if (Array.isArray(data) && data.length > 0) {
          const {
            url,
            title,
            stage,
            curricularComponent,
            yearTeaching,
            axis,
            skills,
            createdAt,
            updateAt,
          } = data[0];
          setFormData({
            url: url || "",
            title: title || "",
            stage: stage || "",
            curricularComponent: curricularComponent || "",
            yearTeaching: yearTeaching || 1,
            axis: axis || [],
            skills: skills || [],
            axisInput: "",
            skillsInput: "",
            createdAt: createdAt || "",
            updateAt: updateAt || "",
          });
        } else {
          console.error("Dados retornados no formato incorreto:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar vídeo:", error);
      } finally {
        setIsLoading(false); //!  Verifica se carregamento do GET foi feito
      }
    };

    fetchVideoData(videoId);
  }, [videoId]);
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
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
        [`${type}Input`]: "",
      }));
    }
  };

  const removeTag = (index: number, type: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [type]: (prev[type] as string[]).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formDataToSend: FormData = {
      ...formData,
      yearTeaching: parseInt(formData.yearTeaching.toString()),
      axis: formData.axis.map((tag) => tag.trim()),
      skills: formData.skills.map((tag) => tag.trim()),
    };
    try {
      const response = await fetch(
        `http://localhost:3000/videosbncc/update/${videoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSend),
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao atualizar vídeo.");
      }
      setResultMessage("Vídeo atualizado com sucesso!");
    } catch (error) {
      console.log("Erro ao atualizar vídeo:", error);
      setResultMessage(
        "Erro ao atualizar vídeo. Verifique se a URL já está em uso."
      );
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/videosbncc/delete/${videoId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Erro ao deletar vídeo.");
      }
      setResultMessage("Vídeo deletado com sucesso!");
      setTimeout(() => {
        window.location.href = "/consulta";
      }, 2000); //! Redirecionar para a pag de consulta dps 2 segundos
    } catch (error) {
      console.error("Erro ao deletar vídeo:", error);
      setResultMessage("Erro ao deletar vídeo.");
    }
  };
  const extractYouTubeVideoId = (url: string) => {
    const match = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/);
    return match ? match.pop() : null;
  };
  const youtubeVideoId = extractYouTubeVideoId(formData.url);
  return (
    <div className="text-black min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-4">
        <Image src={logo} alt="EducaRecife Logo" width={150} height={50} />
        <nav className="hidden md:flex space-x-4">
          <Link href="/consulta" passHref>
            <div className="cursor-pointer text-blue-500">CONSULTAR</div>
          </Link>
          <Link href="/cadastroVideo" passHref>
            <div className="cursor-pointer text-blue-500">CADASTRAR</div>
          </Link>
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col items-center space-y-1.5"
          >
            {isMenuOpen ? (
              <span className="block w-8 h-0.5 bg-blue-500 -translate-x-1.5 translate-y-1 rotate-45"></span>
            ) : (
              <>
                <span className="block w-8 h-0.5 bg-blue-500"></span>
                <span className="block w-8 h-0.5 bg-blue-500"></span>
                <span className="block w-8 h-0.5 bg-blue-500"></span>
              </>
            )}
            {isMenuOpen ? (
              <span className="block w-8 h-0.5 bg-blue-500 -translate-x-1.5 -translate-y-1 -rotate-45"></span>
            ) : null}
          </button>
          {isMenuOpen && (
            <div className="absolute right-5 mt-5 w-48 bg-blue-500 shadow-lg rounded">
              <Link href="/consulta" passHref>
                <div className="block px-4 py-2 text-white">CONSULTAR</div>
              </Link>
              <Link href="/cadastroVideo" passHref>
                <div className="block px-4 py-2 text-white">CADASTRAR</div>
              </Link>
            </div>
          )}
        </div>
      </header>
      <h1 className="text-3xl mb-4 text-center text-blue-500 font-bold">
        Gerenciar Vídeo
      </h1>
      <div className="flex flex-col lg:flex-row justify-center">
        <div className="lg:mr-12 mb-4 lg:mb-0">
          <img
            src={`https://img.youtube.com/vi/${youtubeVideoId}/0.jpg`}
            alt="Thumbnail do vídeo"
            className="object-cover h-48 w-96 rounded"
          />
          <p className="mt-2 text-sm text-gray-600">
            Cadastrado em: {formatDate(formData.createdAt)}
          </p>
          <p className="text-sm text-gray-600">
            Última Atualização em: {formatDate(formData.updateAt)}
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="url"
            placeholder="URL do vídeo no YouTube"
            value={formData.url}
            onChange={handleChange}
            required
            className="col-span-1 md:col-span-2 p-2 border border-gray-300 rounded"
          />
          <input
            name="title"
            placeholder="Título do vídeo no YouTube"
            value={formData.title}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            name="curricularComponent"
            placeholder="Componente Curricular"
            value={formData.curricularComponent}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Etapa</option>
            <option value="ensino-medio">Ensino infantil</option>
            <option value="ensino-fundamental">Ensino Fundamental</option>
          </select>
          <input
            name="yearTeaching"
            type="number"
            placeholder="Ano de Ensino"
            value={formData.yearTeaching}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <div className="col-span-1 p-2 border border-gray-300 rounded">
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
          <div className="col-span-1 p-2 border border-gray-300 rounded">
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
          <div className="col-span-1 md:col-span-2 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded"
            >
              Excluir
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
      <p className="text-center mt-4 font-semibold">{resultMessage}</p>
    </div>
  );
};

export default VideoManager;
