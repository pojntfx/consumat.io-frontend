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
    <li
      className={`${styles.navigationLink} ${
        isMobile ? styles.navigationItemMobile : styles.navigationItem
      } ${isActive && styles.active}`}
    >
      <Link href={href}>
        <a
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
