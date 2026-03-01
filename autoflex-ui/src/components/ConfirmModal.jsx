import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, errorMessage }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-100">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl scale-in-center">
        <div className="flex items-center gap-3 mb-4 text-amber-600">
          <div className="bg-amber-100 p-2 rounded-full">
            <AlertTriangle size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">{title || "Confirmar Exclusão"}</h2>
        </div>
        
        <p className="text-slate-600 mb-6">
          {message || "Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita."}
        </p>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded text-sm text-red-600 animate-pulse">
            <strong>Não é possível excluir:</strong> {errorMessage}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-md transition cursor-pointer font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition cursor-pointer font-medium"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}