const categories = [
  { name: 'For Couples and Small Families', img: '/sedan.png' },
  { name: 'For Groups and Large Families', img: '/van.png' },
  { name: 'Luxury & Executive Cars', img: '/luxury.png' },
];

export default function VehicleCategories() {
  return (
    <section className="container py-12">
      <h2 className="text-2xl font-semibold mb-6">We cover all your transportation needs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((c) => (
          <div key={c.name} className="bg-white rounded-xl shadow-card p-5">
            <div className="h-36 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
              {/* Replace with actual <Image/> */}
              <span className="text-brand.gray text-sm">Image: {c.name}</span>
            </div>
            <h3 className="font-semibold">{c.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}