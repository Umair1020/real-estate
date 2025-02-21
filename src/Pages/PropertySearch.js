import React from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PropertyReport = () => {
  return (
    <div className="p-5">
      <h1 className="text-center">WORKING ON THIS PAGE </h1>
      <h1 className="text-2xl font-bold text-orange-500">Basic Report</h1>
      <p className="text-gray-600">498 London Road, London | Post Code: SE23 3TY</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <MapContainer center={[51.5074, -0.1278]} zoom={13} className="h-64 w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[51.5074, -0.1278]}>
              <Popup>Property Location</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div>
          <img src="/property-interior.jpg" alt="Interior" className="w-full h-32 object-cover" />
          <img src="/property-exterior.jpg" alt="Exterior" className="w-full h-32 object-cover mt-2" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p>Bedrooms: 3</p>
          <p>Bathrooms: 2</p>
          <p>Property Type: Flat</p>
          <p>Estimated Value: $580,000</p>
        </div>
        <div>
          <p>Construction Year: 2015</p>
          <p>Floor Area: 94m²</p>
          <p>Tax Band: $17,232</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="bg-orange-500 text-white px-4 py-2 rounded">See Market Information</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">See Crime Statistics</button>
      </div>
    </div>
  );
};

const NearbyTransport = () => {
  return (
    <div className="p-5 border rounded shadow-lg">
      <h1 className="text-2xl font-bold">Nearby Schools & Transport</h1>
      <MapContainer center={[51.5074, -0.1278]} zoom={13} className="h-64 w-full">
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <Marker position={[51.5074, -0.1278]}>
    <Popup>Property Location</Popup>
  </Marker>
</MapContainer>

    </div>
  );
};

const MarketInformation = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Property Sales",
        data: [120, 200, 150, 180],
        backgroundColor: "#FF5733",
      },
    ],
  };
  return (
    <div className="p-5 border rounded shadow-lg">
      <h1 className="text-2xl font-bold">Market Information</h1>
      <Bar data={data} />
    </div>
  );
};

const PropertyInfo = () => {
  return (
    <div className="grid grid-cols-1 gap-6 p-5">
      <PropertyReport />
      <NearbyTransport />
      <MarketInformation />
    </div>
  );
};

export default PropertyInfo;
