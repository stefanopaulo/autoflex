import { useState, useEffect } from "react";
import { X, Trash2, Edit2, Check } from "lucide-react";

export default function ProductDetails({ product, onClose, onRefresh }) {
  const [newMaterial, setNewMaterial] = useState({ rawMaterialId: "", quantityRequired: "" });
  const [editingId, setEditingId] = useState(null);
  const [editQty, setEditQty] = useState("");
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(product);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/rawMaterials?size=100`)
      .then(res => res.json())
      .then(json => setAvailableMaterials(json.content))
      .catch(err => console.error("Erro ao caragma materiais", err));
  }, []);

  const fetchUpdatedProduct = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${product.id}`);
    const updated = await res.json();
    setCurrentProduct(updated);
    onRefresh();
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    if (!newMaterial.rawMaterialId) {
      alert("Selecione uma matéria-prima!");
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${product.id}/materials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rawMaterialId: Number(newMaterial.rawMaterialId),
        quantityRequired: Number(newMaterial.quantityRequired)
      }),
    });

    if (response.ok) {
      setNewMaterial({ rawMaterialId: "", quantityRequired: "" });
      await fetchUpdatedProduct();
    }
  };

  const handleDeleteMaterial = async (materialId) => {
    await fetch(`${import.meta.env.VITE_API_URL}/products/${product.id}/materials/${materialId}`, {
      method: "DELETE",
    });

    await fetchUpdatedProduct();
  };

  const handleUpdateQty = async (materialId) => {
    await fetch(`${import.meta.env.VITE_API_URL}/products/${product.id}/materials/${materialId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantityRequired: Number(editQty) }),
    });
    setEditingId(null);
    await fetchUpdatedProduct();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-xl font-bold text-slate-800">Materiais de: {currentProduct.name}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><X /></button>
        </div>

        <form onSubmit={handleAddMaterial} className="bg-slate-50 p-4 rounded-lg mb-6 flex gap-3 items-end border border-slate-200">
          <div className="flex-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Matéria-prima</label>
            <select
              required
              value={newMaterial.rawMaterialId}
              onChange={(e) => setNewMaterial({ ...newMaterial, rawMaterialId: e.target.value })}
              className="w-full border rounded p-2 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              {availableMaterials.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} (Estoque: {m.stockQuantity})
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Quantidade</label>
            <input
              type="number" required step="0.01"
              value={newMaterial.quantityRequired}
              onChange={(e) => setNewMaterial({ ...newMaterial, quantityRequired: e.target.value })}
              className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700 transition cursor-pointer">
            Adicionar
          </button>
        </form>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b">
              <th className="pb-2">Material</th>
              <th className="pb-2">Qtd. Necessária</th>
              <th className="pb-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentProduct.materials?.map((m) => (
              <tr key={m.id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="py-3 font-medium text-slate-700">{m.rawMaterialName}</td>
                <td className="py-3">
                  {editingId === m.rawMaterialId ? (
                    <input
                      type="number"
                      className="border rounded w-20 px-1"
                      value={editQty}
                      onChange={(e) => setEditQty(e.target.value)}
                    />
                  ) : (
                    m.quantityRequired
                  )}
                </td>
                <td className="py-3 text-right space-x-2">
                  {editingId === m.rawMaterialId ? (
                    <button onClick={() => handleUpdateQty(m.rawMaterialId)} className="text-green-600 cursor-pointer"><Check size={18} /></button>
                  ) : (
                    <button onClick={() => { setEditingId(m.rawMaterialId); setEditQty(m.quantityRequired); }} className="text-blue-600 cursor-pointer"><Edit2 size={16} /></button>
                  )}
                  <button onClick={() => handleDeleteMaterial(m.rawMaterialId)} className="text-red-600 cursor-pointer"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}