/* eslint-disable react/no-unescaped-entities */

import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";
import { db } from "~/utils/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
    select: { id: true, name: true, content: true },
  });
  return json({ joke });
}

export default function JokesRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Here's your <strong>Hilarioud</strong> joke:</p>
      <p>{data.joke?.content}</p>
      <Link to=".">"{data.joke?.name}" Permalink</Link>
    </div>
  );
}
