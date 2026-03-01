import { useState } from "react";
import Navbar from "./components/Navbar";
import RawMaterialList from "./components/RawMaterialList";
import SaveRawMaterial from "./components/SaveRawMaterial";
import ProductList from "./components/ProductList";
import SaveProduct from "./components/SaveProduct";
import ProductDetails from "./components/ProductDetails";
import AvailableProduction from "./components/AvailableProduction";

export default function App() {
  const [view, setView] = useState("materials");
  const [showForm, setShowForm] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [listKey, setListKey] = useState(0);
  const [productForDetails, setProductForDetails] = useState(null);

  const config = {
    materials: {
      title: "Controle de Matéria-prima",
      buttonText: "+ Nova Matéria-prima",
      ListComponent: RawMaterialList,
      FormComponent: SaveRawMaterial,
    },
    products: {
      title: "Controle de Produtos",
      buttonText: "+ Novo Produto",
      ListComponent: ProductList,
      FormComponent: SaveProduct,
    },
    production: {
      title: "Análise de Produção Disponível",
      buttonText: "",
      ListComponent: AvailableProduction,
      FormComponent: () => null,
    },
  };

  const current = config[view] || config.materials;

  const handleNavigate = (newView) => {
    setView(newView);
    setShowForm(false);
    setItemToEdit(null);
  };

  const handleEdit = (item) => {
    setItemToEdit(item);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setItemToEdit(null);
    setListKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar onNavigate={handleNavigate} />

      <main className="flex-1 w-full max-w-7xl mx-auto p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            {current.title}
          </h1>

          {!showForm && view !== "production" && (
            <button
              onClick={() => {
                setItemToEdit(null);
                setShowForm(true);
              }}
              className="bg-blue-600 text-white px-6 py-3 md:py-2 rounded-lg hover:bg-blue-700 cursor-pointer font-medium shadow-sm active:scale-95 transition-all w-full sm:w-auto text-center"
            >
              {current.buttonText}
            </button>
          )}
        </div>
        
        {showForm && (
          <current.FormComponent
            materialToEdit={itemToEdit}
            onSave={handleCloseForm}
            onCancel={handleCloseForm}
          />
        )}

        {productForDetails && (
          <ProductDetails
            product={productForDetails}
            onClose={() => setProductForDetails(null)}
            onRefresh={() => {
              setListKey((prev) => prev + 1);
            }}
          />
        )}

        <current.ListComponent
          key={listKey}
          onEdit={handleEdit}
          onOpenDetails={setProductForDetails}
          onRefresh={() => setListKey((prev) => prev + 1)}
        />
      </main>

      <footer className="bg-white border-t border-slate-200 py-4 text-center text-sm text-slate-500">
        &copy; 2026 - Autoflex - Teste Prático
      </footer>
    </div>
  );
}
