import {
  component$,
  useStyles$,
  $,
  useOnWindow,
  useSignal,
  useComputed$,
  useVisibleTask$
} from "@builder.io/qwik";
import Fuse from "fuse.js";

import globalStyles from "@/assets/styles/main.scss?inline";
import {
  Action, Group
} from "@/types/types";

import TransitionIf from "../../utils/transition-if";
import { ActionListGroup } from "../action-list-group/action-list-group";
import { ActionListGroupItem } from "../action-list-group-item/action-list-group-item";
import { ActionListGroupNoResult } from "../action-list-group-no-result/action-list-group-no-result";
import { ActionListGroupTitle } from "../action-list-group-title/action-list-group-title";
import { Breadcrumb } from "../breadcrumb/breadcrumb";
import { TextInput } from "../text-input/text-input";

import styles from "./quick-actions.scss?inline";

interface GroupFromProps {
  title: string;
  actions: Omit<Action, "index">[];
}

interface Props {
  isOpen?: boolean;
  animation?: "slide" | "none";
  items: GroupFromProps[];
}

const formatActionGroups = (actionGroups: Props["items"]) => {
  let currentIndex = 0;

  return {
    items: actionGroups.map((group) => {
      return {
        ...group,
        actions: group.actions.map((action) => ({
          ...action,
          index: currentIndex++
        }))
      };
    }),
    maxIndex: currentIndex
  };
};

const useQuickActions = (props: Props) => {
  const { items } = props;

  const isOpen = useSignal<boolean>(props.isOpen || true);
  const focusedIndex = useSignal(0);
  const formattedGroups = useComputed$(() => formatActionGroups(items));
  const input = useSignal("");
  const animation = useSignal<string>(props.animation || "slide");
  const searchResults = useSignal<any[]>([]);
  const subItemsArray = useSignal<any[]>([]);
  const breadCrumbs = useSignal<string[]>([]);

  const onKeydown$ = $((event: KeyboardEvent) => {
    if (event.metaKey && event.code === "KeyK") {
      event.preventDefault();
      isOpen.value = !isOpen.value;
    }

    if (!isOpen.value) return;

    const SHORTCUT_KEYS = [
      "Escape",
      "ArrowDown",
      "ArrowUp",
      "Enter"
    ];

    if (SHORTCUT_KEYS.includes(event.code)) {
      event.preventDefault();
    }

    if (event.code === "Escape") {
      if (input.value.length > 0) {
        input.value = "";
      } else {
        subItemsArray.value = [];
        isOpen.value = false;
      }
    }

    if (event.code === "ArrowDown") {
      const maxIndex = searchResults.value.length > 0
        ? searchResults.value.length - 1
        : subItemsArray.value.length > 0
          ? subItemsArray.value[subItemsArray.value.length - 1].length - 1
          : formattedGroups.value.maxIndex - 1;
      focusedIndex.value = Math.min(focusedIndex.value + 1, maxIndex);
      console.log(focusedIndex.value);

      return;
    }

    if (event.code === "ArrowUp") {
      focusedIndex.value = Math.max(focusedIndex.value - 1, 0);
      console.log(focusedIndex.value);

      return;
    }

    if ([
      "ArrowDown",
      "ArrowUp"
    ].includes(event.code)) {
      setTimeout(() => {
        const item = document.querySelector(
          `[data-index="${focusedIndex.value}"]`
        );

        item?.scrollIntoView({
          block: "nearest",
          inline: "center"
        });
      });
    }

    if (event.code === "Enter") {
      const item = document.querySelector(
        `[data-index="${focusedIndex.value}"]`
      );

      if (item) {
        item.dispatchEvent(new Event("click"));
      }
    }
  });

  /* [WARNING] Replace this part with useOnWindow in next Qwik versions.
  Currently, when you type something to search, and try to navigate with arrows afterwards, 'keydown' listener is triggered twice while using useOnWindow
  */
  useVisibleTask$(() => {
    window.addEventListener("keydown", onKeydown$);
  });

  return {
    isOpen,
    focusedIndex,
    input,
    formattedGroups,
    animation,
    searchResults,
    subItemsArray,
    breadCrumbs
  };
};

