import { ERole } from "@base/enums/role.enum";

export const Menus = [
  {
    title: "Dashboard",
    roles: `${ERole.Public}`,
    to: "/dashboard",
    icon: "majesticons:home",
  },
  {
    title: "Inbox",
    to: "/inbox",
    roles: `${ERole.Restricted}`,
    icon: "material-symbols:inbox",
  },
  {
    title: "Accounts",
    roles: `${ERole.Public}`,
    icon: "mdi:accounts",
    children: [
      {
        title: "Sub Dashboard 1",
        to: "/account/list",
        roles: `${ERole.Public}`,
        icon: "material-symbols:subdirectory-arrow-right",
      },
      {
        title: "Sub Dashboard 2",
        to: "/account/test",
        roles: `${ERole.Public}`,
        icon: "material-symbols:subdirectory-arrow-right",
      },
    ],
    gap: true,
  },
  {
    title: "Schedule",
    to: "/schedule",
    roles: `${ERole.Public}`,
    icon: "uis:schedule",
  },
];
