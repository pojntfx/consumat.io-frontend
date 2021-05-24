import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/client";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";
import styles from "../../styles/Navbar.module.css";
import { theme } from "../../types/theme";
import { NavigationLink } from "./Navbar";
import NavListItem from "./NavListItem";

type NavListProps = {
  activeNavigationLink: NavigationLink;
  isMobile: boolean;
  isMobileNavVisible: boolean;
  setMobileNavbarVisibility?: (boolean) => void;
};

const NavList = ({
  activeNavigationLink,
  isMobile,
  isMobileNavVisible,
  setMobileNavbarVisibility = null,
}: NavListProps) => {
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  const [session] = useSession();

  return (
    <ul
      className={
        isMobile && isMobileNavVisible
          ? styles.navigationListMobile + " flex"
          : isMobile && !isMobileNavVisible
          ? styles.navigationListMobile + " hidden"
          : styles.navigationList
      }
    >
      <NavListItem
        title="Home"
        href="/"
        isMobile={isMobile}
        isActive={activeNavigationLink === NavigationLink.Home}
        setMobileNavbarVisibility={
          setMobileNavbarVisibility && setMobileNavbarVisibility
        }
      />
      <NavListItem
        title="Discover"
        href="/discover"
        isMobile={isMobile}
        isActive={activeNavigationLink === NavigationLink.Discover}
        setMobileNavbarVisibility={
          setMobileNavbarVisibility && setMobileNavbarVisibility
        }
      />
      <NavListItem
        title="Library"
        href="/library"
        isMobile={isMobile}
        isActive={activeNavigationLink === NavigationLink.Library}
        setMobileNavbarVisibility={
          setMobileNavbarVisibility && setMobileNavbarVisibility
        }
      />
      <NavListItem
        title="Search"
        href="/search"
        isMobile={isMobile}
        isActive={activeNavigationLink === NavigationLink.Search}
        setMobileNavbarVisibility={
          setMobileNavbarVisibility && setMobileNavbarVisibility
        }
      />
      {session && (
        <NavListItem
          title="Account"
          href="/account"
          isMobile={isMobile}
          isActive={activeNavigationLink === NavigationLink.Account}
          setMobileNavbarVisibility={
            setMobileNavbarVisibility && setMobileNavbarVisibility
          }
        />
      )}

      {currentTheme === theme.light ? (
        <button
          className="bg-transparent text-gray-400 hover:text-gray-800 dark:hover:text-white shadow-none hover:shadow-none my-4 md:my-0 ml-1"
          onClick={() => setCurrentTheme(theme.dark)}
        >
          <MoonIcon className="h-8 w-8" />
        </button>
      ) : (
        <button
          className="bg-transparent text-gray-400 hover:text-gray-800 dark:hover:text-white shadow-none hover:shadow-none my-4 md:my-0 ml-1"
          onClick={() => setCurrentTheme(theme.light)}
        >
          <SunIcon className="h-8 w-8" />
        </button>
      )}
    </ul>
  );
};

export default NavList;
