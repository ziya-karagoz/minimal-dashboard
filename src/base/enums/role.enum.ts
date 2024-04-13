export class ERole {
  static Public = "Public";

  static UserView = "UserView";
  static UserCreate = "UserCreate";
  static UserUpdate = "UserUpdate";
  static UserDelete = "UserDelete";

  static AdminView = "AdminView";
  static AdminRole = "AdminRole";
  static AdminCreate = "AdminCreate";
  static AdminUpdate = "AdminUpdate";
  static AdminDelete = "AdminDelete";

  static CustomerView = "CustomerView";
  static CustomerCreate = "CustomerCreate";
  static CustomerUpdate = "CustomerUpdate";
  static CustomerDelete = "CustomerDelete";

  static ContractView = "ContractView";
  static ContractCreate = "ContractCreate";
  static ContractUpdate = "ContractUpdate";
  static ContractDelete = "ContractDelete";

  static DynamicComponentView = "DynamicComponentView";
  static DynamicComponentUpdate = "DynamicComponentUpdate";
  static DynamicComponentDelete = "DynamicComponentDelete";

  static BlogView = "BlogView";
  static BlogCreate = "BlogCreate";
  static BlogUpdate = "BlogUpdate";
  static BlogDelete = "BlogDelete";

  static DynamicPageView = "DynamicPageView";
  static DynamicPageCreate = "DynamicPageCreate";
  static DynamicPageUpdate = "DynamicPageUpdate";
  static DynamicPageDelete = "DynamicPageDelete";

  static ServiceView = "ServiceView";
  static ServiceCreate = "ServiceCreate";
  static ServiceUpdate = "ServiceUpdate";
  static ServiceDelete = "ServiceDelete";

  static OrderView = "OrderView";
  static OrderUpdate = "OrderUpdate";

  static ContactMessageView = "ContactMessageView";
  static ContactMessageUpdate = "ContactMessageUpdate";

  static GeneralSettingView = "GeneralSettingView";
  static GeneralSettingUpdate = "GeneralSettingUpdate";

  static EcommerceSettingView = "EcommerceSettingView";
  static EcommerceSettingUpdate = "EcommerceSettingUpdate";

  static LogView = "LogView";

  static DashboardView = "DashboardView";
  static FileManagerManegment = "FileManagerManegment";

  static ContactView = "ContactView";
  static ContactMessage = "ContactMessage";
  static ContactAssign = "ContactAssign";
  static ContactMessageSuper = "ContactMessageSuper";

  static VariableView = "VariableView";
  static VariableCreate = "VariableCreate";
  static VariableUpdate = "VariableUpdate";
  static VariableDelete = "VariableDelete";

  static BusinessLineView = "BusinessLineView";
  static BusinessLineCreate = "BusinessLineCreate";
  static BusinessLineUpdate = "BusinessLineUpdate";
  static BusinessLineDelete = "BusinessLineDelete";

  static ServiceGroupView = "ServiceGroupView";
  static ServiceGroupCreate = "ServiceGroupCreate";
  static ServiceGroupUpdate = "ServiceGroupUpdate";
  static ServiceGroupDelete = "ServiceGroupDelete";

  static SectorView = "SectorView";
  static SectorCreate = "SectorCreate";
  static SectorUpdate = "SectorUpdate";
  static SectorDelete = "SectorDelete";

  static StepView = "StepView";
  static StepUpdate = "StepUpdate";

  static UnitView = "UnitView";
  static UnitCreate = "UnitCreate";
  static UnitUpdate = "UnitUpdate";
  static UnitDelete = "UnitDelete";

  static ArticleView = "ArticleView";
  static ArticleCreate = "ArticleCreate";
  static ArticleUpdate = "ArticleUpdate";
  static ArticleDelete = "ArticleDelete";
  static ArticleVersionCreate = "ArticleVersionCreate";
  static ArticleVersionUpdate = "ArticleVersionUpdate";

  static ProductView = "ProductView";
  static ProductCreate = "ProductCreate";
  static ProductUpdate = "ProductUpdate";
  static ProductDelete = "ProductDelete";

  static ProductCategoryView = "ProductCategoryView";
  static ProductCategoryCreate = "ProductCategoryCreate";
  static ProductCategoryUpdate = "ProductCategoryUpdate";
  static ProductCategoryDelete = "ProductCategoryDelete";
  static ProductCategoryAssign = "ProductCategoryAssign";

  //bank roles
  static BankView = "BankView";
  static BankCreate = "BankCreate";
  static BankUpdate = "BankUpdate";
  static BankDelete = "BankDelete";

  static ProductStepView = "ProductStepView";
  static ProductStepCreate = "ProductStepCreate";
  static ProductStepUpdate = "ProductStepUpdate";

  static ServiceGroupCopy = "ServiceGroupCopy";
  static ServiceCopy = "ServiceCopy";
  static BusinessLineCopy = "BusinessLineCopy";
  static ProductCopy = "ProductCopy";

  static CampaignView = "CampaignView";
  static CampaignCreate = "CampaignCreate";
  static CampaignUpdate = "CampaignUpdate";
  static CampaignDelete = "CampaignDelete";

  static CouponView = "CouponView";
  static CouponCreate = "CouponCreate";
  static CouponUpdate = "CouponUpdate";
  static CouponDelete = "CouponDelete";
}

