import {
  component$, useStylesScoped$
} from "@builder.io/qwik";

import { ActionListGroupResultProps } from "../../types/types";
import { ActionListGroupItem } from "../action-list-group-item/action-list-group-item";
import { ActionListGroupTitle } from "../action-list-group-title/action-list-group-title";

import styles from "./action-list-group-result.scss?inline";

export const ActionListGroupResult = component$<ActionListGroupResultProps>(
  (props: ActionListGroupResultProps) => {
    const {
      title, items
    } = props;
    useStylesScoped$(styles);

    return (
      <div class="action-list-group-result">
        <ActionListGroupTitle title={title} />
        {items.map((item, index) => (
          <ActionListGroupItem
            icon={item.icon}
            isFocused={item.focusedItemIndex === index}
            key={item.label}
            label={item.label}
            role={item.role}
            onSelect$={item.onSelect$}
          />
        ))}
      </div>
    );
  }
);
