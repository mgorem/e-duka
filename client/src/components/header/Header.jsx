import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { auth } from "../../firebase/config"
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux"
import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";

const logo = (
  <div className={styles.logo}>
  <Link to="/">
    <h2>e<span>Duka</span>.</h2>
  </Link>
</div>
)

const cart = (
  <span className={styles.cart}>
  <Link to="/cart">
    Cart
    <FaShoppingCart size={20} />
    <p>0</p>
  </Link>
</span>
)

const activeLink = ({ isActive }) =>(isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // monitor current signed in user, every time page loads
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user)
        // const uid = user.uid;
        if (user.displayName == null) {
          const u1 = user.email.slice(0, -10)
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
          console.log(uName)
          setDisplayName(uName)
        } else {
          setDisplayName(user.displayName)
        }

        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: user.uid
        }))
      } else {
        setDisplayName("")
      }
    });
  }, [])

  const toggleMenu =() => {
    setShowMenu(!showMenu);
  };

  const hideMenu =() => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth).then(() => {
     toast.success("Logged out successfully")
     navigate("/")
    }).catch((error) => {
      toast.error(error.message)
    });
  }


  return (
    <header>
      <div className={styles.header}>

        {/* header logo */}
        {logo}

        {/* header center */}
        <nav className={showMenu ? `${styles["show-nav"]}` 
        : `${styles["hide-nav"]}`}>

          <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : 
          `${styles["nav-wrapper"]}`} onClick={hideMenu}>
          </div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>Contact Us</NavLink>
            </li>
          </ul>

          {/* header right */}
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <NavLink to="/login" className={activeLink}>Login</NavLink>
              <a href="#">
                <FaUserCircle size={16} style={{marginRight: "5px"}} />
                Hi, {displayName}
              </a>
              <NavLink to="/register" className={activeLink}>Register</NavLink>
              <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
              <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
            </span>
            {cart}
          </div>
        </nav>

        {/* hamburger icon */}
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
        </div>
      </div>
    </header>
  );
};

export default Header;
