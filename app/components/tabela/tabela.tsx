import React from "react";
import Link from "next/link";
import { VideoBNCC } from "../../types"; 

interface TableProps {
  videos: VideoBNCC[];
  onEdit: (id: string) => void;
  onViewMore?: (id: string) => void; 
}

const Table: React.FC<TableProps> = ({
  videos,
  onEdit,
  onViewMore,
}) => {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-200">ID</th>
            <th className="px-4 py-2 border border-gray-200">Data Cadastro</th>
            <th className="px-4 py-2 border border-gray-200">Título do Vídeo</th>
            <th className="px-4 py-2 border border-gray-200">Ano de Ensino</th>
            <th className="px-4 py-2 border border-gray-200">Etapa</th>
            <th className="px-4 py-2 border border-gray-200">Eixos</th>
            <th className="px-4 py-2 border border-gray-200">Habilidades</th>
            <th className="px-4 py-2 border border-gray-200">Ações</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-200">{video.id}</td>
              <td className="px-4 py-2 border border-gray-200">{video.date}</td>
              <td className="px-4 py-2 border border-gray-200">{video.title}</td>
              <td className="px-4 py-2 border border-gray-200">{video.year}</td>
              <td className="px-4 py-2 border border-gray-200">{video.stage}</td>
              <td className="px-4 py-2 border border-gray-200">{video.axis}</td>
              <td className="px-4 py-2 border border-gray-200">{video.skills}</td>
              <td className="px-4 py-2 border border-gray-200 flex space-x-2">
                {onViewMore && (
                  <button
                    onClick={() => onViewMore(video.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
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