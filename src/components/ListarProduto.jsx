import { ChevronRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "../App.css";

function ListarProduto({ produtos }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(produtos) {
    const query = new URLSearchParams();
    query.set("title", produtos.title);
    query.set("description", produtos.description);
    query.set("image", produtos.image);
    navigate(`/Detalhes?${query.toString()}`);
  }

  function handleAddToCart(produtoId, prodImage, prodName) {
    fetch(`http://localhost:3001/ShoppingCart?id_produto=${produtoId}`)
      .then((res) => res.json())
      .then((items) => {
        if (items.length > 0) {
          const existingItem = items[0];
          const novaQuantidade = existingItem.quantidade + 1;

          fetch(`http://localhost:3001/ShoppingCart/${existingItem.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantidade: novaQuantidade }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Quantidade atualizada:", data);
              alert("Quantidade atualizada no carrinho!");
            });
        } else {
          fetch("http://localhost:3001/ShoppingCart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_produto: produtoId,
              image: prodImage,
              title: prodName,
              quantidade: 1,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Produto adicionado:", data);
              alert("Produto adicionado ao carrinho!");
            });
        }
      })
      .catch((error) => {
        console.error("Erro ao adicionar ou atualizar carrinho:", error);
      });
  }
  return (
    <div className="w-[95%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {produtos.map((produtos) => (
        <div
          key={produtos.id}
          className="bg-white p-5 rounded-md shadow-xl flex flex-col  h-full"
        >
          <img
            src={`${produtos.image}`}
            alt={produtos.title}
            className="w-full  object-cover"
          />

          <div className="mt-auto">
            <h2 className="text-2xl font-bold text-black mb-4 text-center">
              {produtos.title}
            </h2>

            <div className="flex gap-3">
              <Button
                onClick={() => handleAddToCart(produtos.id, produtos.image, produtos.title)}
                className="flex-1 corFundo hover:bg-yellow-400 text-black font-bold shadow"
              >
                Adicionar ao Carrinho
              </Button>

              <Button
                onClick={() => onSeeDetailsClick(produtos)}
                className="w-12 h-15 flex items-center justify-center corFundo hover:bg-yellow-400 shadow"
              >
                <ChevronRightIcon size={30} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListarProduto;
