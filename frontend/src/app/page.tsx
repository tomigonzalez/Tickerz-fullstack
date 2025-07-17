import CatalogoEventos from "@/components/CatalogoEventos";

export default function Home() {
  return (
    <>
      <div className="relative w-full h-[110vh] bg-primary overflow-hidden">
        {/* Círculo blanco que se "corta" por el overflow */}
        <div className="absolute w-[100vw] h-[100vw] -bottom-[80vw] left-1/2 -translate-x-1/2 rounded-full bg-white"></div>
        {/* Contenido adicional aquí */}
      </div>
      <div className="p-4">
        <CatalogoEventos />
      </div>
    </>
  );
}
