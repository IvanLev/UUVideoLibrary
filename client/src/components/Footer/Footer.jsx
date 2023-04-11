import React from "react";
import s from './Footer.module.css'

function Footer(){
   return(
      <footer className={s.footer}>
         <div className={s.footerCopy}>
            Copyrights, 2023
         </div>
         <div className={s.footerText}>
            Lorem ipsum dolor sit amet.
         </div>
      </footer>
   );
}

export default Footer