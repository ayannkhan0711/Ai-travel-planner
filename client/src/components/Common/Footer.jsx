import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white pt-16 pb-12 border-t border-luxury-brown/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-700/60">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl text-luxury-gold">✦</span>
              <span className="font-serif text-2xl font-bold tracking-widest text-[#FFFAF0]">
                VOYAGER LUXE
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-6">
              The premier AI luxury travel aggregator. Unifying private aviation, commercial first class suites, Michelin dining, and heritage sanctuaries into an effortless single dossier.
            </p>
            <div className="text-xs text-luxury-goldLight tracking-wider uppercase">
              Geneva · Paris · London · New York · Dubai · Tokyo
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#FFFAF0] mb-4 tracking-wider">
              SANCTUARIES
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><Link to="/search?destination=Hernur" className="hover:text-luxury-gold transition-colors">Hernur Riviera</Link></li>
              <li><Link to="/search?destination=Panling" className="hover:text-luxury-gold transition-colors">Panling Emerald Atoll</Link></li>
              <li><Link to="/search?destination=Famling" className="hover:text-luxury-gold transition-colors">Famling Wine Estate</Link></li>
              <li><Link to="/search?destination=Vouke" className="hover:text-luxury-gold transition-colors">Vouke Alpine Chalet</Link></li>
              <li><Link to="/search?destination=Cedling" className="hover:text-luxury-gold transition-colors">Cedling Onsen Reserve</Link></li>
              <li><Link to="/search?destination=Paride" className="hover:text-luxury-gold transition-colors">Paride Haute Couture</Link></li>
            </ul>
          </div>

          {/* Intelligence & Protocols */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#FFFAF0] mb-4 tracking-wider">
              INTELLIGENCE
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><Link to="/travel-guides" className="hover:text-luxury-gold transition-colors">Visa & Entry Dossier</Link></li>
              <li><Link to="/travel-guides" className="hover:text-luxury-gold transition-colors">Health & Vaccination</Link></li>
              <li><Link to="/travel-guides" className="hover:text-luxury-gold transition-colors">Global Safety Advisories</Link></li>
              <li><Link to="/insurance" className="hover:text-luxury-gold transition-colors">Centurion Premier Shield</Link></li>
              <li><Link to="/itinerary" className="hover:text-luxury-gold transition-colors">Smart Itinerary Builder</Link></li>
            </ul>
          </div>

          {/* 24/7 Concierge */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#FFFAF0] mb-4 tracking-wider">
              CONCIERGE DESK
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <p className="flex items-center gap-2">
                <span className="text-luxury-gold">✦</span>
                Direct Line: +1 (800) 869-LUXE
              </p>
              <p className="flex items-center gap-2">
                <span className="text-luxury-gold">✦</span>
                Geneva Command: +41 22 819 9000
              </p>
              <p className="flex items-center gap-2">
                <span className="text-luxury-gold">✦</span>
                concierge@voyagerluxe.com
              </p>
              <Link to="/support" className="inline-block mt-2 px-3 py-1.5 rounded-lg border border-luxury-gold/50 text-luxury-gold text-xs font-medium hover:bg-luxury-gold hover:text-luxury-dark transition-all">
                Emergency Assistance SOS
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 Voyager Luxe International. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Carriage</span>
            <span className="hover:text-gray-400 cursor-pointer">Aviation Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
