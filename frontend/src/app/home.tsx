import Image from "next/image";
import { BrandSelector } from "../../components/BrandSelector";

export const Home = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <div className="flex flex-col p-8">
      <Image
        className="h-14 w-auto self-end"
        src="/images/Logo-Bloom.png"
        alt="Logo"
        width={400}
        height={100}
      />
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Desafío Dev
        </h1>
        <p className="text-xl text-gray-600">
          Selecciona una marca para ver sus preguntas frecuentes
        </p>
      </div>
    </div>

    {/* Brand Selector */}
    <div className="px-8 pb-8">
      <BrandSelector />
    </div>
  </div>
);