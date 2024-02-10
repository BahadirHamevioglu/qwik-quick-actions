import { component$, useStylesScoped$, $ } from "@builder.io/qwik";

import { Group, Action } from "../../types/types";
import { ActionListGroupItem } from "../action-list-group-item/action-list-group-item";
import { ActionListGroupTitle } from "../action-list-group-title/action-list-group-title";

import styles from "./action-list-group.scss?inline";

interface Props extends Group {
  focusedIndex: number;
  subItemsArray?: (subItems: Action[]) => void;
}

export const ActionListGroup = component$<Props>((props) => {
  useStylesScoped$(styles);

  return (
    <div class="action-list-group">
      <ActionListGroupTitle title={props.title} />
      {props.actions.map((item) => {
        return (
          <ActionListGroupItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            onSelect$={item.onSelect$}
            index={item.index}
            subItems={item.subItems}
            isFocused={props.focusedIndex === item.index}
            role={item.role}
            subItemsArray={
              props.subItemsArray
                ? $((subItems: Action[]) => {
                    props.subItemsArray!(subItems);
                  })
                : undefined
            }
          />
        );
      })}
    </div>
  );
});
