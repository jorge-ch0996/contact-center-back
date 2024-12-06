import sharedStyles from "../../sharedStyles.module.css";
import styles from "./NavBar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={sharedStyles.container}>
        <div className={styles.navbarContent}>
          <a href="/home">
            Home
          </a>
          <div>
            <ul>
              <li>
                <a href="/callcenter">
                  Call Center
                </a>
              </li>
              <li>
                <a href="/admin">
                  Admin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}