import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { SearchIcon } from "../icons/search-icon/search-icon";
import { InfoIcon } from "../icons/info-icon/info-icon";
import styles from "./text-input.scss?inline";

interface TextInputProps {
  value?: string;
  onInput$?: (e: Event) => void; // Event handler
}

export const TextInput = component$<TextInputProps>((props: TextInputProps) => {
  useStylesScoped$(styles);

  return (
    <label class="text-input-wrapper">
      <div class="text-input-left-icon">
        <SearchIcon width={20} height={20} color="var(--icon-400)" />
      </div>
      <input
        class="text-input-text-area"
        type="text"
        placeholder="Search for action..."
        autoFocus
        value={props.value} // Directly bind props value
        {...(props.onInput$ && { onInput$: props.onInput$ })} // Conditionally spread the onInput$ handler
      />
      <div>
        <InfoIcon width={20} height={20} color="var(--icon-400)" />
      </div>
    </label>
  );
});
