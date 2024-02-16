export const Menus = [
  {
    title: "Dashboard",
    icon: "majesticons:home",
  },
  {
    title: "Inbox",
    icon: "material-symbols:inbox",
  },
  {
    title: "Accounts",
    icon: "mdi:accounts",
    children: [
      {
        title: "Sub Dashboard 1",
        icon: "material-symbols:subdirectory-arrow-right",
      },
      {
        title: "Sub Dashboard 2",
        icon: "material-symbols:subdirectory-arrow-right",
      },
    ],
    gap: true,
  },
  {
    title: "Schedule",
    icon: "uis:schedule",
  },
];
