import { Links, LiveReload, Outlet } from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links/>
      </head>
      <body>
        Hello World
        <Outlet />
        <LiveReload />
      </body>
    </html>
  );
}
