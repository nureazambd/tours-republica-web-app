const features = [
  { title: 'Airport Welcome Service', desc: 'Meet and greet at the airport.' },
  { title: 'Best Price Rate Guarantee', desc: 'Competitive pricing.' },
  { title: 'Modern, Comfortable Vehicles', desc: 'Clean and well-maintained.' },
  { title: '24/7 Customer Support', desc: 'Always available for assistance.' },
];

export default function FeatureCards() {
  return (
    <section className="container -mt-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {features.map((f) => (
          <div key={f.title} className="bg-white rounded-xl shadow-card p-5">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-brand.gray mt-1">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}