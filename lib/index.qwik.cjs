"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const qwik = require("@builder.io/qwik");
const jsxRuntime = require("@builder.io/qwik/jsx-runtime");
const Fuse = require("fuse.js");
const globalStyles = ':root {\n  font-family: "Inter", sans-serif;\n  font-feature-settings: "ss11" on, "cv09" on, "liga" off, "calt" off;\n}\n\n@supports (font-variation-settings: normal) {\n  :root {\n    font-family: "InterVariable", sans-serif;\n    font-optical-sizing: auto;\n    font-feature-settings: "ss11" on, "cv09" on, "liga" off, "calt" off;\n  }\n}\n\nbody {\n  overflow-y: auto;\n  overscroll-behavior: none;\n  width: 100%;\n  height: 100%;\n}\n\nhtml,\nbody {\n  overflow-x: hidden;\n  position: relative;\n}\n\nsection,\n.footer {\n  content-visibility: auto;\n}\n\n*:focus {\n  outline: none;\n}\n\n::-webkit-scrollbar {\n  width: 0px;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np {\n  margin: 0;\n}\n\nbody {\n  margin: 0;\n}\n\nul {\n  list-style: none;\n  margin-block-end: 0;\n  margin-block-start: 0;\n  padding: 0;\n}\n\nsvg {\n  display: block;\n}\n\nimg {\n  border: 0;\n  display: block;\n  object-fit: cover;\n  pointer-events: none;\n  user-select: none;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\nbutton {\n  appearance: button;\n  background-color: transparent;\n  border: 0;\n  color: inherit;\n  cursor: pointer;\n  display: block;\n  padding: 0;\n  text-align: left;\n  text-transform: none;\n}\n\nbutton,\ninput {\n  font-family: inherit;\n  font-size: 100%;\n  line-height: normal;\n  margin: 0;\n  vertical-align: baseline;\n  /* stylelint-disable-next-line selector-no-qualifying-type */\n}\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\nbutton[disabled],\ninput[disabled] {\n  cursor: default;\n}\n\n* {\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  text-rendering: optimizelegibility;\n}\n\n:root {\n  --primary-darker: #162664;\n  --primary-dark: #253ea7;\n  --primary-base: #375dfb;\n  --primary-light: #c2d6ff;\n  --primary-lighter: #ebf1ff;\n  --bg-900: #0a0d14;\n  --bg-700: #20232d;\n  --bg-200: #e2e4e9;\n  --bg-100: #f6f8fa;\n  --bg-50: #fafbfc;\n  --bg-0: #ffffff;\n  --text-900: #0a0d14;\n  --text-500: #525866;\n  --text-400: #868c98;\n  --text-300: #cdd0d5;\n  --text-0: #ffffff;\n  --stroke-900: #0a0d14;\n  --stroke-300: #cdd0d5;\n  --stroke-200: #e2e4e9;\n  --stroke-100: #f6f8fa;\n  --stroke-0: #ffffff;\n  --icon-900: #0a0d14;\n  --icon-500: #525866;\n  --icon-400: #868c98;\n  --icon-300: #cdd0d5;\n  --icon-0: #ffffff;\n  --state-success: #38c793;\n  --state-warning: #f17b2c;\n  --state-error: #df1c41;\n  --state-info: #375dfb;\n  --state-away: #f2ae40;\n  --state-feature: #6e3ff3;\n  --state-neutral: #868c98;\n  --state-verified: #35b9e9;\n}';
const TransitionIf = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  qwik._jsxBranch();
  const wrapperRef = qwik.useSignal();
  const animationState = qwik.useSignal(props.if ? "enter-done" : "exit-done");
  const render = qwik.useComputedQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [animationState2] = qwik.useLexicalScope();
    return animationState2.value !== "exit-done";
  }, "transition_if_component_render_useComputed_8dvl2fUS4o8", [
    animationState
  ]));
  qwik.useTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(({ track }) => {
    const [animationState2, props2] = qwik.useLexicalScope();
    track(() => props2.if);
    if (props2.if && animationState2.value.includes("enter"))
      return;
    if (!props2.if && animationState2.value.includes("exit"))
      return;
    if (props2.if) {
      animationState2.value = "enter";
      setTimeout(() => {
        animationState2.value = "entering";
      }, 100);
    } else
      animationState2.value = "exit";
  }, "transition_if_component_useTask_j8w0JlbM6Wg", [
    animationState,
    props
  ]));
  return /* @__PURE__ */ qwik._jsxC(jsxRuntime.Fragment, {
    children: render.value && /* @__PURE__ */ qwik._jsxQ("div", {
      ref: wrapperRef
    }, {
      class: qwik._fnSignal((p0, p1) => [
        p1.class,
        {
          [p1.enter + " "]: p0.value === "enter",
          [p1.exit]: p0.value.startsWith("exit")
        }
      ], [
        animationState,
        props
      ], '[p1.class,{[p1.enter+" "]:p0.value==="enter",[p1.exit]:p0.value.startsWith("exit")}]'),
      onTransitionEnd$: /* @__PURE__ */ qwik.inlinedQrl(() => {
        const [animationState2, props2] = qwik.useLexicalScope();
        animationState2.value = props2.if ? "enter-done" : "exit-done";
      }, "transition_if_component__Fragment_div_onTransitionEnd_com8nD0r4pQ", [
        animationState,
        props
      ])
    }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "CW_0"), 1, "CW_1")
  }, 1, "CW_2");
}, "transition_if_component_jM0zSgttNOk"));
const styles$6 = ".key-icon {\n  box-shadow: 0px 1px 2px 0px rgba(228, 229, 231, 0.24);\n}\n\n.key-icon {\n  width: max-content;\n  height: max-content;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px;\n  border-radius: 96px;\n  border: 1px solid var(--stroke-200);\n  background: var(--bg-0);\n}";
const KeyIcon = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  qwik.useStylesScopedQrl(/* @__PURE__ */ qwik.inlinedQrl(styles$6, "KeyIcon_component_useStylesScoped_zHstVV5Sb90"));
  return /* @__PURE__ */ qwik._jsxQ("div", null, {
    class: "key-icon"
  }, /* @__PURE__ */ qwik._jsxC(props.icon, null, 3, "2S_0"), 1, "2S_1");
}, "KeyIcon_component_qTqaH16SBYg"));
const styles$5 = '.action-list-group-item-label {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 20px;\n  letter-spacing: -0.084px;\n  font-family: "Inter", sans-serif !important;\n}\n\n.action-list-group-item-role {\n  font-size: 11px;\n  font-weight: 500;\n  line-height: 12px;\n  letter-spacing: 0.22px;\n  font-family: "Inter", sans-serif !important;\n  text-transform: uppercase;\n}\n\n.action-list-group-item {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  padding: 6px 18px 6px 6px;\n  gap: 8px;\n  border-radius: 12px;\n  transition: background-color 200ms cubic-bezier(0.6, 0.6, 0, 1);\n}\n.action-list-group-item-label {\n  display: flex;\n  flex: 1;\n}\n.action-list-group-item-role {\n  color: var(--text-400);\n}\n.action-list-group-item-focused {\n  background-color: var(--bg-100) !important;\n}\n.action-list-group-item:hover {\n  background-color: var(--bg-50);\n  cursor: pointer;\n}';
const ActionListGroupItem = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  qwik._jsxBranch();
  qwik.useStylesScopedQrl(/* @__PURE__ */ qwik.inlinedQrl(styles$5, "ActionListGroupItem_component_useStylesScoped_301L6PRTg9Y"));
  const handleItemClick$ = /* @__PURE__ */ qwik.inlinedQrl(() => {
    const [props2] = qwik.useLexicalScope();
    props2.subItems ? props2.subItemsArray && props2.subItemsArray(props2.subItems) : props2.onSelect$ && props2.onSelect$();
  }, "ActionListGroupItem_component_handleItemClick_qNQaDo4R9Mg", [
    props
  ]);
  return /* @__PURE__ */ qwik._jsxQ("div", null, {
    class: qwik._fnSignal((p0) => [
      "action-list-group-item",
      {
        "action-list-group-item-focused": p0.isFocused
      }
    ], [
      props
    ], '["action-list-group-item",{"action-list-group-item-focused":p0.isFocused}]'),
    "data-index": qwik._fnSignal((p0) => p0.index, [
      props
    ], "p0.index"),
    onClick$: handleItemClick$
  }, [
    props.icon && /* @__PURE__ */ qwik._jsxQ("div", null, {
      class: "action-list-group-item-icon"
    }, /* @__PURE__ */ qwik._jsxC(KeyIcon, {
      get icon() {
        return props.icon;
      },
      [qwik._IMMUTABLE]: {
        icon: qwik._fnSignal((p0) => p0.icon, [
          props
        ], "p0.icon")
      }
    }, 3, "Na_0"), 1, "Na_1"),
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      class: "action-list-group-item-label"
    }, qwik._fnSignal((p0) => p0.label, [
      props
    ], "p0.label"), 3, null),
    props.role && /* @__PURE__ */ qwik._jsxQ("div", null, {
      class: "action-list-group-item-role"
    }, qwik._fnSignal((p0) => p0.role, [
      props
    ], "p0.role"), 3, "Na_2")
  ], 1, "Na_3");
}, "ActionListGroupItem_component_M4DZhA69wUk"));
const styles$4 = '.action-list-group-title {\n  font-size: 11px;\n  font-weight: 500;\n  line-height: 12px;\n  letter-spacing: 0.22px;\n  font-family: "Inter", sans-serif !important;\n  text-transform: uppercase;\n}\n\n.action-list-group-title {\n  color: var(--text-400);\n  padding: 0 6px;\n  margin-bottom: 8px;\n}';
const ActionListGroupTitle = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  qwik.useStylesScopedQrl(/* @__PURE__ */ qwik.inlinedQrl(styles$4, "ActionListGroupTitle_component_useStylesScoped_Gcj9NUNjb8Q"));
  return /* @__PURE__ */ qwik._jsxQ("div", null, {
    class: "action-list-group-title"
  }, qwik._fnSignal((p0) => p0.title ?? "No Title Provided!", [
    props
  ], 'p0.title??"No Title Provided!"'), 3, "Np_0");
}, "ActionListGroupTitle_component_5jrZf05tn5s"));
const styles$3 = ".action-list-group {\n  width: 100%;\n  height: max-content;\n  display: flex;\n  flex-direction: column;\n}";
const ActionListGroup = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  qwik.useStylesScopedQrl(/* @__PURE__ */ qwik.inlinedQrl(styles$3, "ActionListGroup_component_useStylesScoped_1MIhdFb0ghw"));
  return /* @__PURE__ */ qwik._jsxQ("div", null, {
    class: "action-list-group"
  }, [
    /* @__PURE__ */ qwik._jsxC(ActionListGroupTitle, {
      get title() {
        return props.title;
      },
      [qwik._IMMUTABLE]: {
        title: qwik._fnSignal((p0) => p0.title, [
          props
        ], "p0.title")
      }
    }, 3, "Un_0"),
    props.actions.map((item) => {
      return /* @__PURE__ */ qwik._jsxC(ActionListGroupItem, {
        isFocused: props.focusedIndex === item.index,
        ...item,
        get subItemsArray() {
          return props.subItemsArray;
        },
        [qwik._IMMUTABLE]: {
          subItemsArray: qwik._fnSignal((p0) => p0.subItemsArray, [
            props
          ], "p0.subItemsArray")
        }
      }, 0, item.label);
    })
  ], 1, "Un_1");
}, "ActionListGroup_component_CKkxAWCky4w"));
const emptyImage = "data:image/png;base64,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";
const styles$2 = '.action-list-group-no-result-labels-label {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 20px;\n  letter-spacing: -0.084px;\n  font-family: "Inter", sans-serif !important;\n}\n\n.action-list-group-no-result {\n  width: 100%;\n  height: 328px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 20px;\n}\n.action-list-group-no-result-labels {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.action-list-group-no-result-labels-label {\n  color: var(--text-400);\n}';
const ActionListGroupNoResult = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
  qwik.useStylesScopedQrl(/* @__PURE__ */ qwik.inlinedQrl(styles$2, "ActionListGroupNoResult_component_useStylesScoped_TOKpHD9Zr04"));
  return /* @__PURE__ */ qwik._jsxQ("div", null, {
    class: "action-list-group-no-result"
  }, [
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      class: "action-list-group-no-result-image"
    }, /* @__PURE__ */ qwik._jsxQ("img", null, {
      alt: "No results",
      height: 108,
      src: emptyImage,
      width: 108
    }, null, 3, null), 3, null),
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      class: "action-list-group-no-result-labels"
    }, [
      /* @__PURE__ */ qwik._jsxQ("p", null, {
        class: "action-list-group-no-result-labels-label"
      }, "There is no quick action record yet.", 3, null),
      /* @__PURE__ */ qwik._jsxQ("p", null, {
        class: "action-list-group-no-result-labels-label"
      }, "Please check back later.", 3, null)
    ], 3, null)
  ], 3, "0R_0");
}, "ActionListGroupNoResult_component_GdO0uTNDp0k"));
const SearchIcon = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  return /* @__PURE__ */ qwik._jsxQ("svg", null, {
    fill: "none",
    height: qwik._fnSignal((p0) => p0.height ?? 24, [
      props
    ], "p0.height??24"),
    viewBox: "0 0 20 20",
    width: qwik._fnSignal((p0) => p0.width ?? 24, [
      props
    ], "p0.width??24"),
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ qwik._jsxQ("path", null, {
    d: "M9.25 2.5C12.976 2.5 16 5.524 16 9.25C16 12.976 12.976 16 9.25 16C5.524 16 2.5 12.976 2.5 9.25C2.5 5.524 5.524 2.5 9.25 2.5ZM9.25 14.5C12.1502 14.5 14.5 12.1502 14.5 9.25C14.5 6.349 12.1502 4 9.25 4C6.349 4 4 6.349 4 9.25C4 12.1502 6.349 14.5 9.25 14.5ZM15.6137 14.5532L17.7355 16.6742L16.6742 17.7355L14.5532 15.6137L15.6137 14.5532V14.5532Z",
    fill: qwik._fnSignal((p0) => p0.color ?? "currentColor", [
      props
    ], 'p0.color??"currentColor"')
  }, null, 3, null), 3, "Nq_0");
}, "SearchIcon_component_XyNgibNhgek"));
const styles$1 = '.text-input-text-area {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 20px;\n  letter-spacing: -0.084px;\n  font-family: "Inter", sans-serif !important;\n}\n\n.text-input-wrapper {\n  width: 100%;\n  height: max-content;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  background-color: var(--bg-0);\n  border-bottom: 1px solid var(--stroke-200);\n  border-radius: 16px 16px 0px 0px;\n  padding: 10px 12px;\n  gap: 8px;\n}\n.text-input-text-area {\n  width: 100%;\n  height: 100%;\n  color: var(--text-900);\n  background-color: transparent;\n  border: none;\n  outline: none;\n  display: flex;\n  flex: 1;\n}\n.text-input-text-area:placeholder {\n  color: var(--text-200);\n}';
const TextInput = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  qwik.useStylesScopedQrl(/* @__PURE__ */ qwik.inlinedQrl(styles$1, "TextInput_component_useStylesScoped_Sc0g6ZZwHGU"));
  return /* @__PURE__ */ qwik._jsxQ("label", null, {
    class: "text-input-wrapper"
  }, [
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      class: "text-input-left-icon"
    }, /* @__PURE__ */ qwik._jsxC(SearchIcon, {
      color: "var(--icon-400)",
      height: 20,
      width: 20,
      [qwik._IMMUTABLE]: {
        color: qwik._IMMUTABLE,
        height: qwik._IMMUTABLE,
        width: qwik._IMMUTABLE
      }
    }, 3, "le_0"), 1, null),
    /* @__PURE__ */ qwik._jsxS("input", {
      ...props.onInput$ && {
        onInput$: props.onInput$
      }
    }, {
      autoFocus: true,
      class: "text-input-text-area",
      placeholder: "Search for action...",
      type: "text",
      value: qwik._fnSignal((p0) => p0.value, [
        props
      ], "p0.value")
    }, 0, null)
  ], 1, "le_1");
}, "TextInput_component_yFENBEWYMVY"));
const styles = '.quick-actions {\n  box-shadow: 0px 16px 32px -12px rgba(88, 92, 95, 0.1);\n}\n\n.quick-actions {\n  position: fixed;\n  top: 3rem;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 100%;\n  max-width: 600px;\n  background-color: var(--bg-0);\n  border: 1px solid var(--stroke-200);\n  border-radius: 16px;\n  display: flex;\n  flex-direction: column;\n  z-index: 100;\n  transition: opacity 0.2s cubic-bezier(0.6, 0.6, 0, 1), transform 0.2s cubic-bezier(0.6, 0.6, 0, 1);\n}\n.quick-actions-content {\n  width: 100%;\n  height: 200px !important;\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  overflow-y: auto;\n  gap: 8px;\n  padding: 12px 10px 8px 6px;\n  transition: height 200ms cubic-bezier(0.6, 0.6, 0, 1);\n}\n.quick-actions-animation-enter, .quick-actions-animation-exit {\n  opacity: 0;\n}\n.quick-actions-animation-enter.quick-actions-animation-slide, .quick-actions-animation-exit.quick-actions-animation-slide {\n  transform: translateY(10px) scale(0.999) translateX(-50%);\n}\n\n.action-groups {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  flex: 1;\n}\n.action-groups > *:not(:last-child) {\n  padding-bottom: 12px;\n  margin-bottom: 12px;\n  position: relative;\n}\n.action-groups > *:not(:last-child)::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 1px;\n  background-color: var(--stroke-200);\n}\n\n.action-results {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}';
const formatActionGroups = (actionGroups) => {
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
const useQuickActions = (props) => {
  const { items } = props;
  const isOpen = qwik.useSignal(props.isOpen || true);
  const focusedIndex = qwik.useSignal(0);
  const formattedGroups = qwik.useComputedQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [items2] = qwik.useLexicalScope();
    return formatActionGroups(items2);
  }, "useQuickActions_formattedGroups_useComputed_5vpicwLjgMs", [
    items
  ]));
  const input = qwik.useSignal("");
  const animation = qwik.useSignal(props.animation || "slide");
  const searchResults = qwik.useSignal([]);
  const subItemsArray = qwik.useSignal([]);
  const breadCrumbs = qwik.useSignal([]);
  const onKeydown$ = /* @__PURE__ */ qwik.inlinedQrl((event) => {
    const [focusedIndex2, formattedGroups2, input2, isOpen2, searchResults2, subItemsArray2] = qwik.useLexicalScope();
    if (event.metaKey && event.code === "KeyK") {
      event.preventDefault();
      isOpen2.value = !isOpen2.value;
    }
    if (!isOpen2.value)
      return;
    const SHORTCUT_KEYS = [
      "Escape",
      "ArrowDown",
      "ArrowUp",
      "Enter"
    ];
    if (SHORTCUT_KEYS.includes(event.code))
      event.preventDefault();
    if (event.code === "Escape") {
      if (input2.value.length > 0)
        input2.value = "";
      else {
        subItemsArray2.value = [];
        isOpen2.value = false;
      }
    }
    if (event.code === "ArrowDown") {
      const maxIndex = searchResults2.value.length > 0 ? searchResults2.value.length - 1 : subItemsArray2.value.length > 0 ? subItemsArray2.value[subItemsArray2.value.length - 1].length - 1 : formattedGroups2.value.maxIndex - 1;
      focusedIndex2.value = Math.min(focusedIndex2.value + 1, maxIndex);
      console.log(focusedIndex2.value);
      return;
    }
    if (event.code === "ArrowUp") {
      focusedIndex2.value = Math.max(focusedIndex2.value - 1, 0);
      console.log(focusedIndex2.value);
      return;
    }
    if ([
      "ArrowDown",
      "ArrowUp"
    ].includes(event.code))
      setTimeout(() => {
        const item = document.querySelector(`[data-index="${focusedIndex2.value}"]`);
        item?.scrollIntoView({
          block: "nearest",
          inline: "center"
        });
      });
    if (event.code === "Enter") {
      const item = document.querySelector(`[data-index="${focusedIndex2.value}"]`);
      if (item)
        item.dispatchEvent(new Event("click"));
    }
  }, "useQuickActions_onKeydown_qTNQxc0YWaw", [
    focusedIndex,
    formattedGroups,
    input,
    isOpen,
    searchResults,
    subItemsArray
  ]);
  qwik.useVisibleTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [onKeydown$2] = qwik.useLexicalScope();
    window.addEventListener("keydown", onKeydown$2);
  }, "useQuickActions_useVisibleTask_e5m3wMmuK5I", [
    onKeydown$
  ]));
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
const QuickActions = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  qwik._jsxBranch();
  qwik.useStylesQrl(/* @__PURE__ */ qwik.inlinedQrl(globalStyles, "QuickActions_component_useStyles_XeW2Dl039DQ"));
  qwik.useStylesQrl(/* @__PURE__ */ qwik.inlinedQrl(styles, "QuickActions_component_useStyles_1_Z3uRghAciTU"));
  const quickactions = useQuickActions(props);
  qwik.useOnWindow("click", /* @__PURE__ */ qwik.inlinedQrl((event) => {
    const [quickactions2] = qwik.useLexicalScope();
    const target = event.target;
    if (!target.closest(".quick-actions") && quickactions2.isOpen.value) {
      quickactions2.isOpen.value = false;
      quickactions2.subItemsArray.value = [];
    }
  }, "QuickActions_component_useOnWindow_zYvNeDAqJEI", [
    quickactions
  ]));
  const onInput$ = /* @__PURE__ */ qwik.inlinedQrl((event) => {
    const [quickactions2] = qwik.useLexicalScope();
    const target = event.target;
    quickactions2.input.value = target.value;
    if (quickactions2.input.value.length === 0) {
      quickactions2.searchResults.value = [];
      return;
    }
    if (quickactions2.input.value.length > 0)
      quickactions2.focusedIndex.value = 0;
    const selectedArray = quickactions2.subItemsArray.value.length >= 1 ? quickactions2.subItemsArray.value : quickactions2.formattedGroups.value.items;
    const expandedItems = selectedArray.flatMap((group) => "actions" in group ? group.actions.map((action) => ({
      ...action,
      focusedIndex: quickactions2.focusedIndex.value
    })) : []);
    const fuse = new Fuse(expandedItems, {
      keys: [
        "label",
        "title"
      ],
      threshold: 0.2
    });
    const results = fuse.search(quickactions2.input.value).flatMap((result, index) => ({
      ...result.item,
      index
    }));
    quickactions2.searchResults.value = results;
  }, "QuickActions_component_onInput_70Y88ZeSDwE", [
    quickactions
  ]);
  const updateSubItemsArray = /* @__PURE__ */ qwik.inlinedQrl((subItems) => {
    const [quickactions2] = qwik.useLexicalScope();
    const newArray = subItems.map((item, index) => ({
      ...item,
      index
    }));
    if (!Array.isArray(quickactions2.subItemsArray.value))
      quickactions2.subItemsArray.value = [];
    quickactions2.subItemsArray.value = [
      ...quickactions2.subItemsArray.value,
      newArray
    ];
    quickactions2.focusedIndex.value = 0;
    console.log(quickactions2.subItemsArray.value);
  }, "QuickActions_component_updateSubItemsArray_VYoed2uFGzE", [
    quickactions
  ]);
  const handleSubItemsArray = /* @__PURE__ */ qwik.inlinedQrl((subItems) => {
    const [quickactions2, updateSubItemsArray2] = qwik.useLexicalScope();
    quickactions2.searchResults.value = [];
    updateSubItemsArray2(subItems);
    quickactions2.breadCrumbs.value = [];
    quickactions2.focusedIndex.value = 0;
  }, "QuickActions_component_handleSubItemsArray_pQH30mjG3D8", [
    quickactions,
    updateSubItemsArray
  ]);
  const backToPreviousSubItems = /* @__PURE__ */ qwik.inlinedQrl(() => {
    const [quickactions2] = qwik.useLexicalScope();
    quickactions2.subItemsArray.value = quickactions2.subItemsArray.value.slice(0, -1);
    quickactions2.breadCrumbs.value = quickactions2.breadCrumbs.value.slice(0, -1);
  }, "QuickActions_component_backToPreviousSubItems_F0CnzBAbfCk", [
    quickactions
  ]);
  return /* @__PURE__ */ qwik._jsxC(TransitionIf, {
    get class() {
      return [
        "quick-actions",
        quickactions.animation.value ? `quick-actions-animation-${quickactions.animation.value}` : ""
      ];
    },
    enter: "quick-actions-animation-enter",
    exit: "quick-actions-animation-exit",
    get if() {
      return quickactions.isOpen.value;
    },
    children: [
      /* @__PURE__ */ qwik._jsxQ("div", null, {
        class: "quick-actions-head"
      }, /* @__PURE__ */ qwik._jsxC(TextInput, {
        get value() {
          return quickactions.input.value;
        },
        onInput$,
        [qwik._IMMUTABLE]: {
          onInput$: qwik._IMMUTABLE,
          value: qwik._fnSignal((p0) => p0.input.value, [
            quickactions
          ], "p0.input.value")
        }
      }, 3, "7H_0"), 1, null),
      /* @__PURE__ */ qwik._jsxQ("div", null, {
        class: "quick-actions-content"
      }, [
        quickactions.searchResults.value.length === 0 && /* @__PURE__ */ qwik._jsxC(jsxRuntime.Fragment, {
          children: quickactions.input.value.length === 0 && quickactions.subItemsArray.value.length === 0 ? /* @__PURE__ */ qwik._jsxQ("div", null, {
            class: "action-groups"
          }, quickactions.formattedGroups.value.items.map((group, index) => /* @__PURE__ */ qwik.createElement(ActionListGroup, {
            ...group,
            focusedIndex: quickactions.focusedIndex.value,
            key: group.title + index,
            subItemsArray: handleSubItemsArray
          })), 1, "7H_1") : quickactions.input.value.length > 0 && quickactions.subItemsArray.value.length === 0 ? /* @__PURE__ */ qwik._jsxC(ActionListGroupNoResult, null, 3, "7H_2") : null
        }, 1, "7H_3"),
        quickactions.searchResults.value.length > 0 && quickactions.input.value.length > 0 && quickactions.subItemsArray.value.length === 0 && /* @__PURE__ */ qwik._jsxQ("div", null, {
          class: "action-results"
        }, [
          /* @__PURE__ */ qwik._jsxC(ActionListGroupTitle, {
            get title() {
              return `Search Results for "${quickactions.input.value}" (${quickactions.searchResults.value.length})`;
            },
            [qwik._IMMUTABLE]: {
              title: qwik._fnSignal((p0) => `Search Results for "${p0.input.value}" (${p0.searchResults.value.length})`, [
                quickactions
              ], '`Search Results for "${p0.input.value}" (${p0.searchResults.value.length})`')
            }
          }, 3, "7H_4"),
          quickactions.searchResults.value.map((result) => /* @__PURE__ */ qwik.createElement(ActionListGroupItem, {
            ...result,
            isFocused: quickactions.focusedIndex.value === result.index,
            key: result.label + result.index,
            subItemsArray: handleSubItemsArray
          }))
        ], 1, "7H_5"),
        quickactions.subItemsArray.value.length > 0 && /* @__PURE__ */ qwik._jsxQ("div", null, {
          class: "action-results"
        }, [
          /* @__PURE__ */ qwik._jsxQ("div", null, {
            class: "breadcrumbs"
          }, quickactions.breadCrumbs.value.map((crumb, index) => /* @__PURE__ */ qwik._jsxC(ActionListGroupTitle, {
            title: `${crumb} (${quickactions.subItemsArray.value.length})`
          }, 3, `breadcrumb-${index}`)), 1, null),
          /* @__PURE__ */ qwik._jsxQ("button", null, {
            onClick$: backToPreviousSubItems
          }, "Back", 3, null),
          quickactions.subItemsArray.value[quickactions.subItemsArray.value.length - 1]?.map((subItem, subItemIndex) => /* @__PURE__ */ qwik.createElement(ActionListGroupItem, {
            ...subItem,
            isFocused: quickactions.focusedIndex.value === subItem.index,
            key: subItem.label + subItemIndex,
            subItemsArray: handleSubItemsArray
          }))
        ], 1, "7H_6")
      ], 1, null)
    ],
    [qwik._IMMUTABLE]: {
      class: qwik._fnSignal((p0) => [
        "quick-actions",
        p0.animation.value ? `quick-actions-animation-${p0.animation.value}` : ""
      ], [
        quickactions
      ], '["quick-actions",p0.animation.value?`quick-actions-animation-${p0.animation.value}`:""]'),
      enter: qwik._IMMUTABLE,
      exit: qwik._IMMUTABLE,
      if: qwik._fnSignal((p0) => p0.isOpen.value, [
        quickactions
      ], "p0.isOpen.value")
    }
  }, 1, "7H_7");
}, "QuickActions_component_gJ2whlVF0TU"));
exports.QuickActions = QuickActions;
