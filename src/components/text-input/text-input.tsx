import {
  component$, useStylesScoped$
} from "@builder.io/qwik";

import { SearchIcon } from "../icons/search-icon/search-icon";

import styles from "./text-input.scss?inline";

interface TextInputProps {
  value?: string;
  onInput$?: (e: InputEvent) => void; // Event handler
}

export const TextInput = component$<TextInputProps>((props: TextInputProps) => {
  useStylesScoped$(styles);

  return (
    <label class="text-input-wrapper">
      <div class="text-input-left-icon">
        <SearchIcon
          color="var(--icon-400)"
          height={20}
          width={20}
        />
      </div>
      <input
        class="text-input-text-area"
        placeholder="Search for action..."
        type="text"
        value={props.value} // Directly bind props value
        autoFocus
        {...(props.onInput$ && { onInput$: props.onInput$ })} // Conditionally spread the onInput$ handler
      />
    </label>
  );
});