export class ERolePath {
  static "/anasayfa" = ERole.DashboardView;
  static "/anasayfa/components" = ERole.DashboardView;
  static "/dosya-yoneticisi" = ERole.FileManagerManegment;

  static "/istekler" = ERole.ContactView;
  static "/istekler/detay/:id" = ERole.ContactView;

  static "/kullanicilar" = ERole.UserView;
  static "/kullanicilar/ekle" = ERole.UserCreate;
  static "/kullanicilar/duzenle/:id" = ERole.UserUpdate;
  static "/kullanicilar/yetki/:id" = ERole.UserUpdate;

  static "/yoneticiler" = ERole.AdminView;
  static "/yoneticiler/ekle" = ERole.AdminCreate;
  static "/yoneticiler/duzenle/:id" = ERole.AdminUpdate;
  static "/yoneticiler/yetki/:id" = ERole.AdminRole;

  static "/musteriler" = ERole.CustomerView;
  static "/musteriler/ekle" = ERole.CustomerCreate;
  static "/musteriler/duzenle/:id" = ERole.CustomerUpdate;

  static "/icerikler/sozlesmeler" = ERole.ContractView;
  static "/icerikler/sozlesmeler/ekle" = ERole.ContractCreate;
  static "/icerikler/sozlesmeler/duzenle/:id" = ERole.ContractUpdate;

  static "/icerikler/sayfalar" = ERole.DynamicPageView;
  static "/icerikler/sayfalar/ekle" = ERole.DynamicPageCreate;
  static "/icerikler/sayfalar/duzenle/:id" = ERole.DynamicPageUpdate;

  static "/icerikler/bilesenler" = ERole.DynamicComponentView;
  static "/icerikler/bilesenler/duzenle/:id" = ERole.DynamicComponentUpdate;

  static "/icerikler/blog-kategorileri" = ERole.BlogView;
  static "/icerikler/blog-kategorileri/ekle" = ERole.BlogCreate;
  static "/icerikler/blog-kategorileri/duzenle/:id" = ERole.BlogUpdate;

  static "/icerikler/bloglar" = ERole.BlogView;
  static "/icerikler/bloglar/ekle" = ERole.BlogCreate;
  static "/icerikler/bloglar/duzenle/:id" = ERole.BlogUpdate;

  static "/ayarlar/sistem" = ERole.GeneralSettingView;
  static "/ayarlar/e-ticaret" = ERole.EcommerceSettingView;
  static "/ayarlar/kullanici" = ERole.GeneralSettingView;
  static "/ayarlar/kullanici/duzenle/:id" = ERole.GeneralSettingView;

  static "/degiskenler" = ERole.VariableView;
  static "/degiskenler/ekle" = ERole.Public;
  static "/degiskenler/duzenle/:id" = ERole.VariableUpdate;
  static "/degiskenler/kullanim-alanlari/:id" = ERole.VariableView; // TODO[ziya-karagoz] ask backend if is there any role for this route

