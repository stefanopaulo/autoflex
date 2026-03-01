import { useEffect, useState } from "react";
import { Factory } from "lucide-react";

export default function AvailableProduction() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/availableProduction`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Erro na produção:", err));
  }, []);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 bg-blue-50 border-b border-blue-100 flex items-center gap-2 text-blue-700 font-semibold">
        <Factory size={20} />
        <span>Capacidade de Produção Atual</span>
      </div>
      
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-sm font-semibold text-slate-700">Produto</th>
            <th className="px-6 py-3 text-sm font-semibold text-slate-700">Qtd. Possível de Produzir</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan="2" className="px-6 py-8 text-center text-slate-400 italic">
                Nenhum dado de produção disponível ou estoque zerado.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.productId} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                  {item.productName}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full font-bold ${
                    item.maxProductProduction > 0 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                  }`}>
                    {item.maxProductProduction} unidades
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}