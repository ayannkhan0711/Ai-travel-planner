class PdfTicketService {
  generateTicketHtml(booking) {
    const p = booking.bookingDetails?.passengers?.[0] || {
      firstName: 'Distinguished',
      lastName: 'Traveler',
      passportNumber: 'VL-789012',
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Voyager Luxe - Boarding Pass ${booking.bookingReference}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Montserrat:wght@300;400;600&display=swap');
          body {
            background-color: #F5E6D3;
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            padding: 40px;
            display: flex;
            justify-content: center;
          }
          .ticket-card {
            width: 820px;
            background: #FFFFFF;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 16px 40px rgba(139, 115, 85, 0.2);
            border: 2px solid #8B7355;
            display: flex;
          }
          .main-pass {
            flex: 2.8;
            padding: 32px;
            border-right: 2px dashed #D3C4B3;
            position: relative;
          }
          .stub {
            flex: 1.2;
            padding: 32px 24px;
            background: #FFFAF0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #8B7355;
            padding-bottom: 16px;
            margin-bottom: 24px;
          }
          .logo {
            font-family: 'Cinzel', serif;
            font-size: 22px;
            font-weight: 700;
            color: #8B7355;
            letter-spacing: 2px;
          }
          .pass-type {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #A0826D;
            background: #F5E6D3;
            padding: 4px 10px;
            border-radius: 20px;
            font-weight: 600;
          }
          .flight-route {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
          }
          .city-code {
            font-family: 'Cinzel', serif;
            font-size: 40px;
            font-weight: 700;
            color: #2D2D2D;
          }
          .city-name {
            font-size: 12px;
            color: #777;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .plane-icon {
            font-size: 22px;
            color: #8B7355;
          }
          .grid-info {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 24px;
          }
          .info-box label {
            font-size: 10px;
            text-transform: uppercase;
            color: #888;
            letter-spacing: 1px;
            display: block;
            margin-bottom: 4px;
          }
          .info-box span {
            font-size: 14px;
            font-weight: 600;
            color: #2D2D2D;
          }
          .barcode-box {
            margin-top: 15px;
            background: #2D2D2D;
            height: 48px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #FFF;
            letter-spacing: 10px;
            font-family: monospace;
            font-size: 14px;
          }
          @media print {
            body { padding: 0; background: none; }
            .ticket-card { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="ticket-card">
          <div class="main-pass">
            <div class="header">
              <div class="logo">VOYAGER LUXE</div>
              <div class="pass-type">${booking.bookingType.toUpperCase()} BOARDING PASS</div>
            </div>
            <div class="flight-route">
              <div>
                <div class="city-code">${booking.sourceLocation?.code || 'JFK'}</div>
                <div class="city-name">${booking.sourceLocation?.city || 'New York'}</div>
              </div>
              <div class="plane-icon">✦ ➔ ✦</div>
              <div style="text-align: right;">
                <div class="city-code">${booking.destinationLocation?.code || 'CDG'}</div>
                <div class="city-name">${booking.destinationLocation?.city || 'Paris'}</div>
              </div>
            </div>
            <div class="grid-info">
              <div class="info-box">
                <label>Passenger</label>
                <span>${p.firstName} ${p.lastName}</span>
              </div>
              <div class="info-box">
                <label>Flight / Unit</label>
                <span>${booking.bookingDetails?.flightNumber || 'VL-108'}</span>
              </div>
              <div class="info-box">
                <label>Suite / Seat</label>
                <span style="color: #8B7355; font-size: 16px;">${booking.bookingDetails?.seatNumber || '01A'}</span>
              </div>
              <div class="info-box">
                <label>Cabin Class</label>
                <span>${booking.bookingDetails?.cabinClass || 'Royal Suite'}</span>
              </div>
            </div>
            <div class="grid-info">
              <div class="info-box">
                <label>Departure Date</label>
                <span>${new Date(booking.departureDate).toLocaleDateString()}</span>
              </div>
              <div class="info-box">
                <label>VIP Lounge Gate</label>
                <span>Terminal 1, Saloon 4</span>
              </div>
              <div class="info-box">
                <label>Priority FastTrack</label>
                <span>Confirmed</span>
              </div>
              <div class="info-box">
                <label>Luggage Allowance</label>
                <span>3 x 32kg VIP</span>
              </div>
            </div>
            <div class="barcode-box">
              ||| | ||||| || |||| ||||| | |||||| |||| |||
            </div>
          </div>
          <div class="stub">
            <div>
              <div style="font-family: 'Cinzel', serif; font-size: 16px; font-weight: 700; color: #8B7355; margin-bottom: 8px;">
                PASSENGER STUB
              </div>
              <div style="font-size: 11px; color: #777; margin-bottom: 20px;">Ref: ${booking.bookingReference}</div>
              <div style="margin-bottom: 12px;">
                <div style="font-size: 10px; color: #888; text-transform: uppercase;">Traveler</div>
                <div style="font-size: 13px; font-weight: 600;">${p.firstName} ${p.lastName}</div>
              </div>
              <div style="margin-bottom: 12px;">
                <div style="font-size: 10px; color: #888; text-transform: uppercase;">Origin / Dest</div>
                <div style="font-size: 13px; font-weight: 600;">${booking.sourceLocation?.code || 'JFK'} ➔ ${booking.destinationLocation?.code || 'CDG'}</div>
              </div>
              <div style="margin-bottom: 12px;">
                <div style="font-size: 10px; color: #888; text-transform: uppercase;">Seat</div>
                <div style="font-size: 18px; font-weight: 700; color: #8B7355;">${booking.bookingDetails?.seatNumber || '01A'}</div>
              </div>
            </div>
            <div style="text-align: center; font-size: 10px; color: #888; border-top: 1px solid #E5D5C5; padding-top: 10px;">
              Voyager Luxe Global Concierge
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new PdfTicketService();
