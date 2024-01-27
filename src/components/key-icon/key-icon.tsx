import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./key-icon.scss?inline";

interface KeyIconProps {
  icon: any; // The icon prop is now required
}

export const KeyIcon = component$((props: KeyIconProps) => {
  useStylesScoped$(styles);
  return <div class="key-icon">{props.icon}</div>;
});
