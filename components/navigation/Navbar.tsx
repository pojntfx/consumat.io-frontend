import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NavList from "./NavList";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/client";

export enum NavigationLink {
  Home,
  Discover,
  Library,
  Search,
  Account,
}

const Navbar = () => {
  const [session] = useSession();
  if (!session) return <></>;

  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState<number>(null);
  const [isMobile, setMobile] = useState(true);
  const [isMobileNavbarActive, setMobileNavbarActive] = useState(false);
  const [activeNavigationLink, setActiveNavigationLink] =
    useState<NavigationLink>(NavigationLink.Home);

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
    } else if (url.includes("/account")) {
      return NavigationLink.Account;
    } else {
      return null;
    }
  };

  return (
    <div>
      <nav className="md:bg-gray-50 md:text-gray-800 dark:bg-gray-800 dark:text-gray-50 shadow mb-4 md:flex md:justify-center">
        <div className="w-full max-w-screen-xl">
          <div className="flex justify-between items-center p-4">
            <h1 className="py-1 px-2 rounded hover:bg-gray-800 hover:text-gray-50 dark:hover:bg-gray-50 dark:hover:text-gray-800 duration-75">
              <Link href="/">CONSUMAT.IO</Link>
            </h1>

            {!isMobile && (
              <NavList
                activeNavigationLink={activeNavigationLink}
                isMobile={isMobile}
                isMobileNavVisible={isMobileNavbarActive}
              />
            )}

            <button
              className="md:hidden cursor-pointer focus:outline-none shadow-none hover:shadow-none"
              onClick={() => setMobileNavbarActive(!isMobileNavbarActive)}
            >
              {isMobileNavbarActive ? (
                <XIcon className="h-8 w-8 bg-gray-50 dark:bg-gray-800 shadow-none hover:shadow-none" />
              ) : (
                <MenuIcon className="h-8 w-8 bg-gray-50 dark:bg-gray-800 shadow-none hover:shadow-none" />
              )}
            </button>
          </div>
        </div>

        {isMobile && (
          <NavList
            activeNavigationLink={activeNavigationLink}
            isMobile={isMobile}
            isMobileNavVisible={isMobileNavbarActive}
            setMobileNavbarVisibility={setMobileNavbarActive}
          />
        )}
      </nav>
    </div>
  );
};

export default Navbar;
