import React from "react";

import s from "./About.module.css";

function About() {
   return (
      <main className={s.main}>
         <div className={s.content}>
            <h1 className={s.contentTitle}>About</h1>
            <p className={s.template}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, nam sapiente impedit, laborum quisquam suscipit veritatis voluptatum enim quod error consectetur possimus delectus sequi excepturi alias rerum blanditiis pariatur quibusdam.</p>
         </div>
      </main>
   );
}

export default About; 