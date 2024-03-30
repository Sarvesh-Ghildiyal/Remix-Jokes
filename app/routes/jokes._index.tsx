/* eslint-disable react/no-unescaped-entities */

import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { db } from "~/utils/db.server";

export async function loader() {
  const count = await db.joke.count();
  const randomNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    skip: randomNumber,
    select: { id: true, name: true, content: true },
    take: 1,
  });

  return json({ randomJoke });
}

export default function IndexJokes() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <p>
        Here's a <strong>Random</strong> joke:
      </p>
      <p>{data.randomJoke.content}</p>
      <Link to={data.randomJoke.id}>"{data.randomJoke.name}" Permalink</Link>
    </div>
  );
}
