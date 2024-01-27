import {
  component$,
  useStylesScoped$,
  useStore,
  $,
  useVisibleTask$,
} from "@builder.io/qwik";
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
      {
        label: "Sign up",
        as: "a",
        href: "/sign-up",
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
    isOpen: true,

    focusedIndex: 0,
  });

  useVisibleTask$(() => {
    const navigate = (direction: "up" | "down") => {
      // Navigate through the flattened list of actions
      const maxIndex = actionGroups.length - 1;
      if (direction === "up") {
        store.focusedIndex = Math.max(store.focusedIndex - 1, 0);
      }
      if (direction === "down") {
        if (store.focusedIndex === maxIndex) {
          console.log("wrap around");
          store.focusedIndex = 0; // Wrap around to the first item if we're at the last item
        } else {
          store.focusedIndex = store.focusedIndex + 1;
          console.log("down", store.focusedIndex);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.code === "KeyK") {
        event.preventDefault();
        store.isOpen = !store.isOpen;
      }

      if (event.code === "Escape") {
        if (store.input.length > 0 && store.isOpen) {
          event.preventDefault();
          store.input = "";
          return;
        }
        if (store.isOpen) {
          event.preventDefault();
          store.isOpen = false;
        }
      }

      if (event.code === "ArrowUp") {
        event.preventDefault();
        navigate("up");
      }

      if (event.code === "ArrowDown") {
        event.preventDefault();
        navigate("down");
      }
    };

    const handleClickedOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".quick-actions")) {
        if (store.isOpen) {
          store.isOpen = false;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickedOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickedOutside);
    };
  });

  // onInput handler
  const onInput$ = $((event: any) => {
    store.input = event.target.value;
    const results = store.input ? fuse.search(store.input) : [];
    store.searchResults = results;
  });

  return (
    store.isOpen && (
      <div class="quick-actions">
        <div class="quick-actions-head">
          <TextInput value={store.input} onInput$={onInput$} />
        </div>
        <div class="quick-actions-content">
          {/* No results, and no input */}
          {store.searchResults.length === 0 && store.input.length === 0 && (
            <ActionList actionGroups={actionGroups} />
          )}
          {/* No results, and input */}
          {store.searchResults.length === 0 && store.input.length > 0 && (
            <ActionListGroupNoResult />
          )}
          {/* Results */}
          {store.searchResults.length > 0 && (
            <div class="action-list">
              {store.searchResults.flatMap((result, index) => {
                return (
                  <ActionListGroupResult
                    key={result.item.title}
                    title={result.item.title}
                    items={result.item.actions.flatMap((action: any) => ({
                      ...action,
                      focusedItemIndex:
                        store.focusedIndex === index ? index : -1,
                    }))}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    )
  );
});
