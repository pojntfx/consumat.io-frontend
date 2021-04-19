import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState<number>(null);
  const [isMobile, setMobile] = useState(true);
  const [isMobileNavbarActive, setMobileNavbarActive] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth === null) return;
    windowWidth < 768 ? setMobile(true) : setMobile(false);
    console.log(`Current width: ${windowWidth}`);
    console.log(`Is mobile? ${isMobile}`);
  }, [windowWidth]);

  return (
    <div>
      <nav
        className={`${
          isMobileNavbarActive
            ? "bg-gray-800 text-gray-50"
            : "bg-gray-50 text-gray-800"
        } md:bg-gray-50 md:text-gray-800`}
      >
        <div className="flex justify-between items-center p-4">
          <h1 className="text-4xl font-black">
            <Link href="/">CONSUMAT.IO</Link>
          </h1>

          {!isMobile && (
            <ul className="flex text-xl">
              <li className={styles.navigationItem}>
                <Link href="/">Home</Link>
              </li>
              <li className={styles.navigationItem}>
                <Link href="/discover">Discover</Link>
              </li>
              <li className={styles.navigationItem}>
                <Link href="/library">Library</Link>
              </li>
              <li className={styles.navigationItem}>
                <Link href="/search">Search</Link>
              </li>
            </ul>
          )}

          <button
            className="md:hidden cursor-pointer focus:outline-none"
            onClick={() => setMobileNavbarActive(!isMobileNavbarActive)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {isMobile && (
          <ul
            className={`${
              isMobileNavbarActive ? "flex" : "hidden"
            } flex-col text-xl items-center mb-4`}
          >
            <li className={styles.navigationItemMobile}>
              <Link href="/">Home</Link>
            </li>
            <li className={styles.navigationItemMobile}>
              <Link href="/discover">Discover</Link>
            </li>
            <li className={styles.navigationItemMobile}>
              <Link href="/library">Library</Link>
            </li>
            <li className={styles.navigationItemMobile}>
              <Link href="/search">Search</Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
