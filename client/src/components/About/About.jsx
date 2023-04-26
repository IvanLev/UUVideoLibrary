import React from "react";

import s from "./About.module.css"

function About() {
   return (
      <main className={s.main}>
         <div className={s.content}>
            <h1 className={s.contentTitle}>About</h1>
         </div>
      </main>
   );
}

export default About; 