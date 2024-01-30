import { $ } from "@builder.io/qwik";

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
        onSelect$: $(() => {
          console.log("Add user");
        }),
      },
      {
        label: "Edit User",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Edit user");
        }),
      },
      {
        label: "Delete User",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Delete user");
        }),
      },
      {
        label: "Activate User",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Activate user");
        }),
      },
      {
        label: "Deactivate User",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Deactivate user");
        }),
      },
    ],
  },
  {
    title: "System Settings",
    actions: [
      {
        label: "Change Theme",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Change theme");
        }),
      },
      {
        label: "Update Profile",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Update profile");
        }),
      },
      {
        label: "Change Password",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Change password");
        }),
      },
      {
        label: "Configure Notifications",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Configure notifications");
        }),
      },
      {
        label: "System Backup",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("System backup");
        }),
      },
    ],
  },
];

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Quick Actions</title>
      </head>
      <body>
        <QuickActions items={DEMO_DATA} animation="slide" />
      </body>
    </>
  );
};
