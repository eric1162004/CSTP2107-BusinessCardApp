import Link from "next/link";
import { Fragment } from "react";
import Image from "next/image";
import styles from "../styles/navbar.module.scss";



const Navbar = () => { 
  return (
    <>
      <Fragment>

        <div className={styles.navbar}>
          <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                  <Image
                    className="navbar-brand" 
                    src="/assets/logo2.png"
                    width={150}
                    height={50}  
                  />

                <button className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNavDropdown" 
                        aria-controls="navbarNavDropdown" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation" 
                        >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <Link href="#aboutus">
                        <a className={styles.navbarContact}>About us</a>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="#contactus">
                        <a className={styles.navbarContact}>Contact us</a>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="#instructions">
                        <a className={styles.navbarContact}>Instructions</a>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <button className={styles.button} href="/">
                        Sign up
                      </button>
                    </li>
                    <li class="nav-item">
                      <button className={styles.button} href="/">
                        Login
                      </button>
                    </li>
                  </ul>   
                </div>
              </div>
          </nav>
           
        </div>  
        
      </Fragment>
    </>
  );
}

export default Navbar;
