import { LinksFunction } from "@remix-run/node";

import styleUrl from "~/styles/index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styleUrl },
];

export default function IndexRoute() {
  return <p>Hello Index Route</p>;
}
