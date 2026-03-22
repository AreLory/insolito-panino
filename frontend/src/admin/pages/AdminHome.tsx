import { HomeCard } from "../components/home/HomeCard";
import { HomeSection } from "../components/home/HomeSection";

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
    <div className="px-4 sm:px-6 lg:px-10 py-10 space-y-10">
      <HomeSection title="Modalità Lavoro">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <HomeCard
            to="/admin/orders"
            title="Ordini"
            description="Controlla gli ordini ricevuti"
          />
        </div>
      </HomeSection>

      <HomeSection title="Gestisci il menù">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((r) => (
            <HomeCard
              key={r.key}
              to={r.route}
              title={r.slug}
              description={r.description}
            />
          ))}
        </div>
      </HomeSection>

      <HomeSection title="Altro">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <HomeCard
            to="/admin/users"
            title="Gestione Utenti"
            description="Gestione degli utenti che hanno accesso all'app"
          />
        </div>
      </HomeSection>
    </div>
  );
}
