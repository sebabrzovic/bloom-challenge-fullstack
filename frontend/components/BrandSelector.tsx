"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Brand {
  id: string;
  name: string;
  url: string;
}

export const BrandSelector = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:8000/brands");
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleBrandClick = (brandId: string) => {
    router.push(`/${brandId}`);
  };

  // Mapeo de SVGs por brand ID
  const brandImages: Record<string, string> = {
    karyn_coo: "/images/karyn-Coo.svg",
    andesgear: "/images/andesgear.svg", 
    milu_rugs: "/images/miluRugs.svg",
    kokoro: "/images/kokoro.svg"
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl">Cargando marcas...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
        >
          {/* Imagen de la marca */}
          <div className="relative h-48 w-full">
            <Image
              src={brandImages[brand.id] || "/images/placeholder.svg"}
              alt={brand.name}
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback si la imagen no existe
                const target = e.target as HTMLImageElement;
                target.src = "/images/placeholder.svg";
              }}
            />
          </div>
          
          {/* Contenido de la tarjeta */}
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {brand.name}
            </h3>
            <button
              onClick={() => handleBrandClick(brand.id)}
              className="bg-white hover:bg-black text-black hover:text-white font-medium py-2 px-6 rounded-lg transition-colors border border-black"
            >
              Visitar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};