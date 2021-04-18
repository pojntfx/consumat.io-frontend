import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [mobileNavbarVisible, setMobileNavbarVisibility] = useState(false);

  return (
    <div>
      <nav className={`${mobileNavbarVisible ? 'bg-gray-800 text-gray-50' : 'bg-gray-50 text-gray-800'} md:bg-gray-50 md:text-gray-800`}>
        <div className='flex justify-between items-center p-4'>
          <h1 className='text-4xl font-black'><Link href='/'>CONSUMAT.IO</Link></h1>
          <ul className='hidden md:flex text-xl'>
            <li className='navigation-item'><Link href='/'>Home</Link></li>
            <li className='navigation-item'><Link href='/discover'>Discover</Link></li>
            <li className='navigation-item'><Link href='/library'>Library</Link></li>
            <li className='navigation-item'><Link href='/search'>Search</Link></li>
          </ul>

          <button className='md:hidden cursor-pointer focus:outline-none' onClick={() => setMobileNavbarVisibility(!mobileNavbarVisible)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>

        <ul className={`${mobileNavbarVisible ? 'flex flex-col' : 'hidden'} text-xl items-center mb-4 md:hidden`}>
          <li className='navigation-item-mobile'><Link href='/'>Home</Link></li>
          <li className='navigation-item-mobile'><Link href='/discover'>Discover</Link></li>
          <li className='navigation-item-mobile'><Link href='/library'>Library</Link></li>
          <li className='navigation-item-mobile'><Link href='/search'>Search</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
