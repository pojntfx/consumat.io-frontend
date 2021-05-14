import Link from "next/link";
import styles from "../../styles/Navbar.module.css";

type NavListItemProps = {
  title: string;
  href: string;
  isActive: boolean;
  isMobile?: boolean;
  setMobileNavbarVisibility?: (boolean) => void;
};

const NavListItem = ({
  title,
  href,
  isActive,
  isMobile = false,
  setMobileNavbarVisibility = null,
}: NavListItemProps) => {
  return (
    <li>
      <Link href={href}>
        <a
          className={`navigation-link ${styles.link} ${
            isMobile ? styles.navigationLinkMobile : styles.navigationLink
          } dark:hover:border-white dark:hover:text-white ${
            isActive && styles.active + " active"
          }`}
          onClick={
            setMobileNavbarVisibility &&
            (() => setMobileNavbarVisibility(false))
          }
        >
          {title}
        </a>
      </Link>
    </li>
  );
};

export default NavListItem;
