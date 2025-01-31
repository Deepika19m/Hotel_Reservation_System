import { useNavigate } from "react-router-dom";


const hotels = [
  { name: "Grand Hyatt", rating: 4.5, pricePerNight: 1200, image: "https://www.lemontreehotels.com/assets/fronts/new-images/AHR.jpg", description: "Luxury stay with premium amenities.", address: "Mumbai, India", numOfBeds: 2, petsAllowed: true, category: "King" },
  { name: "The Oberoi", rating: 4.7, pricePerNight: 1500, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxkAKxKVeYOzJ7XgNu0ql9NZOlq10HBALcEg&s", description: "Exquisite hotel with beautiful views.", address: "Delhi, India", numOfBeds: 3, petsAllowed: false, category: "Single" },
  { name: "Taj Mahal Palace", rating: 4.8, pricePerNight: 1800, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/103705059.jpg?k=9e078265b31ad1815a573da8ed2a665f863e3925e1efd730df703421868a2ada&o=&hp=1", description: "Royal palace for a royal experience.", address: "Mumbai, India", numOfBeds: 4, petsAllowed: true, category: "Twins" },
  { name: "Marriott Hotel", rating: 4.2, pricePerNight: 1100, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRf-0DHohhqy6bRiwTgCYFYZHPqF1AHTQhJQ&s", description: "Modern hotel with a variety of amenities.", address: "Bangalore, India", numOfBeds: 2, petsAllowed: true, category: "King" },
  { name: "ITC Grand Chola", rating: 4.6, pricePerNight: 1300, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0NfAfuPOkK6bSGq1IS5e9h3VsHWTgvMq9Ww&s", description: "Luxury hotel with world-class service.", address: "Chennai, India", numOfBeds: 3, petsAllowed: false, category: "Single" },
  { name: "Leela Palace", rating: 4.9, pricePerNight: 2000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSotAqLNg72wqQlgvJtQ-qhN82McXDehmbjLw&s", description: "A palace-like experience for guests.", address: "Delhi, India", numOfBeds: 4, petsAllowed: true, category: "Twins" },
  { name: "Radisson Blu", rating: 4.3, pricePerNight: 1400, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEKJlvRS7f4Vmoo3Knxw5oHMQ7DpGaEpxBNw&s", description: "A chic and modern hotel with excellent amenities.", address: "Mumbai, India", numOfBeds: 2, petsAllowed: false, category: "King" },
  { name: "The Park Hotel", rating: 4.1, pricePerNight: 1050, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkhYayJU0uN-zK3u3UCMaTAcWCRNOIIcJFtQ&s", description: "Comfortable and affordable stay with great views.", address: "Kolkata, India", numOfBeds: 1, petsAllowed: true, category: "Single" },
  { name: "Novotel", rating: 4.0, pricePerNight: 1020, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA24UbyWNbiIsIsOVvcKD_fYWRXRJmOJPw_w&s", description: "A budget-friendly option for travelers.", address: "Hyderabad, India", numOfBeds: 1, petsAllowed: false, category: "Twins" },
  { name: "JW Marriott", rating: 4.4, pricePerNight: 1600, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_176QDVSbMomwguwJXiBFZlvKdrVQAxZ8zA&s", description: "5-star luxury with amazing views.", address: "Goa, India", numOfBeds: 3, petsAllowed: true, category: "King" },
];

const HotelList = () => {
  const navigate = useNavigate();


  const handleViewDetails = (hotel) => {
    navigate("/hotel-details", { state: hotel });  
  };

  return (
    <div className="hotel-list-container">
      <h1>HOTEL RESERVATION SYSTEM</h1>
      <ul className="hotel-list">
        {hotels.map((hotel, index) => (
          <li key={index} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} className="hotel-image" />
            <h3>{hotel.name}</h3>
            <div className="hotel-rating">Rating: {hotel.rating} ★</div>
            <div className="hotel-price">Price per night: ${hotel.pricePerNight}</div>
           
            <button onClick={() => handleViewDetails(hotel)} className="view-details-btn">
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;
