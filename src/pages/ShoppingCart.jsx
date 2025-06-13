import { useEffect, useState } from "react";
import Button from "../components/Button";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function CarrinhoPage() {
   const navigate = useNavigate();
   const [showModal, setShowModal] = useState(false);

   
     function App() {
       navigate("/");  
     }
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3001/ShoppingCart")
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error("Erro ao carregar carrinho:", err));
  }, []);

  // Remover um produto do carrinho
  function handleRemoveItem(id) {
    fetch(`http://localhost:3001/ShoppingCart/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("Erro ao remover item:", err));
  }

  return (
    <div className="w-full min-h-screen  p-6 corFundo">
      <h1 className="text-3xl font-bold mb-6 text-center">Carrinho de Compras</h1>
      <div className="flex justify-center relative mb-20">
          <button
            onClick={App}
            className="absolute left-0 top-0 bottom-0 text-slate-100"
          >
            <ChevronLeftIcon />
          </button>
        </div>

     <ul className="w-full max-w-md mx-auto space-y-4">
  {cartItems.length === 0 ? (
    <p className="text-center col-span-full">Seu carrinho está vazio.</p>
  ) : (
    cartItems.map((item) => (
      <li
        key={item.id}
        className="bg-white p-4 rounded-md shadow flex flex-col items-center text-center space-y-2"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-32 h-32 object-cover rounded-md"
        />
        <h2 className="text-lg font-bold text-black">{item.title}</h2>
        <p className="text-slate-600">Quantidade: {item.quantidade}</p>
        <Button
          onClick={() => handleRemoveItem(item.id)}
          className="bg-red-500 hover:bg-red-600 text-white w-full"
        >
          Remover
        </Button>
      </li>
    ))
  )}
</ul>
<ul className="w-full max-w-md mx-auto space-y-4 text-center mt-8">
   <Button 
   onClick={() => setShowModal(true)}
   className="bg-black hover:bg-white corTexto shadow">Finalizar Compra</Button> 
</ul>
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Resumo do Pedido</h2>
      
      <ul className="mb-4 space-y-2">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.title}</span>
            <span>Qtd: {item.quantidade}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between gap-4">
        <Button
          onClick={() => {
            // Aqui você pode mandar pra um backend ou limpar carrinho
            alert("Pedido finalizado com sucesso!");
            setShowModal(false);
          }}
          className="bg-green-600 hover:bg-green-700 text-white w-full"
        >
          OK
        </Button>
        <Button
          onClick={() => setShowModal(false)}
          className="bg-red-500 hover:bg-red-600 text-white w-full"
        >
          Cancelar
        </Button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
