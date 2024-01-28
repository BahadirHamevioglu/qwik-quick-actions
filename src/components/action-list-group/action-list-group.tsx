import { component$, useStylesScoped$ } from "@builder.io/qwik";

import { ActionListGroupProps } from "../../types/types";

import styles from "./action-list-group.scss?inline";

import { ActionListGroupTitle } from "../action-list-group-title/action-list-group-title";
import { ActionListGroupItem } from "../action-list-group-item/action-list-group-item";

export const ActionListGroup = component$<ActionListGroupProps>(
  (props: ActionListGroupProps) => {
    const { title, items } = props;
    useStylesScoped$(styles);
    return (
      <div class="action-list-group">
        <ActionListGroupTitle title={title} />
        {items.map((item, index) => (
          <ActionListGroupItem
            key={item.label + index}
            label={item.label}
            role={item.role}
            icon={item.icon}
            isFocused={item.focusedItemIndex === index}
            onSelect$={item.onSelect$}
          />
        ))}
      </div>
    );
  }
);