export const QuickActions = component$<Props>((props) => {
  useStyles$(globalStyles);
  useStyles$(styles);

  const {
    isOpen,
    focusedIndex,
    input,
    formattedGroups,
    animation,
    searchResults,
    subItemsArray,
    breadCrumbs
  } = useQuickActions(props);

  useOnWindow(
    "click",
    $((event) => {
      const target = event.target as HTMLElement;

      if (!target.closest(".quick-actions") && isOpen.value) {
        isOpen.value = false;
        subItemsArray.value = [];
      }
    })
  );

  const onInput$ = $((event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    input.value = target.value;

    if (input.value.length === 0) {
      searchResults.value = [];

      return;
    }

    if (input.value.length > 0) {
      focusedIndex.value = 0;
    }

    const selectedArray =
      subItemsArray.value.length >= 1
        ? subItemsArray.value
        : formattedGroups.value!.items;

    const expandedItems = selectedArray.flatMap((group: Group) =>
      "actions" in group
        ? group.actions.map((action: Action) => ({
          ...action,
          focusedIndex: focusedIndex.value
        }))
        : []
    );
    const fuse = new Fuse(expandedItems, {
      keys: [
        "label",
        "title"
      ],
      threshold: 0.2
    });
    const results = fuse.search(input.value).flatMap((result, index) => ({
      ...result.item,
      index: index
    }));

    searchResults.value = results;
  });

  const updateBreadCrumbs = $((newCrumb: string) => {
    // Check if the new crumb already exists in the breadcrumbs array
    const crumbIndex = breadCrumbs.value.indexOf(newCrumb);

    if (crumbIndex === -1) {
      // If the crumb does not exist, add it to the end of the breadcrumbs array
      breadCrumbs.value = [
        ...breadCrumbs.value,
        newCrumb
      ];
    } else {
      // If the crumb already exists, remove all crumbs after it
      breadCrumbs.value = breadCrumbs.value.slice(0, crumbIndex + 1);
    }
  });

  // Bu fonksiyon, yeni subItems array'ini mevcut subItemsArray.value'ye ekler
  const updateSubItemsArray = $((subItems: Action[]) => {
    const newArray = subItems.map((item, index) => ({
      ...item,
      index
    }));

    if (!Array.isArray(subItemsArray.value)) {
      subItemsArray.value = [];
    }

    subItemsArray.value = [
      ...subItemsArray.value,
      newArray
    ];
    focusedIndex.value = 0;

    console.log(subItemsArray.value);
  });

  // Bu fonksiyon, yeni breadcrumbs ve subItems'ları işler
  const handleSubItemsArray = $(
    (subItems: Action[]) => {
      searchResults.value = [];
      updateBreadCrumbs(subItems[0].label);
      updateSubItemsArray(subItems);
      focusedIndex.value = 0;
    }
  );

  const backToPreviousSubItems = $(() => {
    subItemsArray.value = subItemsArray.value.slice(0, -1);
    breadCrumbs.value = breadCrumbs.value.slice(0, -1);
  });

  return (
    <TransitionIf
      class={[
        "quick-actions",
        animation.value ? `quick-actions-animation-${animation.value}` : ""
      ]}
      enter="quick-actions-animation-enter"
      exit="quick-actions-animation-exit"
      if={isOpen.value}
    >
      <div class="quick-actions-head">
        <TextInput
          value={input.value}
          onInput$={onInput$}
        />
      </div>
      <div class="quick-actions-content">
        {searchResults.value.length === 0 && (
          <>
            {input.value.length === 0 && subItemsArray.value.length === 0 ? (
              <div class="action-groups">
                {formattedGroups.value.items.map((group, index) => (
                  <ActionListGroup
                    {...group}
                    focusedIndex={focusedIndex.value}
                    key={group.title + index}
                    subItemsArray={handleSubItemsArray}
                  />
                ))}
              </div>
            ) : input.value.length > 0 && subItemsArray.value.length === 0 ? (
              <ActionListGroupNoResult />
            ) : null}
          </>
        )}

        {searchResults.value.length > 0 &&
          input.value.length > 0 &&
          subItemsArray.value.length === 0 && (
          <div class="action-results">
            <ActionListGroupTitle title={`Search Results for "${input.value}" (${searchResults.value.length})`} />
            {searchResults.value.map((result) => (
              <ActionListGroupItem
                {...result}
                isFocused={focusedIndex.value === result.index}
                key={result.label + result.index}
                subItemsArray={handleSubItemsArray}
              />
            ))}
          </div>
        )}

        {subItemsArray.value.length > 0 && (
          <div class="action-results">

            <Breadcrumb
              items={breadCrumbs.value}
              key={breadCrumbs.value.join('-')}
              onClick$={backToPreviousSubItems}
            />

            {subItemsArray.value[subItemsArray.value.length - 1]?.map(
              (subItem: Action, subItemIndex: number) => (
                <ActionListGroupItem
                  {...subItem}
                  isFocused={focusedIndex.value === subItem.index}
                  key={subItem.label + subItemIndex}
                  subItemsArray={handleSubItemsArray}
                />
              )
            )}
          </div>
        )}
      </div>
    </TransitionIf>
  );
});
