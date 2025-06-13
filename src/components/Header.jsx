import { ShoppingCartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function onCartClick() {
    navigate("/ShoppingCart"); 
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 text-black w-full">
      <h1 className="text-3xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        TGID PRODUTOS
      </h1>

      <div onClick={onCartClick}>
        <ShoppingCartIcon
          size={36}
          className="text-black cursor-pointer hover:text-yellow-500"
          title="Carrinho de Compras"
        />
      </div>
    </header>
  );
}
