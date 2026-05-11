import * as Lucide from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Icons ko dynamic access karne ka safe tareeqa
  const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "MessageCircle", href: "#" }, 
    { name: "Share2", href: "#" },         
    { name: "Globe", href: "#" },
  ];

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-24">
        
        {/* Top Part: Brand & Newsletter */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-green-500 p-2 rounded-xl group-hover:rotate-12 transition-transform">
                <Lucide.Zap size={24} className="text-white" fill="currentColor" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
                Volt<span className="text-green-500">Ride</span>
              </span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
              Pakistan ka pehla smart electric bike sharing platform. Humara maqsad shehar ke safar ko sasta, asaan aur environment-friendly banana hai.
            </p>
            
            {/* Social Icons - Error Proof Mapping */}
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                const IconComponent = Lucide[social.name] || Lucide.Share2; // Fallback to Share2 if icon not found
                return (
                  <a 
                    key={idx} 
                    href={social.href} 
                    className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-green-500 hover:text-white transition-all duration-300"
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Fleet', 'Pricing', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 font-medium hover:text-green-600 transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Support</h4>
            <ul className="space-y-4">
              {['Help Center', 'Safety', 'Privacy Policy', 'Terms'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 font-medium hover:text-green-600 transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Stay Updated</h4>
            <p className="text-slate-500 text-sm font-medium">Naye offers aur updates ke liye subscribe karein.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-green-500 transition-all font-medium"
              />
              <button type="submit" className="absolute right-2 top-2 bg-slate-900 text-white p-2 rounded-xl hover:bg-green-500 transition-colors group">
                <Lucide.Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>

        {/* Middle Part: Contact Info Bar */}
        <div className="grid md:grid-cols-3 gap-8 py-10 border-y border-slate-50 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
              <Lucide.Mail size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Email Us</p>
              <p className="text-sm font-bold text-slate-900">support@voltride.com.pk</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Lucide.Phone size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Call Support</p>
              <p className="text-sm font-bold text-slate-900">+92 300 1234567</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
              <Lucide.MapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Main Office</p>
              <p className="text-sm font-bold text-slate-900">DHA Phase 6, Lahore, Pakistan</p>
            </div>
          </div>
        </div>

        {/* Bottom Part: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-xs font-bold">
            © {currentYear} VoltRide Electric. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 opacity-30 grayscale hover:grayscale-0 transition-all cursor-pointer" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-30 grayscale hover:grayscale-0 transition-all cursor-pointer" />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;