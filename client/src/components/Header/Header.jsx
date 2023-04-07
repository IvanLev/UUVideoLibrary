import s from "./Header.module.css"

function Header(){
   return(
      <header className={s.header}>
        <a href="" className={s.headerLogo}>
         <img src="/img/uuVideoLOGO.png" />
        </a>
        <nav className={s.headerMenu}>
          <ul className={s.headerList}>
            <li><a href="" className={s.headerLink}>Menu link</a></li>
            <li><a href="" className={s.headerLink}>Menu link</a></li>
            <li><a href="" className={s.headerLink}>Menu link</a></li>
            <li><a href="" className={s.headerLink}>Menu link</a></li>
            <li><a href="" className={s.headerLink}>Menu link</a></li>
          </ul>
        </nav>
      </header>
   );
}

export default Header;