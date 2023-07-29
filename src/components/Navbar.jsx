import React, { useEffect, useState } from "react"
import { BiMenuAltRight } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai"
import { Link, useLocation } from "react-router-dom"
import "./navbar.scss"

function Navbar() {

  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false)

  const [size, setSize] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false)
    }
  }, [size.width, menuOpen])

  const menuToggleHandler = () => {
    setMenuOpen(p => !p)
  }

  const getPageName = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
        return "> Home";
      case "/newelection":
        return "> Election";
      case "/voters":
        return "> Voters";
      case "/editadmin":
        return "> Admin Panel";
      case "/login":
        return "> Logout";
      default:
        return "> Home > Details";
    }
  };

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__content__lopa">
          <label to="/" className="header__content__logo">
            Voting System
          </label>
          <label>{getPageName()}</label>
        </div>
        <nav
          className={`${"header__content__nav"} 
          ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
          }`}
        >
          <ul>
            <Link to="/">
              <button className="btn">Home</button>
            </Link>            
            <Link to="/newelection">
              <button className="btn">Election</button>
            </Link>
            <Link to="/voters">
              <button className="btn">Voters</button>
            </Link>
            <Link to="/editadmin">
              <button className="btn">Admin Panel</button>
            </Link>
            <Link to="/login">
              <button className="btn logout">Logout</button>
            </Link>
          </ul>
        </nav>
        <div className="header__content__toggle">
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar