import { ERole } from "@base/enums/role.enum";

export const Menus = [
  {
    title: "Dashboard",
    roles: `${ERole.Public}`,
    icon: "majesticons:home",
  },
  {
    title: "Inbox",
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
        roles: `${ERole.Restricted}`,
        icon: "material-symbols:subdirectory-arrow-right",
      },
      {
        title: "Sub Dashboard 2",
        roles: `${ERole.Public}`,
        icon: "material-symbols:subdirectory-arrow-right",
      },
    ],
    gap: true,
  },
  {
    title: "Schedule",
    roles: `${ERole.Public}`,
    icon: "uis:schedule",
  },
];
