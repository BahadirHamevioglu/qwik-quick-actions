import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./action-list-group-result.scss?inline";

import { ActionListGroupTitle } from "../action-list-group-title/action-list-group-title";
import { ActionListGroupItem } from "../action-list-group-item/action-list-group-item";

interface ActionListGroupResultProps {
  title: string;
  items: ActionListGroupResultItemProps[];
}

interface ActionListGroupResultItemProps {
  label: string;
  role: string;
  icon: string;
  onSelect$: () => void;
  focusedItemIndex: number;
}

export const ActionListGroupResult = component$<ActionListGroupResultProps>(
  (props: ActionListGroupResultProps) => {
    const { title, items } = props;
    useStylesScoped$(styles);
    return (
      <div class="action-list-group-result">
        <ActionListGroupTitle title={title} />
        {items.map((item, index) => (
          <ActionListGroupItem
            key={item.label}
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
