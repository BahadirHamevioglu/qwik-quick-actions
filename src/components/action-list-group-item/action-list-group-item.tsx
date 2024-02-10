import { component$, useStylesScoped$, $ } from "@builder.io/qwik";

import { Action } from "@/types/types";

import { KeyIcon } from "../key-icon/key-icon";

import styles from "./action-list-group-item.scss?inline";

interface Props extends Action {
  isFocused?: boolean;
  subItemsArray?: (subItems: Action[]) => void; // Ensure this is a function type
}

export const ActionListGroupItem = component$((props: Props) => {
  useStylesScoped$(styles);

  return (
    <div
      class={[
        "action-list-group-item",
        { "action-list-group-item-focused": props.isFocused },
      ]}
      data-index={props.index}
      onClick$={$(() => {
        if (props.subItems) {
          props.subItemsArray && props.subItemsArray(props.subItems);
        } else {
          props.onSelect$ && props.onSelect$();
        }
      })}
    >
      {props.icon && (
        <div class="action-list-group-item-icon">
          <KeyIcon icon={props.icon} />
        </div>
      )}
      <div class="action-list-group-item-label">{props.label}</div>
      {props.role && (
        <div class="action-list-group-item-role">{props.role}</div>
      )}
    </div>
  );
});
