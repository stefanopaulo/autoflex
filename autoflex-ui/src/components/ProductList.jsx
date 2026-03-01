import { useEffect, useState } from "react";
import { Trash2, ChevronLeft, ChevronRight, Plus, Pencil } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

export default function ProductList({ onEdit, onOpenDetails, onRefresh }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const openDeleteModal = (id) => {
    setIdToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/products/${idToDelete}`, {
        method: "DELETE",
      });
      setIsModalOpen(false);
      onRefresh();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products?page=${page}&size=10&sort=name`,
      );
      const json = await response.json();

      if (isMounted) {
        setData(json.content);
        setTotalPages(json.totalPages);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-sm font-semibold text-slate-700">
              Nome
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-slate-700">
              Preço
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 transition">
              <td className="px-6 py-4 text-sm text-slate-600 text-left">
                {item.name}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 text-left">
                {item.price}
              </td>
              <td className="px-6 py-4 text-right space-x-2">
                <button
                  onClick={() => onOpenDetails(item)}
                  className="text-green-600 hover:bg-blue-50 p-2 rounded cursor-pointer"
                >
                  <Plus size={18} />
                </button>

                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded cursor-pointer"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => openDeleteModal(item.id)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
        <span className="text-sm text-slate-500">
          Página {page + 1} de {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="p-2 border rounded disabled:opacity-30 hover:bg-white transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="p-2 border rounded disabled:opacity-30 hover:bg-white transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
