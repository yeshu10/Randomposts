import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
    <Link to="/" className="text-2xl font-bold">
      ChaiCode
    </Link>
    <div>
      <a href="https://chaicode.com" target="_blank" rel="noopener noreferrer">
        <img src="/path-to-your-logo.png" alt="ChaiCode" className="w-10 h-10" />
      </a>
    </div>
  </nav>
);

export default Navbar;
