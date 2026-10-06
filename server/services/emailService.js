const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.fromEmail = process.env.FROM_EMAIL || 'concierge@voyagerluxe.com';
    this.fromName = process.env.FROM_NAME || 'Voyager Luxe Concierge';
  }

  getTransporter() {
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }
    // Mock transporter for safe dev/testing
    return {
      sendMail: async (options) => {
        console.log(`[Email Mock Sent] To: ${options.to} | Subject: ${options.subject}`);
        return { messageId: `vl-mock-${Date.now()}` };
      },
    };
  }

  async sendBookingConfirmation(booking, user) {
    const transporter = this.getTransporter();
    const mailOptions = {
      from: `"${this.fromName}" <${this.fromEmail}>`,
      to: booking.confirmationEmail || user.email,
      subject: `✨ Itinerary Confirmed [Ref: ${booking.bookingReference}] - Voyager Luxe Premier`,
      html: `
        <div style="font-family: 'Georgia', serif; background-color: #FAFAF8; padding: 40px; color: #2D2D2D;">
          <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid #F5E6D3; padding: 36px; box-shadow: 0 4px 20px rgba(139, 115, 85, 0.08);">
            <div style="text-align: center; border-bottom: 2px solid #8B7355; padding-bottom: 20px;">
              <h1 style="color: #8B7355; font-size: 26px; margin: 0; letter-spacing: 2px;">VOYAGER LUXE</h1>
              <p style="color: #A0826D; font-size: 13px; text-transform: uppercase; margin-top: 5px; letter-spacing: 1.5px;">Premier Journey Confirmation</p>
            </div>
            <div style="padding: 24px 0;">
              <p style="font-size: 16px;">Dear ${booking.bookingDetails?.passengers?.[0]?.firstName || user.firstName || 'Distinguished Guest'},</p>
              <p style="line-height: 1.6; color: #555555;">It is our absolute privilege to confirm your bespoke booking. Every detail has been curated to ensure your journey is effortless and extraordinary.</p>
              
              <div style="background-color: #FFFAF0; border: 1px solid #F5E6D3; border-radius: 8px; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 10px 0;"><strong>Booking Reference:</strong> <span style="color: #8B7355; font-weight: bold; font-size: 18px;">${booking.bookingReference}</span></p>
                <p style="margin: 0 0 10px 0;"><strong>Journey:</strong> ${booking.sourceLocation?.city || 'Origin'} ➔ ${booking.destinationLocation?.city || booking.destinationLocation?.hotelName || 'Destination'}</p>
                <p style="margin: 0 0 10px 0;"><strong>Departure:</strong> ${new Date(booking.departureDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p style="margin: 0 0 10px 0;"><strong>Class / Tier:</strong> ${booking.bookingDetails?.cabinClass || 'First Class Suite'}</p>
                <p style="margin: 0;"><strong>Total Paid:</strong> $${booking.totalPrice.toLocaleString()} USD</p>
              </div>

              <p style="font-size: 14px; color: #777;">Your dedicated concierge is on standby 24/7. Simply reply to this email or reach us via private WhatsApp line.</p>
            </div>
            <div style="text-align: center; border-top: 1px solid #ECECEC; padding-top: 20px; font-size: 12px; color: #999;">
              <p>© 2026 Voyager Luxe. Geneva · Paris · London · New York · Dubai</p>
            </div>
          </div>
        </div>
      `,
    };

    return await transporter.sendMail(mailOptions);
  }

  async sendPriceAlert(user, route, oldPrice, newPrice) {
    const transporter = this.getTransporter();
    return await transporter.sendMail({
      from: `"${this.fromName}" <${this.fromEmail}>`,
      to: user.email,
      subject: `🔔 Exclusive Fare Advantage: ${route} price drop detected`,
      html: `<p>A preferred route (${route}) dropped from $${oldPrice} to $${newPrice}. Reserve now through Voyager Luxe.</p>`,
    });
  }

  async sendFlightDelayAlert(user, flightNumber, newTime, statusMessage) {
    const transporter = this.getTransporter();
    return await transporter.sendMail({
      from: `"${this.fromName}" <${this.fromEmail}>`,
      to: user.email,
      subject: `⚠️ Flight Schedule Update: ${flightNumber}`,
      html: `<p>Flight ${flightNumber} update: ${statusMessage}. Estimated new departure: ${newTime}. Your VIP lounge access has been extended automatically.</p>`,
    });
  }
}

module.exports = new EmailService();
