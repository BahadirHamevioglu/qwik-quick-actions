import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { KeyIcon } from "../key-icon/key-icon";

import styles from "./action-list-group-item.scss?inline";

interface ActionListGroupItemProps {
  icon?: any;
  label: string;
  shortcut?: string;
  href?: string;

  onSelect$?: () => void;
  role?: string;

  isFocused?: boolean;
}

export const ActionListGroupItem = component$(
  (props: ActionListGroupItemProps) => {
    const { isFocused } = props;
    useStylesScoped$(styles);

    return (
      <div
        onClick$={props.onSelect$}
        class={`
        action-list-group-item ${isFocused ? "action-list-group-item-focused" : ""}
        `}
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
