import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { ImCross } from 'react-icons/im';
import '../App.css';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [pressed, setPress] = useState(false);

  const handleClick = () => {
    logout()
  }

  return (
    <div className="bg-dark text-white p-4"> {/* Set background color here */}
      <div className="w-4/10 mx-auto flex flex-row justify-end items-center"> {/* Align items to the left */}
        <div className="flex font-poppins font-semibold space-x-10"> {/* Space between items */}
          <Link to="/">
            <p className="hover:text-[#dede50] transition-all duration-200 ease-in">Home</p>
          </Link>

          <Link to="/earth">
            <p className="hover:text-[#dede50] transition-all duration-200 ease-in">Earth</p>
          </Link>

          <Link to="/mars">
            <p className="hover:text-[#dede50] transition-all duration-200 ease-in">Mars</p>
          </Link>

          <Link to="/potd">
            <p className="hover:text-[#dede50] transition-all duration-200 ease-in">POTD</p>
          </Link>

          <Link to="/patents">
            <p className="hover:text-[#dede50] transition-all duration-200 ease-in">Patents</p>
          </Link>

          <nav>
            {user && (
                <div className="flex font-poppins font-semibold space-x-10">
                  <span>{user.email}</span>
                  <button onClick={handleClick}>Log out</button>
                </div>
            )}
            {!user && (
                <div className="flex font-poppins font-semibold space-x-10">
                  <Link to="/login">
                    <p className="hover:text-[#dede50] transition-all duration-200 ease-in">Login</p>
                  </Link>
                  <Link to="/signup">
                    <p className="hover:text-[#dede50] transition-all duration-200 ease-in">Signup</p>
                  </Link>
                </div>
            )}
          </nav>

          <div onClick={() => setPress(true)} className="sm:hidden cursor-pointer">
            <GiHamburgerMenu className={pressed ? 'hidden' : 'block'} color="yellow" size="30" />
          </div>

          <div onClick={() => setPress(false)} className="sm:hidden cursor-pointer">
            <ImCross className={pressed ? 'block' : 'hidden'} color="yellow" size="25" />
          </div>


        </div>
      </div>
      {pressed && ( /* Conditionally display the mobile menu */
        <div className="flex transition-all duration-300 ease-in bg-yellow-400 flex-col items-center justify-center sm:hidden text-black font-bold font-poppins">
          <Link className="py-4 hover:bg-burger w-full flex justify-center hover:text-yellow-400 transition-all duration-300 ease-in" to="/">
            Home
          </Link>
        </div>
      )}
    </div>
  );
}
export default Navbar
