import {
  component$, useStylesScoped$
} from "@builder.io/qwik";

import { ActionListGroupItemForComponentProps } from "../../types/types";
import { KeyIcon } from "../key-icon/key-icon";

import styles from "./action-list-group-item.scss?inline";

export const ActionListGroupItem = component$(
  (props: ActionListGroupItemForComponentProps) => {
    useStylesScoped$(styles);

    return (
      <div
        class={[
          'action-list-group-item',
          { "action-list-group-item-focused": props.isFocused }
        ]}
        onClick$={props.onSelect$}
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
  }
);
