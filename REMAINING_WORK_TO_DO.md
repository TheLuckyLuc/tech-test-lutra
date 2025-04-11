# Remaining work I would've done, had I spent more time on this

## Visualise error responses in the client

I'm conscious that there's not really any useful visual error handling in place for the user, aside from the bit of form feedback.

This is the first time I've used tRPC, and only realised towards the end that there is a TRPCError class that can neatly provide the necessary error data to be displayed on the client.

## Add tests

With the focus being to meet the assessment steps, I paid absolutely no attention to adding any tests. In a real world scenario I would've wanted to make sure I implement sufficient unit and integration tests, once features were being built out.

## Create more reusable components

I left the splitting out of code into separate components mostly out throughout my work, as I was more focussed on wanting to make sure I can get all the assessment criteria functioning as expected.

With more time, I'd want to make the `Form` component a lot more generic, so this can be more flexibly used across the application where needed, as it's currently very heavily tied to specifically appointment creation logic.

The patient view has a few sections that could be made into separate components i.e. patient details, the appointment creation switching part (would be nice to be made into a modal), and the appointment list.

## Handle loading states more nicely

At the moment I'm not neatly handling loading states, aside from adding a placeholder "...loading" value. With more time, I would want to make sure this is more visually appealing and we only render in applicable components once data is available, otherwise providing the user with a message stating no data is present (and any associated error messages).

## Add nicer styling

I paid barely any attention to the styling for this test to be completely honest. The form component I used was copied (and slightly altered) from here: https://merakiui.com/components/application-ui/forms. Hopefully that's okay.

With me not having used drizzle or tRPC ever before, I wanted to make sure I spent enough time reading into their docs to get at least somewhat of a working example together.

If I had more time to spend on this, I would by all means aim to make the general UI appear a lot neater than it currently does.
