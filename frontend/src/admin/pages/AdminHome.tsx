import { Link } from "react-router";

import { ChevronRight } from "lucide-react";
import Header from "../../components/home/Header";

type LinkRoutes = {
  route: string;
  slug: string;
  description: string;
  key: number;
};

export default function AdminHome() {
  const routes: LinkRoutes[] = [
    {
      route: "/admin/products",
      slug: "Prodotti",
      description: "Elenco completo dei prodotti",
      key: 1,
    },
    {
      route: "/admin/categories",
      slug: "Categorie",
      description: "Elenco completo delle categorie",
      key: 2,
    },
    {
      route: "/admin/extras",
      slug: "Extra",
      description: "Elenco completo degli ingredienti aggiungibili",
      key: 3,
    },
  ];

  return (
    <div className="flex flex-col items-center py-20 px-20">
      <div className="flex flex-col items-center px-20">
        <div className="text-2xl p-4">Modalità Lavoro</div>
        <div className="flex gap-4">
         
            <Link
              to={''}
              className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition group relative overflow-hidden h-30 w-60"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition`}
              />

              <div className="w-full h-full">
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  Ordini
                </h3>
                <p className="text-gray-500 text-xs mb-2">Controlla gli ordini ricevuti</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-400"></span>
                  <div>
                    <ChevronRight
                      size={16}
                      className="text-gray-400 group-hover:text-orange-500 transition"
                    />
                  </div>
                </div>
              </div>
            </Link>
         
        </div>
      </div>
      <div className="flex flex-col items-center py-20 px-20">
        <div className="text-2xl p-4">Gestisci il menù</div>
        <div className="flex gap-4">
          {routes.map((r) => (
            <Link
              key={r.key}
              to={r.route}
              className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition group relative overflow-hidden h-30 w-60"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition`}
              />

              <div className="w-full h-full">
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {r.slug}
                </h3>
                <p className="text-gray-500 text-xs mb-2">{r.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-400"></span>
                  <div>
                    <ChevronRight
                      size={16}
                      className="text-gray-400 group-hover:text-orange-500 transition"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center px-20">
        <div className="text-2xl p-4">Altro</div>
        <div className="flex gap-4">
         
            <Link
              to={''}
              className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition group relative overflow-hidden h-30 w-60"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition`}
              />

              <div className="w-full h-full">
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  Gestione Utenti
                </h3>
                <p className="text-gray-500 text-xs mb-2">Gestione degli utenti che hanno accesso all'app</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-400"></span>
                  <div>
                    <ChevronRight
                      size={16}
                      className="text-gray-400 group-hover:text-orange-500 transition"
                    />
                  </div>
                </div>
              </div>
            </Link>
         
        </div>
      </div>
    </div>
  );
}
