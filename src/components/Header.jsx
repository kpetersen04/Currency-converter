import { Link } from "react-router-dom";

const Header = () => {
  const navLinks = [
    { title: "Currency Converter", slug: "/" },
    { title: "See All Currencies", slug: "/currencies" },
    // { title: "Favorites", slug: "/favorite" },
    // {
    //   title: "Historical Currency Data",
    //   slug: "/currencies/historical-data/id",
    // },
  ];

  return (
    <header className="header">
      <nav>
        <ul>
          {navLinks.map((link, index) => (
            <Link className="header_link" to={link.slug} key={index}>
              <li>{link.title}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
