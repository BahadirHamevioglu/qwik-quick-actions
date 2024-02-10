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
        subItems: [
          {
            label: "Standard User",
            role: "action",
            icon: InfoIcon,
            onSelect$: $(() => {
              console.log("Add standard user");
            }),
            index: 0,
            subItems: [
              {
                label: "Standard User with limited access",
                role: "action",
                icon: InfoIcon,
                onSelect$: $(() => {
                  console.log("Add standard user with limited access");
                }),
                index: 0
              },
              {
                label: "Standard User with full access",
                role: "action",
                icon: InfoIcon,
                onSelect$: $(() => {
                  console.log("Add standard user with full access");
                }),
                index: 1
              }
            ]
          },
          {
            label: "Admin User",
            role: "action",
            icon: InfoIcon,
            onSelect$: $(() => {
              console.log("Add admin user");
            }),
            index: 1,
            subItems: [
              {
                label: "Admin User with all permissions",
                role: "action",
                icon: InfoIcon,
                onSelect$: $(() => {
                  console.log("Add admin user with all permissions");
                }),
                index: 0
              },
              {
                label: "Admin User with limited permissions",
                role: "action",
                icon: InfoIcon,
                onSelect$: $(() => {
                  console.log("Add admin user with limited permissions");
                }),
                index: 1
              }
            ]
          },
          {
            label: "Guest User",
            role: "action",
            icon: InfoIcon,
            onSelect$: $(() => {
              console.log("Add guest user");
            }),
            index: 2,
            subItems: [
              {
                label: "Guest User with read-only access",
                role: "action",
                icon: InfoIcon,
                onSelect$: $(() => {
                  console.log("Add guest user with read-only access");
                }),
                index: 0
              }
            ]
          }
        ]
      },
      {
        label: "Edit User",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Edit user");
        })
      },
      {
        label: "Delete User",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Delete user");
        })
      },
      {
        label: "Activate User",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Activate user");
        })
      },
      {
        label: "Deactivate User",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Deactivate user");
        })
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
        onSelect$: $(() => {
          console.log("Change theme");
        })
      },
      {
        label: "Update Profile",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Update profile");
        })
      },
      {
        label: "Change Password",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Change password");
        })
      },
      {
        label: "Configure Notifications",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Configure notifications");
        })
      },
      {
        label: "System Backup",
        role: "action",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("System backup");
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
          animation="slide"
          items={DEMO_DATA}
        />
      </body>
    </>
  );
};
