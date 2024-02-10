import { component$, useStylesScoped$, $ } from "@builder.io/qwik";

import { Group, Action } from "../../types/types";
import { ActionListGroupItem } from "../action-list-group-item/action-list-group-item";
import { ActionListGroupTitle } from "../action-list-group-title/action-list-group-title";

import styles from "./action-list-group.scss?inline";

interface Props extends Group {
  focusedIndex: number;
  // subItemsArray fonksiyonunun iki parametre alacak şekilde güncellenmiş hali
  subItemsArray?: (subItems: Action[], newBreadcrumbs: string[]) => void;
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
            isFocused={props.focusedIndex === item.index}
            {...item}
            // subItemsArray fonksiyonunu güncelleyerek iki parametre alacak şekilde düzenleme
            subItemsArray={
              props.subItemsArray ??
              $((subItems: Action[], newBreadcrumbs: string[]) => {
                props.subItemsArray!(subItems, newBreadcrumbs);
              })
            }
          />
        );
      })}
    </div>
  );
});
