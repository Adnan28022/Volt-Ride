import { Star, Quote, CheckCircle } from "lucide-react";

const Testimonials = () => {
  const reviews = [
    {
      name: "Ahmed Raza",
      role: "Daily Commuter",
      image: "https://i.pravatar.cc/150?u=ahmed",
      comment: "VoltRide has made my life so much easier. I no longer have to worry about traffic or petrol prices when going to the office. The bike is always found in perfect condition.",
      rating: 5
    },
    {
      name: "Sara Khan",
      role: "Student",
      image: "https://i.pravatar.cc/150?u=sara",
      comment: "The best thing about them is the app and the pocket-friendly prices. As a student, this is the best and most affordable option for me.",
      rating: 5
    },
    {
      name: "Zeeshan Ali",
      role: "Freelancer",
      image: "https://i.pravatar.cc/150?u=zeeshan",
      comment: "VoltRide is my first choice for meeting friends in the evening or heading to the market. The experience of an eco-friendly and quiet ride is truly unique.",
      rating: 4
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-100/50 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-24 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-black text-green-600 uppercase tracking-[0.3em] mb-4">
            Testimonials
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            What Do Our <span className="text-green-500 italic">Riders</span> Say?
          </h3>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-3 text-slate-500 font-bold">4.9/5 Average Rating</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="group relative bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-10 text-slate-100 group-hover:text-green-50/50 transition-colors">
                <Quote size={60} fill="currentColor" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-slate-600 font-medium leading-relaxed mb-8 relative z-10">
                "{review.comment}"
              </p>

              {/* User Profile */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-14 h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1 border-2 border-white">
                    <CheckCircle size={10} fill="currentColor" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">{review.name}</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <span className="text-2xl font-black text-slate-400">GOOGLE</span>
          <span className="text-2xl font-black text-slate-400">TRUSTPILOT</span>
          <span className="text-2xl font-black text-slate-400">PLAYSTORE</span>
          <span className="text-2xl font-black text-slate-400">APP STORE</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;