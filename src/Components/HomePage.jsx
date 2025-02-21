import CarCard from "./CarCard";

function HomePage(){

    return(
        <div className="homepage">
 <div className="header">
         <h1 className="text-2xl font-bold text-red-600">BookMyCar 🚗</h1>
         <nav className="space-x-4">
      <a href="#" className="hover:text-lime-600">Home</a>
      <a href="#" className="hover:text-lime-600">About</a>
      <a href="#" className="hover:text-lime-600">Rent</a>
      <a href="#" className="hover:text-lime-600">Book</a>
      <a href="#" className="hover:text-lime-600">Contact</a>
    </nav>
 
        </div>
{/*       car-listings           */}
        <div className="car-listing">
            <section className="car-header">
                <p>Popular Products of the month</p>
                <h1>Most popular car rental deals</h1>
                <div className="car-card">
                    <CarCard/>
                </div>
            </section>
            </div>
        </div>
       

       
    )
}
export default HomePage;