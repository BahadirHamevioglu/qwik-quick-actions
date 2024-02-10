/* eslint-disable @stylistic/object-curly-newline */
import { component$, useStylesScoped$
} from "@builder.io/qwik";

import { Group, Action } from "../../types/types";
import { ActionListGroupItem } from "../action-list-group-item/action-list-group-item";
import { ActionListGroupTitle } from "../action-list-group-title/action-list-group-title";

import styles from "./action-list-group.scss?inline";

interface Props extends Group {
  focusedIndex: number;
  // subItemsArray fonksiyonunun iki parametre alacak şekilde güncellenmiş hali
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
            isFocused={props.focusedIndex === item.index}
            key={item.label}
            {...item}
            subItemsArray={props.subItemsArray}
          />
        );
      })}
    </div>
  );
});
