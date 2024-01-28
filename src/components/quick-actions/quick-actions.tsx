import {
  component$,
  useStyles$,
  $,
  useOnWindow,
  useSignal,
} from "@builder.io/qwik";
import styles from "./quick-actions.scss?inline";
import Fuse from "fuse.js";

import { InfoIcon } from "../icons/info-icon/info-icon";

import { TextInput } from "../text-input/text-input";
import { ActionListGroupNoResult } from "../action-list-group-no-result/action-list-group-no-result";
import { ActionListGroup } from "../action-list-group/action-list-group";

import TransitionIf from "../../utils/transition-if";

const actionGroups = [
  {
    title: "Links",
    actions: [
      {
        label: "Sign in",
        role: "link",
        icon: <InfoIcon width={20} height={20} color="var(--icon-400)" />,
        onSelect$: $(() => {
          console.log("1. array 1. item");
        }),
      },
      {
        label: "Sign up",
        role: "link",
        icon: <InfoIcon width={20} height={20} color="var(--icon-400)" />,
        onSelect$: $(() => {
          console.log("1. array 2. item");
        }),
      },
    ],
  },

  {
    title: "Commands",
    actions: [
      {
        label: "Console.log",
        role: "command",
        icon: <InfoIcon width={20} height={20} color="var(--icon-400)" />,
        onSelect$: $(() => {
          console.log("2. array 1. item");
        }),
      },
    ],
  },

  {
    title: "Pages",
    actions: [
      {
        label: "Home",
        role: "page",
        icon: <InfoIcon width={20} height={20} color="var(--icon-400)" />,
        onSelect$: $(() => {
          console.log("3. array 1. item");
        }),
      },
      {
        label: "Settings",
        role: "page",
        icon: <InfoIcon width={20} height={20} color="var(--icon-400)" />,
        onSelect$: $(() => {
          console.log("3. array 2. item");
        }),
      },
    ],
  },
];

// 2. Set up the Fuse instance
const fuse = new Fuse(actionGroups, {
  keys: ["title", "actions.label"],
  includeMatches: true,
  threshold: 0.3,
  useExtendedSearch: true,
});

