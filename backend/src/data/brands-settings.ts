/** 
* Debes completar este archivo como consideres adecuado
*/

export default [
 {
    brandId: "karyn_coo",
    shipping: {
      homePickup: true,
      blueExpress: true,
    },
    payment: {
      bankTransfer: {
        enabled: true,
        percentage: 0.8, // 80%
      },
      coupon: {
        enabled: true,
        percentage: 1.0, // 100%
      },
    },
    processing: {
      type: 'direct' as const,
      additionalCosts: {},
    },
  },
  {
    brandId: "andesgear",
    shipping: {
      homePickup: true,
      blueExpress: true,
    },
    payment: {
      bankTransfer: {
        enabled: true,
        percentage: 1.0, // 100% (solo transferencia)
      },
      coupon: {
        enabled: false,
        percentage: 0,
      },
    },
    processing: {
      type: 'direct' as const,
      additionalCosts: {},
    },
  },
  {
    brandId: "milu_rugs",
    shipping: {
      homePickup: true,
      blueExpress: false, // Solo retiro a domicilio
    },
    payment: {
      bankTransfer: {
        enabled: true,
        percentage: 0.8, // 80%
      },
      coupon: {
        enabled: true,
        percentage: 1.0, // 100%
      },
    },
    processing: {
      type: 'washing' as const,
      additionalCosts: {
        fixed: 10000, // $10.000 por lavado
        description: "Se descuenta un monto fijo de $10.000 por el lavado y sanitizado",
      },
    },
  },
  {
    brandId: "kokoro",
    shipping: {
      homePickup: true,
      blueExpress: true,
    },
    payment: {
      bankTransfer: {
        enabled: true,
        percentage: 0.8, // 80%
      },
      coupon: {
        enabled: true,
        percentage: 1.0, // 100%
      },
    },
    processing: {
      type: 'workshop' as const,
      additionalCosts: {
        variable: true,
        description: "En caso que no esté limpio, el costo de la tintorería se descuenta del pago al vendedor",
      },
    },
  },
];
