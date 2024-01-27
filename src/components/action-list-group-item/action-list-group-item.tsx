import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { KeyIcon } from "../key-icon/key-icon";

import styles from "./action-list-group-item.scss?inline";

interface ActionListGroupItemProps {
  icon?: any;
  label: string;
  shortcut?: string;
  as: "a" | "button";
  href?: string;

  onClick$?: () => void;
  role?: string;

  isFocused?: boolean;
}

export const ActionListGroupItem = component$(
  (props: ActionListGroupItemProps) => {
    const { isFocused } = props;
    useStylesScoped$(styles);
    const Tag = props.as === "button" ? "button" : "a";
    const tagProps = Tag === "button" ? {} : { href: props.href };

    return (
      <Tag
        {...tagProps}
        onClick$={props.onClick$}
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
      </Tag>
    );
  }
);
