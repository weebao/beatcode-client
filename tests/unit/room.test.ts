import { createRawSnippet, mount, unmount } from "svelte";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { RoomSettingsForm } from "$components/game/room";
import { type Infer, superValidate, superForm } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import SubmitBtn from "./components/submit-btn.svelte";

import { RoomSettingsSchema } from "$models/room";

const mockForm = superForm<Infer<typeof RoomSettingsSchema>>(await superValidate(zod(RoomSettingsSchema)));

const testSubmitBtn = createRawSnippet(() => ({
    render: () => `<div></div>`,
    setup: (target) => () => unmount(mount(SubmitBtn, { target }))
}));

test("room settings form should submit correctly", async () => {
    const { container, getByTestId } = render(RoomSettingsForm, { 
        form: mockForm, 
        action: "/submit",
        children: testSubmitBtn
     });

    const form = container.querySelector("form");
    const submitBtn = getByTestId("submit-btn");
    await userEvent.click(submitBtn);

    expect(mockForm.enhance).toHaveBeenCalled();
});