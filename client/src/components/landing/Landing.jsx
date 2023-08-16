import React from "react"
import { Link } from "react-router-dom"
import styles from "./Landing.module.css"

export default function Landing() {
    return (
        <div className={styles.divLanding}>
          <div className={styles.imgLanding} />
          <div className={styles.titleLanding} >
            <h1 className={styles.title} >
              EXPLORE THE WORLD
            </h1>
          </div>
          <div className={styles.subtitleContain} >
            <h3 className={styles.subtitle} >
              Discover, Connect
              and Create Global 
              Adventures 
              in One Place
            </h3>
          </div>
          <div className={styles.decoLanding} />
          <div className={styles.deco2Landing} />
          <Link className={styles.buttonLanding} to={"/home"}><p>Explore Now</p>
            <svg stroke-width="4" stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-6 w-6" >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" ></path>
            </svg>
          </Link>
        </div>
      );
}