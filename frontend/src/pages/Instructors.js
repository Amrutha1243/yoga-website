import React, { useEffect, useState } from "react";

const InstructorPage = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/instructors") // ✅ Make sure your backend route matches
      .then((res) => res.json())
      .then((data) => setInstructors(data))
      .catch((err) => console.error("Error fetching instructors:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Meet Our Instructors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {instructors.map((inst) => (
          <div
            key={inst._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
          >
            {inst.image && (
              <img
                src={inst.image}
                alt={inst.name}
                className="w-full h-56 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{inst.name}</h2>
              <p className="text-green-600 font-medium">{inst.specialization}</p>
              <p className="text-gray-500 text-sm mb-2">
                Experience: {inst.experience}
              </p>
              <p className="text-gray-600 text-sm">{inst.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorPage;
