import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark-bg text-gray-400 py-12 font-display border-t border-dark-border selection:bg-gold selection:text-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-white text-lg font-bold font-serif tracking-wider">LuxeStep & Linen</h3>
            <p className="text-xs text-gray-500 mt-1">Elevating your daily rhythm.</p>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-medium">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Shipping Info</a>
            <a href="#" className="hover:text-gold transition-colors">Contact Us</a>
          </div>
        </div>
        
        <div className="border-t border-dark-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-600">
          <p>&copy; {new Date().getFullYear()} LuxeStep & Linen. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Stripe Secured</span>
            <span>M-Pesa Connected</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
