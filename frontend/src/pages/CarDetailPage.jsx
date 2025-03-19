import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CarDetailPage() {
  const { carId } = useParams();
  const navigate = useNavigate(); // Fix: Define navigate
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/cars")
      .then((response) => {
        const foundCar = response.data.find(item => item.car_id === Number(carId));
        setCar(foundCar);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching car details:", err);
        setError("Error fetching car details");
        setLoading(false);
      });
  }, [carId]);

  useEffect(() => {
    axios.get("http://localhost:5000/reviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log("Error fetching review data:", error);
      });
  }, []);

  if (loading) return <div>Loading car details...</div>;
  if (error) return <div>{error}</div>;
  if (!car) return <div>No car found.</div>;

  function handleRentClick() {
    navigate(`/cardetail/${carId}/payment`);
  }

  return (
    <div className="car-detail-page">
      <div className="car-detail-container">
        <img src={car.car_image || "default-car.jpg"} alt={car.make} />
        <h1>{car.make} {car.model} ({car.year_of_manufacture})</h1>
        <p>Color: {car.color}</p>
        <p>Mileage: {car.current_mileage} km</p>
        <p>Fuel Type: {car.fuel_type}</p>
        <p>Transmission: {car.transmission}</p>
        <p>Status: {car.status}</p>
        <p className="price">${car.price_per_day} / day</p>
        <button onClick={handleRentClick}>Rent Now</button> {/* Fix: Pass function reference */}
      </div>

      {/* Review Section */}
      <div className="car-review">
        {reviews
          .filter((review) => review.car_id === car.car_id)
          .map((review) => (
            <div key={review.review_id} className="carcontainer-review">
              <p>👤 {review.review_name}</p>
              <p>Rating: {review.rating}</p>
              <p>{review.review_text}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
