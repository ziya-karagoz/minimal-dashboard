import { ERole } from "@base/enums/role.enum";

export const Menus = [
  {
    title: "Ana Sayfa",
    roles: `${ERole.DashboardView}`,
    to: "/anasayfa",
    icon: "majesticons:home-line",
  },
  {
    section: "İstekler",
  },
  {
    title: "Kullanıcı İstekleri",
    to: "/istekler",
    roles: `${ERole.DashboardView}`,
    icon: "majesticons:phone-incoming-line",
  },
  {
    section: "Modüller",
  },
  {
    title: "Üyeler",
    roles: `${ERole.UserView}`,
    to: "/kullanicilar",
    icon: "majesticons:users-line",
  },
  {
    title: "Yöneticiler",
    roles: `${ERole.AdminView}`,
    to: "/yoneticiler",
    icon: "ri:admin-line",
  },
  {
    title: "Müşteriler",
    roles: `${ERole.CustomerView}`,
    to: "/musteriler",
    icon: "ri:building-line",
  },
  {
    title: "İçerikler",
    roles: `${ERole.ContractView},${ERole.ContractCreate},${ERole.DynamicPageView},${ERole.DynamicPageCreate},${ERole.BlogView},${ERole.BlogCreate},${ERole.DynamicComponentView}`,
    icon: "majesticons:textbox-line",
    children: [
      {
        title: "Sözleşmeler",
        to: "/icerikler/sozlesmeler",
        roles: `${ERole.ContractView}`,
      },
      {
        title: "Sayfalar",
        to: "/icerikler/sayfalar",
        roles: `${ERole.DynamicPageView}`,
      },
      {
        to: "/icerikler/blog-kategorileri",
        roles: ERole.BlogView,
        title: "Blog Kategorileri",
      },
      {
        to: "/icerikler/bloglar",
        roles: ERole.BlogView,
        title: "Bloglar",
      },
      {
        to: "/icerikler/bilesenler",
        roles: ERole.DynamicComponentView,
        title: "Bileşenler",
      },
      {
        to: "/icerikler/soru-kategorileri",
        roles: ERole.ArticleView,
        title: "SSS Kategorileri",
      },
      {
        to: "/icerikler/sorular",
        roles: ERole.ArticleView,
        title: "SSS",
      },
    ],
  },
  {
    title: "Tanımlamalar",
    roles: `${ERole.SectorView},${ERole.SectorCreate},${ERole.StepView},${ERole.StepUpdate}`,
    icon: "lets-icons:save",
    children: [
      {
        to: "/on-tanimlamalar/sektorler",
        roles: ERole.SectorView,
        title: "Sektörler",
      },
      {
        to: "/on-tanimlamalar/adimlar",
        roles: ERole.StepView,
        title: "Adımlar",
      },
      {
        to: "/on-tanimlamalar/birimler",
        roles: ERole.UnitView,
        title: "Birimler",
      },
      {
        to: "/on-tanimlamalar/bankalar",
        roles: `${ERole.BankView}`,
        title: "Bankalar",
      },
    ],
  },
  {
    title: "Değişkenler",
    roles: `${ERole.VariableView}`,
    to: "/degiskenler",
    icon: "pepicons-pop:info-circle",
  },
  {
    title: "İş Kolları",
    roles: `${ERole.BusinessLineView}`,
    to: "/is-kollari",
    icon: "icon-park-outline:right-branch",
  },
  {
    title: "Hizmet Grupları",
    roles: `${ERole.ServiceGroupView}`,
    to: "/hizmet-gruplari",
    icon: "lets-icons:group-share",
  },
  {
    title: "Hizmetler",
    roles: `${ERole.ServiceView}`,
    to: "/hizmetler",
    icon: "octicon:stack-16",
  },
  {
    title: "Sözleşme Kategorileri",
    roles: `${ERole.DashboardView}`,
    to: "/sozlesme-kategori",
    icon: "fluent:group-list-20-filled",
  },
  {
    title: "Sözleşmeler",
    roles: `${ERole.ProductView}`,
    to: "/urunler",
    icon: "uil:cart",
  },

  {
    title: "Kampanyalar",
    roles: `${ERole.CampaignView}`,
    to: "/kampanyalar",
    icon: "material-symbols:campaign-outline-sharp",
  },
  {
    title: "Taslaklar Sözleşmeler",
    roles: ERole.ProductView,
    to: "/urunler/taslak",
    icon: "lucide:drafting-compass",
  },
  {
    section: "Ayarlar",
  },
  {
    title: "Ayarlar",
    roles: `${ERole.GeneralSettingUpdate},${ERole.FileManagerManegment},${ERole.GeneralSettingView},${ERole.EcommerceSettingView},${ERole.GeneralSettingView}`,
    icon: "majesticons:settings-cog-line",
    children: [
      {
        to: "/ayarlar/sistem",
        roles: ERole.GeneralSettingView,
        title: "Sistem Ayarları",
      },
      {
        to: "/ayarlar/e-ticaret",
        roles: ERole.EcommerceSettingView,
        title: "E-ticaret Ayarları",
      },
      {
        to: "/ayarlar/kullanici",
        roles: ERole.GeneralSettingView,
        title: "Kullanıcı Arayüz Ayarları",
      },
    ],
  },
  {
    title: "Dosya Yöneticisi",
    roles: `${ERole.FileManagerManegment}`,
    to: "/dosya-yoneticisi",
    icon: "majesticons:folder-line",
  },
  {
    title: "Loglar",
    roles: `${ERole.LogView}`,
    to: "/loglar",
    icon: "mingcute:history-fill",
  },
];
