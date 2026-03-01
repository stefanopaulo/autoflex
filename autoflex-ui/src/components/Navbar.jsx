import { useState } from "react";
import { Package, Database, Boxes, Factory, Menu, X } from "lucide-react";

export default function Navbar({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <Factory size={28} />
          <span>Autoflex</span>
        </div>

        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <NavLinks onNavigate={handleNavigate} />
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <NavLinks onNavigate={handleNavigate} />
        </div>
      )}
    </nav>
  );
}

function NavLinks({ onNavigate }) {
  return (
    <>
      <button
        onClick={() => onNavigate("materials")}
        className="flex items-center gap-2 hover:text-blue-600 transition cursor-pointer text-slate-600 font-medium"
      >
        <Database size={18} /> Matérias Primas
      </button>
      <button
        onClick={() => onNavigate("products")}
        className="flex items-center gap-2 hover:text-blue-600 transition cursor-pointer text-slate-600 font-medium"
      >
        <Package size={18} /> Produtos
      </button>
      <button
        onClick={() => onNavigate("production")}
        className="flex items-center gap-2 hover:text-blue-600 transition cursor-pointer text-slate-600 font-medium"
      >
        <Boxes size={18} /> Produção
      </button>
    </>
  );
}