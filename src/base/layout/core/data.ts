import { ERole } from "@base/enums/role.enum";

export const Menus = [
  {
    title: "Ana Sayfa",
    roles: `${ERole.Public}`,
    to: "/anasayfa",
    icon: "majesticons:home-line",
  },
  {
    section: "Ayarlar",
  },
  {
    title: "Hesaplar",
    roles: `${ERole.Public},${ERole.Public},${ERole.Public},${ERole.Public},${ERole.Public}`,
    icon: "mdi:account-box-outline",
    children: [
      {
        to: "/hesaplar/liste",
        roles: ERole.Public,
        title: "Hesaplar",
      },
      {
        to: "/hesaplar/test",
        roles: ERole.Public,
        title: "Test",
      },
    ],
  },
];
