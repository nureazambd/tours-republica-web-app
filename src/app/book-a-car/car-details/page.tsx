import CarBookingSummary from "../CarBookingSummary";

export default function CarDetailsPage() {
  const sampleCar = {
    id: 1,
    name: "Volkswagen Sharan",
    image: "/images/cars/volkswagen-sharan.jpg",
    brand: "Volkswagen",
    model: "Sharan",
    class: "Van",
    year: "2017",
    color: "Black",
    baggage: "4",
    passengers: "4",
    rating: 4.8,
    reviews: 260,
    rides: 669,
    years: 2.8,
  };

  return <CarBookingSummary car={sampleCar} onBack={() => window.history.back()} />;
}
