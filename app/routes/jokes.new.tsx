import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

import { db } from "~/utils/db.server";

// Bad request for form validation
import { badRequest } from "~/utils/request.server";

function validateJokeContent(content: string) {
  if (content.length < 10) return "This joke is too short";
}
function validateJokeName(name: string) {
  if (name.length < 3) return "This joke name is too short";
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();

  const content = form.get("content");
  const name = form.get("name");

  // validating --> condition 1
  // retrun badreq data if form not filled properly
  if (typeof content !== "string" || typeof name !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "The form was not submitted correctly",
    });
  }

  // validating --> condition 2
  // defining fieldError if any
  const fieldErrors = {
    content: validateJokeContent(content),
    name: validateJokeName(name),
  };

  // definging fields for structured object of form filled data
  const fields = { content, name };

  // validatiion --> condition 3
  /* return an error message if some error is presnet 
    in field error object, checks it via the below function*/
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  // after all validation db is saved with the new joke data
  const joke = await db.joke.create({
    data: fields,
  });
  return redirect(`/jokes/${joke.id}`);
}

export default function JokesNew() {
  const actionData = useActionData<typeof action>();

  
  return (
    <div>
      <p>Add your hilarious joke</p>
      <form method="post">
        {/* Name of the JOke */}
        <div>
          <label>
            Name:{" "}
            <input
              defaultValue={actionData?.fields?.name}
              type="text"
              name="name"
              aria-invalid={Boolean(actionData?.fieldErrors?.name)}
              aria-errormessage={
                actionData?.fieldErrors?.name ? "name-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.name ? (
            <p className="form-validation-error" id="name-error" role="alert">
              {actionData.fieldErrors.name}
            </p>
          ) : null}
        </div>

        {/* Content of the joke */}
        <div>
          <label>
            Content
            <textarea
              defaultValue={actionData?.fields?.content}
              name="content"
              aria-invalid={Boolean(actionData?.fieldErrors?.content)}
              aria-errormessage={
                actionData?.fieldErrors?.content ? "content-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.content ? (
            <p
              className="form-validation-error"
              id="content-error"
              role="alert"
            >
              {actionData.fieldErrors.content}
            </p>
          ) : null}
        </div>

        {/* Submit Button */}
        <div>
          {/* present error if int are filled in form, formError */}
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
