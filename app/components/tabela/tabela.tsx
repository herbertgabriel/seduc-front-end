import React from "react";
import Link from "next/link";
import { VideoBNCC } from "../../types";

interface TableProps {
  videos: VideoBNCC[];
  onViewMore?: (id: string) => void;
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
const formatSkillsAndAxis = (data: string | undefined) => {
  if (!data || data.length === 0) return "";
  let formattedString = "";
  for (let i = 0; i < data.length; i++) {
    formattedString += (i > 0 ? " | " : "") + data[i];
  }
  return formattedString;
};
const Table: React.FC<TableProps> = ({ videos, onViewMore }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-200">Data Cadastro</th>
            <th className="px-4 py-2 border border-gray-200">
              Título do Vídeo
            </th>
            <th className="px-4 py-2 border border-gray-200">Etapa</th>

            <th className="px-4 py-2 border border-gray-200">
              Componente Curricular
            </th>
            <th className="px-4 py-2 border border-gray-200">Ano de Ensino</th>
            <th className="px-4 py-2 border border-gray-200">Eixos</th>
            <th className="px-4 py-2 border border-gray-200">Habilidades</th>
            <th className="px-4 py-2 border border-gray-200">Ações</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-200">
                {formatDate(video.date)}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {video.title}
              </td>

              <td className="px-4 py-2 border border-gray-200">
                {video.stage}
              </td>

              <td className="px-4 py-2 border border-gray-200">
                {video.curricularComponent}
              </td>
              <td className="px-4 py-2 border border-gray-200">{video.year}</td>
              <td className="px-4 py-2 border border-gray-200">
                {formatSkillsAndAxis(video.axis)}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {formatSkillsAndAxis(video.skills)}
              </td>
              <td className="px-4 py-2 border border-gray-200 flex space-x-2">
                {onViewMore && (
                  <button
                    onClick={() => onViewMore(video.id)}
                    className="bg-blue-500 text-white px-3 py- rounded hover:bg-blue-600"
                  >
                    Ver mais
                  </button>
                )}
                <Link href={`/editarVideo?${video.id}`} legacyBehavior>
                  <a className="bg-blue-500 text-white text-sm text-center px-3 py-1 rounded hover:bg-blue-600">
                    Ver mais
                  </a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
