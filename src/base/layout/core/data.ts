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
    title: "Ayarlar",
    roles: `${ERole.Public},${ERole.Public},${ERole.Public},${ERole.Public},${ERole.Public}`,
    icon: "majesticons:settings-cog-line",
    children: [
      {
        to: "/ayarlar/sistem",
        roles: ERole.Public,
        title: "Sistem Ayarları",
      },
      {
        to: "/ayarlar/e-ticaret",
        roles: ERole.Public,
        title: "E-ticaret Ayarları",
      },
      {
        to: "/ayarlar/kullanici",
        roles: ERole.Public,
        title: "Kullanıcı Arayüz Ayarları",
      },
    ],
  },
];
