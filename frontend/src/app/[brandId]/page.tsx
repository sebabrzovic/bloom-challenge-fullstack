// /app/[brandId]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface BrandSettings {
  brandId: string;
  shipping: {
    homePickup: boolean;
    blueExpress: boolean;
  };
  payment: {
    bankTransfer: {
      enabled: boolean;
      percentage: number;
    };
    coupon: {
      enabled: boolean;
      percentage: number;
    };
  };
  processing: {
    type: 'direct' | 'workshop' | 'washing';
    additionalCosts: {
      fixed?: number;
      variable?: boolean;
      description?: string;
    };
  };
}

interface Brand {
  id: string;
  name: string;
  url: string;
  settings: BrandSettings;
}

export default function BrandFAQPage() {
  const params = useParams();
  const router = useRouter();
  const brandId = params.brandId as string;
  
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await fetch(`http://localhost:8000/brands/${brandId}`);
        
        if (!response.ok) {
          throw new Error('Brand not found');
        }
        
        const data = await response.json();
        setBrand(data);
      } catch (error) {
        console.error("Error fetching brand:", error);
        setError("No se pudo cargar la información de la marca");
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [brandId]);

  // Función para toggle de preguntas
  const toggleQuestion = (questionNumber: number) => {
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(questionNumber)) {
      newOpenQuestions.delete(questionNumber);
    } else {
      newOpenQuestions.add(questionNumber);
    }
    setOpenQuestions(newOpenQuestions);
  };

  // Generar respuestas dinámicas basadas en la configuración
  const generateShippingAnswer = (settings: BrandSettings) => {
    if (settings.shipping.homePickup && settings.shipping.blueExpress) {
      return "Puedes elegir entre retiro a domicilio o envío por Blue Express.";
    } else if (settings.shipping.homePickup) {
      return "El envío se realiza únicamente con retiro a domicilio.";
    }
    return "Contacta con el equipo para opciones de envío.";
  };

  const generatePaymentAnswer = (settings: BrandSettings) => {
    if (settings.payment.coupon.enabled) {
      return `Puedes recibir el ${settings.payment.coupon.percentage * 100}% en cupones de descuento o el ${settings.payment.bankTransfer.percentage * 100}% por transferencia bancaria.`;
    } else {
      return "El pago se realiza únicamente por transferencia bancaria.";
    }
  };

  const generateAdditionalCostsAnswer = (settings: BrandSettings) => {
    if (settings.processing.additionalCosts.description) {
      return settings.processing.additionalCosts.description;
    }
    return "No hay cobros adicionales por vender tu producto.";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-xl">Cargando preguntas frecuentes...</div>
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="text-xl text-red-600 mb-4">{error || "Marca no encontrada"}</div>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-8 py-6 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-black hover:text-gray-700 font-medium"
          >
            ← Volver a marcas
          </button>
          <Image
            className="h-12 w-auto"
            src="/images/Logo-Bloom.png"
            alt="Logo"
            width={400}
            height={100}
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            PREGUNTAS FRECUENTES
          </h1>
          <h2 className="text-2xl font-semibold text-gray-600">
            PREGUNTAS FRECUENTES AL VENDER - {brand.name}
          </h2>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          {/* Pregunta 1 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleQuestion(1)}
              className="w-full text-left p-6 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  ¿Cómo puedo publicar un producto para la venta?
                </h3>
                <span className="text-2xl text-gray-400">
                  {openQuestions.has(1) ? '−' : '+'}
                </span>
              </div>
            </button>
            <div className={`transition-all duration-500 ease-in-out ${
              openQuestions.has(1) 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            } overflow-hidden`}>
              <div className="px-6 pb-6">
                <p className="text-gray-700 leading-relaxed">
                  ¡Publicar tu producto es muy fácil! Simplemente haz clic en "Vender", crea una cuenta y sigue el proceso de publicación. Una vez que completes el formulario de venta, la publicación será revisada por nuestro equipo y en un plazo máximo de 24 horas, te avisaremos si está aprobada o rechazada. Después de ser revisada y aprobada, se hará pública. Si hay algún problema, recibirás un correo electrónico pidiendo hacer cambios antes de que pueda ser aceptada.
                </p>
              </div>
            </div>
          </div>

          {/* Pregunta 2 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleQuestion(2)}
              className="w-full text-left p-6 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  ¿Cómo envío mi artículo después de que alguien lo compra?
                </h3>
                <span className="text-2xl text-gray-400">
                  {openQuestions.has(2) ? '−' : '+'}
                </span>
              </div>
            </button>
            <div className={`transition-all duration-500 ease-in-out ${
              openQuestions.has(2) 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            } overflow-hidden`}>
              <div className="px-6 pb-6">
                <p className="text-gray-700 leading-relaxed">
                  {generateShippingAnswer(brand.settings)}
                </p>
              </div>
            </div>
          </div>

          {/* Pregunta 3 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleQuestion(3)}
              className="w-full text-left p-6 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  ¿Cómo y cuándo recibo el pago?
                </h3>
                <span className="text-2xl text-gray-400">
                  {openQuestions.has(3) ? '−' : '+'}
                </span>
              </div>
            </button>
            <div className={`transition-all duration-500 ease-in-out ${
              openQuestions.has(3) 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            } overflow-hidden`}>
              <div className="px-6 pb-6">
                <p className="text-gray-700 leading-relaxed">
                  {generatePaymentAnswer(brand.settings)}
                </p>
              </div>
            </div>
          </div>

          {/* Pregunta 4 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleQuestion(4)}
              className="w-full text-left p-6 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  ¿Hay cobros adicionales por vender mi producto por acá?
                </h3>
                <span className="text-2xl text-gray-400">
                  {openQuestions.has(4) ? '−' : '+'}
                </span>
              </div>
            </button>
            <div className={`transition-all duration-500 ease-in-out ${
              openQuestions.has(4) 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            } overflow-hidden`}>
              <div className="px-6 pb-6">
                <p className="text-gray-700 leading-relaxed">
                  {generateAdditionalCostsAnswer(brand.settings)}
                </p>
              </div>
            </div>
          </div>

          {/* Pregunta 5 - Solo si tiene cupones habilitados */}
          {brand.settings.payment.coupon.enabled && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleQuestion(5)}
                className="w-full text-left p-6 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Política de uso de cupones
                  </h3>
                  <span className="text-2xl text-gray-400">
                    {openQuestions.has(5) ? '−' : '+'}
                  </span>
                </div>
              </button>
              <div className={`transition-all duration-500 ease-in-out ${
                openQuestions.has(5) 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="px-6 pb-6">
                  <div className="text-gray-700 leading-relaxed">
                    <p className="mb-2">Los cupones que recibas por la venta de tus productos tienen las siguientes restricciones:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Se pueden utilizar únicamente para compras en el sitio web {brand.url}.</li>
                      <li>Tiene un tiempo máximo para ser utilizado de 6 meses.</li>
                      <li>Está restringido a un monto mínimo de pedido para que pueda utilizarse en el ecommerce. El monto mínimo está definido por el monto del cupón + $1.000 CLP.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}