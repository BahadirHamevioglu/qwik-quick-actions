import {
  component$, useStylesScoped$, $
} from "@builder.io/qwik";

import { Action } from "@/types/types";

import { KeyIcon } from "../key-icon/key-icon";

import styles from "./action-list-group-item.scss?inline";

interface Props extends Action {
  isFocused?: boolean;
  subItemsArray?: any;
  breadCrumbTitle?: any;
}
export const ActionListGroupItem = component$((props: Props) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    subItems, subItemsArray, onSelect$, breadCrumbTitle = props.label
  } = props;

  useStylesScoped$(styles);

  const handleItemClick$ = $(() => {
    if (subItems) {
      subItemsArray(subItems);
    } else {
      onSelect$?.();
    }
  });

  return (
    <div
      class={[
        "action-list-group-item",
        { "action-list-group-item-focused": props.isFocused }
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
