import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../App.css";

function DetalhesProdutos() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const image = searchParams.get("image");
  return (
    <div className="w-screen h-screen corFundo p-6">
      <div className="w-[500px] mx-auto">
        <div className="flex justify-center relative mb-20">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 text-slate-100"
          >
            <ChevronLeftIcon />
          </button>
        </div>

        <div className="bg-white p-4 rounded-md flex h-full mt-10 gap-6 ">
          <img
            src={`/${image}`} 
            alt={title}
            className="w-60 h-60 object-cover rounded-md"
          />

          <div className="text-left flex-1">
            <h2 className="text-4xl font-bold text-black mb-2">{title}</h2>
            <p className="text-slate-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesProdutos;
