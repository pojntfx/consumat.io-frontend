import NavListItem from "./NavListItem";
import { NavigationLink } from "./Navbar";
import styles from "../styles/Navbar.module.css";

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
    </ul>
  );
};

export default NavList;