  static "/is-kollari" = ERole.BusinessLineView;
  static "/is-kollari/ekle" = ERole.BusinessLineCreate;
  static "/is-kollari/detay/:id/duzenle" = ERole.BusinessLineUpdate;
  static "/is-kollari/detay/:id/degiskenler" = ERole.BusinessLineUpdate;

  static "/hizmet-gruplari" = ERole.ServiceGroupView;
  static "/hizmet-gruplari/ekle" = ERole.ServiceGroupCreate;
  static "/hizmet-gruplari/detay/:id/duzenle" = ERole.ServiceGroupUpdate;
  static "/hizmet-gruplari/detay/:id/degiskenler" = ERole.ServiceGroupUpdate;

  static "/hizmetler" = ERole.ServiceView;
  static "/hizmetler/ekle" = ERole.ServiceCreate;
  static "/hizmetler/detay/:id/duzenle" = ERole.ServiceUpdate;
  static "/hizmetler/detay/:id/degiskenler" = ERole.ServiceUpdate;

  static "/on-tanimlamalar/sektorler" = ERole.SectorView;
  static "/on-tanimlamalar/sektorler/ekle" = ERole.SectorCreate;
  static "/on-tanimlamalar/sektorler/duzenle/:id" = ERole.SectorUpdate;

  static "/on-tanimlamalar/adimlar" = ERole.StepView;
  static "/on-tanimlamalar/adimlar/duzenle/:id" = ERole.StepUpdate;

  static "/on-tanimlamalar/birimler" = ERole.UnitView;
  static "/on-tanimlamalar/birimler/ekle" = ERole.UnitCreate;
  static "/on-tanimlamalar/birimler/duzenle/:id" = ERole.UnitUpdate;

  static "/on-tanimlamalar/bankalar/ekle" = ERole.BankCreate;
  static "/on-tanimlamalar/bankalar" = ERole.BankView;
  static "/on-tanimlamalar/bankalar/duzenle/:id" = ERole.BankUpdate;

  static "/urun-sozlesmeleri" = ERole.ArticleView;
  static "/urun-sozlesmeleri/ekle" = ERole.ArticleCreate;
  static "/urun-sozlesmeleri/duzenle/:id" = ERole.ArticleUpdate;
  static "/urun-sozlesmeleri/versiyon/ekle/:id" = ERole.ArticleVersionCreate;

  static "/urunler" = ERole.ProductView;
  static "/urunler/taslak" = ERole.ProductCreate;
  static "/urunler/ekle" = ERole.ProductCreate;
  static "/urunler/duzenle/:id" = ERole.ProductUpdate;
  static "/urunler/adimlar/:id" = ERole.ProductStepView;
  static "/urunler/adimlar/:id/duzenle/:stepId" = ERole.ProductStepUpdate;

  static "/icerikler/soru-kategorileri" = ERole.ArticleView;
  static "/icerikler/soru-kategorileri/ekle" = ERole.ArticleCreate;
  static "/icerikler/soru-kategorileri/duzenle/:id" = ERole.ArticleUpdate;

  static "/icerikler/sorular" = ERole.ArticleView;
  static "/icerikler/sorular/ekle" = ERole.ArticleCreate;
  static "/icerikler/sorular/duzenle/:id" = ERole.ArticleUpdate;

  static "sozlesme-kategorileri/ekle" = ERole.ProductCategoryCreate;
  static "/sozlesme-kategori" = ERole.ProductCategoryView;
  static "/sozlesme-kategori/duzenle/:id" = ERole.ProductCategoryUpdate;
  static "/sozlesme-kategori/urun-atama/:id" = ERole.ProductCategoryAssign;

  static "/loglar" = ERole.LogView;

  static "/bildirimler" = ERole.Public;

  static "/kampanyalar" = ERole.CampaignView;
  static "/kampanyalar/ekle" = ERole.CampaignCreate;
  static "/kampanyalar/duzenle/:id" = ERole.CampaignUpdate;

  static "/kupon" = ERole.CouponView;
  static "/kupon/ekle/:id" = ERole.CouponCreate;
  static "/kupon/duzenle/:id" = ERole.CouponUpdate;
}
