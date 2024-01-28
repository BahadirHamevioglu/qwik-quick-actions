import { $ } from '@builder.io/qwik';

import { InfoIcon } from "./components/icons/info-icon/info-icon";
import { QuickActions } from "./components/quick-actions/quick-actions";

import "./assets/styles/main.scss";

const DEMO_DATA = [
  {
    title: "User Management",
    actions: [
      {
        label: "Add User",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => { })
      },
      {
        label: "Edit User",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {})
      },
      {
        label: "Delete User",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {})
      },
      {
        label: "Activate User",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {})
      },
      {
        label: "Deactivate User",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {})
      }
    ]
  },
  {
    title: "System Settings",
    actions: [
      {
        label: "Change Theme",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {})
      },
      {
        label: "Update Profile",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {})
      },
      {
        label: "Change Password",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {})
      },
      {
        label: "Configure Notifications",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {})
      },
      {
        label: "System Backup",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {})
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
