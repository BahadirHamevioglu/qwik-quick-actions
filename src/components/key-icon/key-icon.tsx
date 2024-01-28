import {
  component$, useStylesScoped$
} from "@builder.io/qwik";

import { KeyIconProps } from "../../types/types";

import styles from "./key-icon.scss?inline";

export const KeyIcon = component$((props: KeyIconProps) => {
  useStylesScoped$(styles);

  return (
    <div class="key-icon">
      <props.icon />
    </div>
  );
});
