import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <div className="pt-16 bg-gray-50">
      {/* Hero Slider */}
      <div className="relative w-full h-[80vh]">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="w-full h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className="relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg')",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Embrace Inner Peace with <span className="text-green-300">PranaVeda</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                  Transform your body, calm your mind, and awaken your spirit with our yoga programs.
                </p>
                <Link
                  to="/classes"
                  className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
                >
                  Explore Classes
                </Link>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              className="relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/4325466/pexels-photo-4325466.jpeg')",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Balance. Strength. Serenity.
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                  Join a community that values wellness and personal growth.
                </p>
                <Link
                  to="/classes"
                  className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div
              className="relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/2908175/pexels-photo-2908175.jpeg')",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Breathe in peace, breathe out stress.
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                  Relax, recharge, and reconnect through yoga practices.
                </p>
                <Link
                  to="/classes"
                  className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
                >
                  Start Today
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Feature Section */}
      <div className="max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition">
          <h3 className="text-2xl font-semibold text-green-600">Expert Trainers</h3>
          <p className="mt-3 text-gray-600">
            Learn from certified yoga professionals with years of experience.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition">
          <h3 className="text-2xl font-semibold text-green-600">Flexible Schedules</h3>
          <p className="mt-3 text-gray-600">
            Morning, evening, and weekend classes to fit your lifestyle.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition">
          <h3 className="text-2xl font-semibold text-green-600">Holistic Wellness</h3>
          <p className="mt-3 text-gray-600">
            More than poses – experience meditation, breathing, and balance.
          </p>
        </div>
      </div>
    </div>
  );
}
