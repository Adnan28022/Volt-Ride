import { useState } from "react";
import * as Lucide from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Do I need a driving license to ride?",
      answer: "No, VoltRide e-bikes are categorized as 'Low Speed Electric Vehicles' (LSEV), which means you do not require a formal driving license to operate them."
    },
    {
      question: "What happens if the battery runs out during my ride?",
      answer: "Our app provides real-time battery tracking. If the battery drops below 10%, the app will notify you to head to the nearest Volt Station. Our ground team ensures station batteries are swapped regularly so a fresh bike is always ready."
    },
    {
      question: "Where am I allowed to end my ride?",
      answer: "Rides must be terminated at any authorized 'Volt Station' to ensure vehicle safety. Simply park the bike at a designated hub, and use the 'End Ride' button in the app to finalize your session."
    },
    {
      question: "What should I do in case of an accident or technical issue?",
      answer: "Your safety is our priority. Tap the 'SOS' button in the app for immediate assistance, or call our 24/7 emergency helpline at +92 300 1234567. Our rapid response team typically reaches you within 15-20 minutes."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Left Side: Text */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl inline-block font-black text-xs uppercase tracking-widest mb-6">
                Support Center
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Got Questions? <br /> <span className="text-green-500">We’ve Got Answers</span>
              </h2>
              <p className="text-slate-500 font-medium mb-8">
                Learn more about VoltRide to ensure your journey is smooth, safe, and completely worry-free.
              </p>
              
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                    <Lucide.MessageSquare size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">Still need help?</p>
                    <p className="text-xs font-bold text-slate-400">Message us on WhatsApp anytime</p>
                  </div>
                </div>
                <button className="w-full py-4 bg-green-500 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 hover:text-white transition-all shadow-lg shadow-green-200">
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className={`rounded-[2rem] border-2 transition-all duration-300 overflow-hidden ${
                  openIndex === idx 
                  ? 'border-green-500 bg-white shadow-xl shadow-slate-100' 
                  : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                }`}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full p-8 flex items-center justify-between text-left"
                >
                  <span className={`text-lg font-black transition-colors ${openIndex === idx ? 'text-green-600' : 'text-slate-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-green-600' : 'text-slate-400'}`}>
                    <Lucide.ChevronDown size={24} />
                  </div>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === idx ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed border-t border-slate-50 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;