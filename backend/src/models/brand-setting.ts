/** 
* Debes completar este modelo como consideres adecuado
*/
export type ProcessingType = 'direct' | 'workshop' | 'washing';

export type BrandSettings = {
  brandId: string;
  
  // Configuración de envío
  shipping: {
    homePickup: boolean;        // Retiro a domicilio
    blueExpress: boolean;       // Envío por Blue Express
  };
  
  // Configuración de pago
  payment: {
    bankTransfer: {
      enabled: boolean;
      percentage: number;       // Ej: 80% = 0.8
    };
    coupon: {
      enabled: boolean;
      percentage: number;       // Ej: 100% = 1.0
    };
  };
  
  // Configuración de procesamiento del producto
  processing: {
    type: ProcessingType;           // Usando el tipo global
    additionalCosts: {
      fixed?: number;           // Costo fijo (ej: lavado $10.000)
      variable?: boolean;       // Costo variable (ej: tintorería)
      description?: string;     // Descripción del costo adicional
    };
  };
};