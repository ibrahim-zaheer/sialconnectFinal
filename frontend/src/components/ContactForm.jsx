import React from "react";
import { useForm, ValidationError } from "@formspree/react";

export function ContactForm() {
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

  const [state, handleSubmit] = useForm(formspreeId);

  if (state.succeeded) {
    return (
      <p className="text-center text-lg font-semibold text-green-600">
        Thanks for joining!
      </p>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="sr-only">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          className="w-full px-4 py-2 text-neutral-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-red-500 text-sm"
        />
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Your message"
          rows="3"
          className="w-full px-4 py-2 text-neutral-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="text-red-500 text-sm"
        />
      </div>

      <button
        type="submit"
        className="bg-primary-600 hover:bg-primary-700 text-surface px-4 py-2 rounded-md transition-colors w-full"
        disabled={state.submitting}
      >
        Send Message
      </button>
    </form>
  );
}
