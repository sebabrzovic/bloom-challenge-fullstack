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
      percentage: number;       
    };
    coupon: {
      enabled: boolean;
      percentage: number;       
    };
  };
  
  // Configuración de procesamiento del producto
  processing: {
    type: ProcessingType;       
    additionalCosts: {
      fixed?: number;           // Costo fijo 
      variable?: boolean;       // Costo variable 
      description?: string;     // Descripción del costo adicional
    };
  };
};