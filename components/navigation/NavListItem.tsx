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
          className={`${styles.link} ${
            isMobile ? styles.navigationLinkMobile : styles.navigationLink
          } ${isActive && styles.active}`}
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
