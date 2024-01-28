import {
  component$, useStylesScoped$
} from "@builder.io/qwik";

import { Group } from "../../types/types";
import { ActionListGroupItem } from "../action-list-group-item/action-list-group-item";
import { ActionListGroupTitle } from "../action-list-group-title/action-list-group-title";

import styles from "./action-list-group-result.scss?inline";

interface Props extends Group {
  focusedIndex: number;
}

export const ActionListGroupResult = component$<Props>(
  (props) => {
    useStylesScoped$(styles);

    return (
      <div class="action-list-group-result">
        <ActionListGroupTitle title={props.title} />
        {props.actions.map((item, index) => (
          <ActionListGroupItem
            {...item}
            isFocused={item.index === index}
            key={item.label}
          />
        ))}
      </div>
    );
  }
);
