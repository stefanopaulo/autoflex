import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";

export default function SaveRawMaterial({ materialToEdit, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    stockQuantity: "",
  });

  useEffect(() => {
    if (materialToEdit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: materialToEdit.name || "",
        stockQuantity: materialToEdit.stockQuantity || "",
      });
    }
  }, [materialToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      name: formData.name,
      stockQuantity: Number(formData.stockQuantity)
    };

    const url = materialToEdit
      ? `${import.meta.env.VITE_API_URL}/rawMaterials/${materialToEdit.id}`
      : `${import.meta.env.VITE_API_URL}/rawMaterials`;

    const method = materialToEdit ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        onSave();
      } else {
        const errorData = await response.json();
        console.error("Erro do Back-end:", errorData);
        alert(`Erro ${response.status}: Verifique os campos.`);
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-800">
          {materialToEdit ? "Editar Matéria-prima" : "Nova Matéria-prima"}
        </h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Quantidade</label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Save size={18} />
            {materialToEdit ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}