export const QuickActions = component$(() => {
  useStyles$(styles);

  const isOpen = useSignal<boolean>(true);

  const focusedGroupIndex = useSignal<number>(0);
  const focusedActionIndex = useSignal<number>(0);
  const input = useSignal<string>("");
  const searchResults = useSignal<any[]>([]);
  const animationType = useSignal<string>("slide");

  // Keydown handler
  useOnWindow(
    "keydown",
    $((event) => {
      if (event.metaKey && event.code === "KeyK") {
        event.preventDefault();
        isOpen.value = !isOpen.value;
      }

      const handleArrowUp = $(() => {
        if (!isOpen.value) return;
        if (searchResults.value.length === 0 && input.value.length > 0) return;

        if (searchResults.value.length > 0) {
          if (focusedActionIndex.value > 0) {
            focusedActionIndex.value -= 1;
          } else {
            if (focusedGroupIndex.value > 0) {
              focusedGroupIndex.value -= 1;
            } else {
              focusedGroupIndex.value = searchResults.value.length - 1;
            }
            focusedActionIndex.value =
              searchResults.value[focusedGroupIndex.value].item.actions.length -
              1;
          }
        } else {
          // Handle navigation within the full list if no search results
          if (focusedActionIndex.value > 0) {
            focusedActionIndex.value -= 1;
          } else {
            if (focusedGroupIndex.value > 0) {
              focusedGroupIndex.value -= 1;
            } else {
              focusedGroupIndex.value = actionGroups.length - 1;
            }
            focusedActionIndex.value =
              actionGroups[focusedGroupIndex.value].actions.length - 1;
          }
        }
      });

      const handleArrowDown = $(() => {
        if (!isOpen.value) return;
        if (searchResults.value.length === 0 && input.value.length > 0) return;

        if (searchResults.value.length > 0 && input.value.length > 0) {
          const currentActions =
            searchResults.value[focusedGroupIndex.value].item.actions;
          if (focusedActionIndex.value < currentActions.length - 1) {
            focusedActionIndex.value += 1;
          } else {
            focusedActionIndex.value = 0;
            if (focusedGroupIndex.value < searchResults.value.length - 1) {
              focusedGroupIndex.value += 1;
            } else {
              focusedGroupIndex.value = 0;
            }
          }
        } else {
          // Handle navigation within the full list if no search results
          const currentActions = actionGroups[focusedGroupIndex.value].actions;
          if (focusedActionIndex.value < currentActions.length - 1) {
            focusedActionIndex.value += 1;
          } else {
            focusedActionIndex.value = 0;
            if (focusedGroupIndex.value < actionGroups.length - 1) {
              focusedGroupIndex.value += 1;
            } else {
              focusedGroupIndex.value = 0;
            }
          }
        }
      });

      const handleEnter = $((event?: any) => {
        if (!isOpen.value) return;
        if (searchResults.value.length === 0 && input.value.length > 0) return;

        let action;
        if (searchResults.value.length > 0) {
          // If we have search results, trigger the action from the search results
          const group = searchResults.value[focusedGroupIndex.value];
          if (group && group.item.actions.length > focusedActionIndex.value) {
            action = group.item.actions[focusedActionIndex.value];
          }
        } else {
          // If there are no search results, trigger the action from the full list
          const group = actionGroups[focusedGroupIndex.value];
          if (group && group.actions.length > focusedActionIndex.value) {
            action = group.actions[focusedActionIndex.value];
          }
        }

        // Trigger the onSelect$ event if it exists
        action?.onSelect$?.();

        if (event) {
          event!.preventDefault(); // Prevent default to avoid triggering the action twice
        }
      });

      if (event.code === "Escape") {
        if (input.value.length > 0 && isOpen.value) {
          event.preventDefault();
          input.value = "";
        } else if (isOpen.value && input.value.length === 0) {
          event.preventDefault();
          // Close the quick actions if open
          isOpen.value = false;
        }
      }

      switch (event.code) {
        case "ArrowUp":
          event.preventDefault();
          handleArrowUp();
          break;
        case "ArrowDown":
          event.preventDefault();
          handleArrowDown();
          break;
        case "Enter":
          handleEnter();
          break;
        default:
          break;
      }
    })
  );

  // Click handler
  useOnWindow(
    "click",
    $((event) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".quick-actions")) {
        if (isOpen.value) {
          isOpen.value = false;
        }
      }
    })
  );

  // onInput handler
  const onInput$ = $((event: any) => {
    input.value = event.target.value;
    const results = input.value ? fuse.search(input.value) : [];
    searchResults.value = results;
    // Reset focused values when searchResults are updated
    focusedGroupIndex.value = 0;
    focusedActionIndex.value = 0;
  });

  return (
    <TransitionIf
      if={isOpen.value}
      class="quick-actions"
      enter={
        "quick-actions-animations-enter" +
        (animationType.value ? "-" + animationType.value : "")
      }
      exit={
        "quick-actions-animations-exit" +
        (animationType.value ? "-" + animationType.value : "")
      }
    >
      <div class="quick-actions-head">
        <TextInput value={input.value} onInput$={onInput$} />
      </div>
      <div class="quick-actions-content">
        {/* No results, and no input */}
        {searchResults.value.length === 0 && input.value.length === 0 && (
          <>
            {actionGroups.map((group, index) => (
              <ActionListGroup
                key={group.title}
                title={group.title}
                items={group.actions.map((action: any) => ({
                  ...action,
                  focusedItemIndex:
                    focusedGroupIndex.value === index
                      ? focusedActionIndex.value
                      : undefined,
                }))}
              />
            ))}
          </>
        )}
        {/* No results, and input */}
        {searchResults.value.length === 0 && input.value.length > 0 && (
          <ActionListGroupNoResult />
        )}
        {/* Results */}
        {searchResults.value.length > 0 && (
          <>
            {searchResults.value.map((result, index) => {
              return (
                <ActionListGroup
                  key={result.item.title}
                  title={result.item.title}
                  items={result.item.actions.map((action: any) => ({
                    ...action,
                    focusedItemIndex:
                      focusedGroupIndex.value === index
                        ? focusedActionIndex.value
                        : undefined,
                  }))}
                />
              );
            })}
          </>
        )}
      </div>
    </TransitionIf>
  );
});
