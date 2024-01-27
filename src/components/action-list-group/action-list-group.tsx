import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { ActionListGroupTitle } from "../action-list-group-title/action-list-group-title";
import { ActionListGroupItem } from "../action-list-group-item/action-list-group-item";

import styles from "./action-list-group.scss?inline";
interface ActionListGroupProps {
  title?: string;

  actions: Array<{
    label: string;
    role?: string;
    icon?: any;
    onSelect$?: () => void;
    focusedItemIndex?: number;
  }>;
}

export const ActionListGroup = component$<ActionListGroupProps>(
  (props: ActionListGroupProps) => {
    useStylesScoped$(styles);
    return (
      <div class="action-list-group">
        <ActionListGroupTitle title={props.title} />
        {props.actions.map((action: any, index: number) => {
          const key = `${action.label}-${index}`;
          return (
            <ActionListGroupItem
              key={key}
              label={action.label}
              role={action.role}
              icon={action.icon && action.icon}
              isFocused={action.focusedItemIndex === index}
              onSelect$={action.onSelect$}
            />
          );
        })}
      </div>
    );
  }
);
