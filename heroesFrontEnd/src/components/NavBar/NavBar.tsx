import React from 'react'
import styles from "./NavBar.module.scss"
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className={styles.bar}>
        <nav>
            <NavLink to={"/"} className={styles.link}>All Heroes</NavLink>
            <NavLink to={"/collection"} className={styles.link}>Collected Heroes</NavLink>
            <NavLink to={"/collection/battle"} className={styles.link}>Battle</NavLink>
        </nav>
    </div>
  )
}

export default NavBar