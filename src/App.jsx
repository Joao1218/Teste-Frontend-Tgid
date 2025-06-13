import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import ListarProduto from "./components/ListarProduto";

function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await fetch("http://localhost:3001/produtos");
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar Produto:", error);
      }
    };

    fetchProduto();
  }, []);

  return (
    <div className="min-h-screen corFundo flex flex-col items-center p-6">
      <div className="w-full max-w-[1280px] space-y-4">
        <Header />
        <ListarProduto produtos={produtos} />
      </div>
    </div>
  );
}

export default App;
