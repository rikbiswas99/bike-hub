const formatPrice = (price) =>
  price ? "₹" + new Intl.NumberFormat("en-IN").format(price) : "Price not available";

export default function BikeCard({ bike }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Picture area: shows the brand name until we add real images */}
      <div className="h-36 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
        {bike.image_url ? (
          <img src={bike.image_url} alt={bike.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-white text-2xl font-bold tracking-wide">{bike.brand.name}</span>
        )}
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500">{bike.brand.name}</p>
        <h3 className="text-lg font-semibold">{bike.name}</h3>
        <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
          {bike.category}
        </span>

        <p className="mt-3 text-xl font-bold text-green-700">{formatPrice(bike.price_inr)}</p>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <p className="font-semibold">{bike.engine_cc} cc</p>
            <p className="text-gray-500 text-xs">Engine</p>
          </div>
          <div>
            <p className="font-semibold">{bike.power_bhp} bhp</p>
            <p className="text-gray-500 text-xs">Power</p>
          </div>
          <div>
            <p className="font-semibold">{bike.mileage_kmpl} km/l</p>
            <p className="text-gray-500 text-xs">Mileage</p>
          </div>
        </div>
      </div>
    </div>
  );
}