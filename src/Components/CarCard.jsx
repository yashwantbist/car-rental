export default function CarCard(){
   {/* const car = [
        {
          name: "Jaguar XE LP250",
          rating: 4.8,
          reviews: 248,
          passengers: 4,
          transmission: "Auto",
          airConditioning: true,
          doors: 4,
          price: 1800,
          image: "https://via.placeholder.com/200x120?text=Jaguar",
        },
        {
          name: "Audi R8",
          rating: 4.6,
          reviews: 198,
          passengers: 2,
          transmission: "Auto",
          airConditioning: true,
          doors: 2,
          price: 2100,
          image: "https://via.placeholder.com/200x120?text=Audi+R8",
        },
        {
          name: "BMW M3",
          rating: 4.5,
          reviews: 206,
          passengers: 4,
          transmission: "Auto",
          airConditioning: true,
          doors: 4,
          price: 1600,
          image: "https://via.placeholder.com/200x120?text=BMW+M3",
        },
        {
          name: "Lamborghini Huracan",
          rating: 4.3,
          reviews: 236,
          passengers: 2,
          transmission: "Auto",
          airConditioning: true,
          doors: 2,
          price: 2300,
          image: "https://via.placeholder.com/200x120?text=Lambo",
        },
      ];*/}
    return(
       
       <div className="car-card flex ">
        <img src="skdjsk"alt="car" className="rounded-t-2xl" />
        <div className="CarContent">
        <h1>{name}</h1>
        
            <span className="rating">
                
            </span>
<div className="car-info">
    <ul>
        <li> Passengers</li>
        <li> transmission</li>
        <li>Air Conditioning</li>
        <li> doors</li>
    </ul>
    <p className="price">$<span >/day</span></p>
    <button >Rent Now</button>
</div>
        </div>
        <div className="car-card">
        <img src="skdjsk"alt="car" className="rounded-t-2xl" />
        <div className="CarContent">
        <h1>{name}</h1>
        
            <span className="rating">
                
            </span>
<div className="car-info">
    <ul>
        <li> Passengers</li>
        <li> transmission</li>
        <li>Air Conditioning</li>
        <li> doors</li>
    </ul>
    <p className="price">$<span >/day</span></p>
    <button >Rent Now</button>
</div>
<div className="review">
    <h2>Reviews</h2>
     {/* Review Form */}
     <form onSubmit>
                  <input
                    type="text"
                    name="review"
                    placeholder="Write a review..."
                    className="w-full border rounded-lg px-3 py-1 focus:outline-none focus:ring focus:ring-lime-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-lime-600 text-white py-1 rounded-lg hover:bg-lime-700 transition"
                  >
                    Submit Review
                  </button>
                </form>
</div>
        </div>
       
        
       </div><div className="car-card">
        <img src="skdjsk"alt="car" className="rounded-t-2xl" />
        <div className="CarContent">
        <h1>{name}</h1>
        
            <span className="rating">
                
            </span>
<div className="car-info">
    <ul>
        <li> Passengers</li>
        <li> transmission</li>
        <li>Air Conditioning</li>
        <li> doors</li>
    </ul>
    <p className="price">$120<span >/day</span></p>
    <button >Rent Now</button>
</div><div className="review">
    <h2>Reviews</h2>
     {/* Review Form */}
     <form onSubmit>
                  <input
                    type="text"
                    name="review"
                    placeholder="Write a review..."
                    className="w-full border rounded-lg px-3 py-1 focus:outline-none focus:ring focus:ring-lime-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-lime-600 text-white py-1 rounded-lg hover:bg-lime-700 transition"
                  >
                    Submit Review
                  </button>
                </form>
</div>
      
        </div>
       
        
       </div>
        
       </div>
       
    )
}