import { component$, useStylesScoped$, useStore, $ } from "@builder.io/qwik";
import styles from "./quick-actions.scss?inline";
import Fuse from "fuse.js";

import { InfoIcon } from "../icons/info-icon/info-icon";

import { TextInput } from "../text-input/text-input";
import { ActionList } from "../action-list/action-list";
import { ActionListGroupNoResult } from "../action-list-group-no-result/action-list-group-no-result";
import { ActionListGroupResult } from "../action-list-group-result/action-list-group-result";

const actionGroups = [
  {
    title: "Links",
    actions: [
      {
        label: "Sign in",
        as: "a",
        href: "/sign-in",
        role: "link",
        icon: <InfoIcon width={20} height={20} color="var(--icon-400)" />,
      },
    ],
  },

  {
    title: "Commands",
    actions: [
      {
        label: "Console.log",
        as: "button",
        role: "command",
        icon: <InfoIcon width={20} height={20} color="var(--icon-400)" />,
        onClick$: $(() => {
          console.log("Search for action...");
        }),
      },
    ],
  },
];

// 2. Set up the Fuse instance
const fuse = new Fuse(actionGroups, {
  keys: ["title", "actions.label"],
  includeMatches: true,
});

export const QuickActions = component$(() => {
  useStylesScoped$(styles);

  const store = useStore({
    input: "",
    searchResults: [] as any[],
    contentHeight: "auto",
    isLoading: false,
  });

  // onInput handler
  const onInput$ = $((event: any) => {
    store.input = event.target.value;
    const results = store.input ? fuse.search(store.input) : [];
    store.searchResults = results;
    // Calculate the height based on the number of search results
    store.contentHeight = results.length ? `${results.length * 50}px` : "auto"; // Assuming each item is 50px tall
  });

  return (
    <div class="quick-actions">
      <div class="quick-actions-head">
        <TextInput value={store.input} onInput$={onInput$} />
      </div>
      <div class="quick-actions-content">
        {/* No results, not loading, and no input */}
        {store.searchResults.length === 0 &&
          !store.isLoading &&
          store.input.length === 0 && (
            <ActionList actionGroups={actionGroups} />
          )}
        {/* No results, loading, and no input */}
        {store.searchResults.length === 0 && store.isLoading && (
          <div class="">LOADING...</div>
        )}
        {/* No results, not loading, and input */}
        {store.searchResults.length === 0 && store.input.length > 0 && (
          <ActionListGroupNoResult />
        )}
        {/* Results */}
        {store.searchResults.length > 0 && (
          <div class="action-list">
            {store.searchResults.map((result) => {
              return (
                <ActionListGroupResult
                  key={result.item.title}
                  title={result.item.title}
                  items={result.item.actions}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});
