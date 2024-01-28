import {
  component$, useStylesScoped$
} from "@builder.io/qwik";

import emptyImage from "../../assets/images/empty.png";

import styles from "./action-list-group-no-result.scss?inline";

export const ActionListGroupNoResult = component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="action-list-group-no-result">
      <div class="action-list-group-no-result-image">
        <img
          alt="No results"
          height={108}
          src={emptyImage}
          width={108}
        />
      </div>
      <div class="action-list-group-no-result-labels">
        <p class="action-list-group-no-result-labels-label">
          There is no quick action record yet.
        </p>
        <p class="action-list-group-no-result-labels-label">
          Please check back later.
        </p>
      </div>
    </div>
  );
});
