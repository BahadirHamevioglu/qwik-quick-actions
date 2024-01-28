import { $ } from '@builder.io/qwik';

import { InfoIcon } from "./components/icons/info-icon/info-icon";
import { QuickActions } from "./components/quick-actions/quick-actions";

import "./assets/styles/main.scss";

const DEMO_DATA = [
  {
    title: "Demo Actions",
    actions: [
      {
        label: "Console.log",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Hello world!");
        })
      },
      {
        label: "Console.log2",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Hello world!");
        })
      },
      {
        label: "Console.log3",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Hello world!");
        })
      }
    ]
  }
];

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Quick Actions</title>
      </head>
      <body>
        <QuickActions
          actionGroups={DEMO_DATA}
          animationType="slide"
        />
      </body>
    </>
  );
};
