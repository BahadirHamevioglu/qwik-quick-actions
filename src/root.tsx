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
        role: "group",
        icon: InfoIcon,
        onSelect$: $(() => {
          console.log("Add user");
        }),
        subItems: [
          {
            label: "Standard User",
            role: "group",
            icon: InfoIcon,
            onSelect$: $(() => {
              console.log("Add standard user");
            }),
            index: 0,
            subItems: [
              {
                label: "Standard User with limited access",
                role: "group",
                icon: InfoIcon,
                onSelect$: $(() => {
                  console.log("Add standard user with limited access");
                }),
                index: 0,
                subItems: [
                  {
                    label: "Limited Access Level 1",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add standard user with limited access level 1");
                    }),
                    index: 0
                  },
                  {
                    label: "Limited Access Level 2",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add standard user with limited access level 2");
                    }),
                    index: 1
                  }
                ]
              },
              {
                label: "Standard User with full access",
                role: "action",
                icon: InfoIcon,
                onSelect$: $(() => {
                  console.log("Add standard user with full access");
                }),
                index: 1,
                subItems: [
                  {
                    label: "Full Access with Admin Rights",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add standard user with full access and admin rights");
                    }),
                    index: 0
                  },
                  {
                    label: "Full Access with Audit Rights",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add standard user with full access and audit rights");
                    }),
                    index: 1
                  }
                ]
              },
              {
                label: "Standard User with basic access",
                role: "action",
                icon: InfoIcon,
                onSelect$: $(() => {
                  console.log("Add standard user with basic access");
                }),
                index: 2,
                subItems: [
                  {
                    label: "Basic Access Level 1",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add standard user with basic access level 1");
                    }),
                    index: 0
                  },
                  {
                    label: "Basic Access Level 2",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add standard user with basic access level 2");
                    }),
                    index: 1
                  }
                ]
              },
              {
                label: "Standard User as a viewer",
                role: "action",
                icon: InfoIcon,
                onSelect$: $(() => {
                  console.log("Add standard user as a viewer");
                }),
                index: 3,
                subItems: [
                  {
                    label: "Viewer with Comment Rights",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add standard user as a viewer with comment rights");
                    }),
                    index: 0
                  },
                  {
                    label: "Viewer with Editing Rights",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add standard user as a viewer with editing rights");
                    }),
                    index: 1
                  }
                ]
              },
              {
                label: "Standard User as a contributor",
                role: "action",
                icon: InfoIcon,
                onSelect$: $(() => {
                  console.log("Add standard user as a contributor");
                }),
                index: 4,
                subItems: [
                  {
                    label: "Contributor with Publishing Rights",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add standard user as a contributor with publishing rights");
                    }),
                    index: 0
                  },
                  {
                    label: "Contributor in Marketing Department",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add standard user as a contributor in marketing department");
                    }),
                    index: 1
                  }
                ]
              },
              {
                label: "Standard User as a manager",
                role: "action",
                icon: InfoIcon,
                onSelect$: $(() => {
                  console.log("Add standard user as a manager");
                }),
                index: 5,
                subItems: [
                  {
                    label: "Manager with HR Rights",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add standard user as a manager with HR rights");
                    }),
                    index: 0
                  },
                  {
                    label: "Manager with Finance Rights",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add standard user as a manager with finance rights");
                    }),
                    index: 1
                  }
                ]
              },
              {
                label: "Standard User as an auditor",
                role: "action",
                icon: InfoIcon,
                onSelect$: $(() => {
                  console.log("Add standard user as an auditor");
                }),
                index: 6,
                subItems: [
                  {
                    label: "Auditor with Compliance Review Rights",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add standard user as an auditor with compliance review rights");
                    }),
                    index: 0
                  },
                  {
                    label: "Auditor with Risk Assessment Rights",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add standard user as an auditor with risk assessment rights");
                    }),
                    index: 1
                  }
                ]
              }
            ]
          },
          {
            label: "Premium User",
            role: "group",
            icon: InfoIcon,
            onSelect$: $(() => {
              console.log("Add premium user");
            }),
            index: 7,
            subItems: [
              {
                label: "Premium User with extended access",
                role: "group",
                icon: InfoIcon,
                onSelect$: $(() => {
                  console.log("Add premium user with extended access");
                }),
                index: 0,
                subItems: [
                  {
                    label: "Extended Access Level 1",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add premium user with extended access level 1");
                    }),
                    index: 0
                  },
                  {
                    label: "Extended Access Level 2",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add premium user with extended access level 2");
                    }),
                    index: 1
                  }
                ]
              },
              {
                label: "Premium User with VIP access",
                role: "action",
                icon: InfoIcon,
                onSelect$: $(() => {
                  console.log("Add premium user with VIP access");
                }),
                index: 1,
                subItems: [
                  {
                    label: "VIP Access with Priority Support",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add premium user with VIP access and priority support");
                    }),
                    index: 0
                  },
                  {
                    label: "VIP Access with Personal Consultant",
                    role: "action",
                    icon: InfoIcon,
                    onSelect$: $(() => {
                      console.log("Add premium user with VIP access and personal consultant");
                    }),
                    index: 1
                  }
                ]
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
