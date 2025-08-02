import React, { useEffect, useState } from "react";

export const ClassesPage = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/classes") // ✅ Replace with your actual API route
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error("Error fetching classes:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 mt-8">
      <h1 className="text-3xl font-bold text-center mb-8 pt-8">Our Yoga Classes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105"
          >
            {cls.image && (
              <img
                src={cls.image}
                alt={cls.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{cls.name}</h2>
            <p className="text-gray-600 mb-2">{cls.description}</p>
            <p className="font-medium text-green-600">
              Price: ₹{cls.price || "Free"}
            </p>
            <p className="text-sm text-gray-500">Duration: {cls.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
