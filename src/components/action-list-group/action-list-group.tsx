import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { ActionListGroupTitle } from "../action-list-group-title/action-list-group-title";
import { ActionListGroupItem } from "../action-list-group-item/action-list-group-item";

import styles from "./action-list-group.scss?inline";
interface ActionListGroupProps {
  title?: string;

  actions: Array<{
    label: string;
    as: "a" | "button";
    role?: string;
    icon?: any;
    onClick$?: () => void;
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
          return (
            <ActionListGroupItem
              key={action.label}
              label={action.label}
              as={action.as}
              role={action.role}
              icon={action.icon && action.icon}
              isFocused={action.focusedItemIndex === index}
              {...(action.as === "a"
                ? { href: action.href }
                : { onClick$: action.onClick$ })}
            />
          );
        })}
      </div>
    );
  }
);
