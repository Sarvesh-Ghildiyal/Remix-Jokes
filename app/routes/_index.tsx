import { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import styleUrl from "~/styles/index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styleUrl },
];

export default function IndexRoute() {
  return (
    <div className="container">
      <div className="content">
        <h1>
          Remix <span>Jokes!</span>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="jokes">Read Jokes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
