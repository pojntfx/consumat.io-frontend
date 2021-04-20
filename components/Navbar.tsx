import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.css";

enum NavigationLink {
  Home,
  Discover,
  Library,
  Search,
}

const Navbar = () => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState<number>(null);
  const [isMobile, setMobile] = useState(true);
  const [isMobileNavbarActive, setMobileNavbarActive] = useState(false);
  const [
    activeNavigationLink,
    setActiveNavigationLink,
  ] = useState<NavigationLink>(NavigationLink.Home);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setActiveNavigationLink(getNavigationLinkForUrl(router.pathname));

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", (url: string) => {
      setActiveNavigationLink(getNavigationLinkForUrl(url));
    });
  }, []);

  useEffect(() => {
    if (windowWidth === null) return;
    windowWidth < 768 ? setMobile(true) : setMobile(false);
  }, [windowWidth]);

  const getNavigationLinkForUrl = (url: string): NavigationLink | null => {
    if (url === "/") {
      return NavigationLink.Home;
    } else if (url.includes("/discover")) {
      return NavigationLink.Discover;
    } else if (url.includes("/library")) {
      return NavigationLink.Library;
    } else if (url.includes("/search")) {
      return NavigationLink.Search;
    } else {
      return null;
    }
  };

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
              <li
                className={`${styles.navigationLink} ${styles.navigationItem} ${
                  activeNavigationLink === NavigationLink.Home && styles.active
                }`}
              >
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li
                className={`${styles.navigationLink} ${styles.navigationItem} ${
                  activeNavigationLink === NavigationLink.Discover &&
                  styles.active
                }`}
              >
                <Link href="/discover">
                  <a>Discover</a>
                </Link>
              </li>
              <li
                className={`${styles.navigationLink} ${styles.navigationItem} ${
                  activeNavigationLink === NavigationLink.Library &&
                  styles.active
                }`}
              >
                <Link href="/library">
                  <a>Library</a>
                </Link>
              </li>
              <li
                className={`${styles.navigationLink} ${styles.navigationItem} ${
                  activeNavigationLink === NavigationLink.Search &&
                  styles.active
                }`}
              >
                <Link href="/search">
                  <a>Search</a>
                </Link>
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
            <li
              className={`${styles.navigationLink} ${
                styles.navigationItemMobile
              } ${
                activeNavigationLink === NavigationLink.Home && styles.active
              }`}
            >
              <Link href="/">
                <a onClick={() => setMobileNavbarActive(false)}>Home</a>
              </Link>
            </li>
            <li
              className={`${styles.navigationLink} ${
                styles.navigationItemMobile
              } ${
                activeNavigationLink === NavigationLink.Discover &&
                styles.active
              }`}
            >
              <Link href="/discover">
                <a onClick={() => setMobileNavbarActive(false)}>Discover</a>
              </Link>
            </li>
            <li
              className={`${styles.navigationLink} ${
                styles.navigationItemMobile
              } ${
                activeNavigationLink === NavigationLink.Library && styles.active
              }`}
            >
              <Link href="/library">
                <a onClick={() => setMobileNavbarActive(false)}>Library</a>
              </Link>
            </li>
            <li
              className={`${styles.navigationLink} ${
                styles.navigationItemMobile
              } ${
                activeNavigationLink === NavigationLink.Search && styles.active
              }`}
            >
              <Link href="/search">
                <a onClick={() => setMobileNavbarActive(false)}>Search</a>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
