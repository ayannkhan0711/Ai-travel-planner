export const paymentService = {
  processSimulation: async (paymentDetails) => {
    // Artificial luxury concierge processing delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `TX-CENTURION-${Date.now()}`,
          authorizationCode: 'AUTH-99420-OK',
          methodUsed: paymentDetails.method || 'American Express Centurion',
          timestamp: new Date(),
        });
      }, 1200);
    });
  },

  getExternalBookingLink: (bookingType, provider, bookingRef) => {
    // External booking direct links as required
    const links = {
      flight: `https://www.amadeus.com/en/booking?ref=${bookingRef}`,
      hotel: `https://www.theluxurycollection.com/reserve?ref=${bookingRef}`,
      train: `https://www.belmond.com/trains/europe/orient-express?ref=${bookingRef}`,
      taxi: `https://gettransfer.com/en?voucher=${bookingRef}`,
      default: `https://www.voyagerluxe.com/concierge/reserve?ref=${bookingRef}`,
    };
    return links[bookingType] || links.default;
  },
};
