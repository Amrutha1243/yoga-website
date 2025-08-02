export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-center md:text-left">
        <div>
          <h3 className="text-xl font-semibold text-white">PranaVeda</h3>
          <p className="mt-2 text-gray-400">Find your inner balance through yoga and meditation.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/classes" className="hover:text-white">Classes</a></li>
            <li><a href="/instructors" className="hover:text-white">Instructors</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white">Contact</h4>
          <p className="mt-2">Email: info@pranaveda.com</p>
          
          <div className="mt-3 flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">📘</a>
            <a href="#" className="hover:text-white">📸</a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-6 text-sm">
        © {new Date().getFullYear()} PranaVeda. All rights reserved.
      </div>
    </footer>
  );
}
