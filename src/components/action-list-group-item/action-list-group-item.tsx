import { component$, useStylesScoped$, $ } from "@builder.io/qwik";

import { Action } from "@/types/types";

import { KeyIcon } from "../key-icon/key-icon";

import styles from "./action-list-group-item.scss?inline";

interface Props extends Action {
  isFocused?: boolean;
  subItemsArray?: (subItems: Action[], newBreadCrumbs: string[]) => void; // Ensure this is a function type
}

export const ActionListGroupItem = component$((props: Props) => {
  useStylesScoped$(styles);

  const handleItemClick$ = $(() => {
    if (props.subItems) {
      const newBreadCrumbs = props.breadCrumbs
        ? [...props.breadCrumbs, props.label]
        : [props.label];
      props.subItemsArray &&
        props.subItemsArray(props.subItems, newBreadCrumbs);
    } else {
      props.onSelect$ && props.onSelect$();
    }
  });

  return (
    <div
      class={[
        "action-list-group-item",
        { "action-list-group-item-focused": props.isFocused },
      ]}
      data-index={props.index}
      onClick$={handleItemClick$}
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
