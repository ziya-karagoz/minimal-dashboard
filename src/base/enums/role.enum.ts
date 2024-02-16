export class ERole {
  static Public = "Public";

  static UserView = "UserView";
  static UserCreate = "UserCreate";
  static UserUpdate = "UserUpdate";
  static UserDelete = "UserDelete";

  static AdminCreate = "AdminCreate";
  static AdminUpdate = "AdminUpdate";
  static AdminDelete = "AdminDelete";
  static AdminRole = "AdminRole";
  static AdminView = "AdminView";

  static CardVisitView = "CardvisitView";
  static CardVisitCreate = "CardvisitCreate";
  static CardVisitUpdate = "CardvisitUpdate";
  static CardVisitDelete = "CardvisitDelete";

  static CompanyView = "CompanyView";
  static CompanyCreate = "CompanyCreate";
  static CompanyUpdate = "CompanyUpdate";

  static GeneralSettingUpdate = "GeneralSettingUpdate";
  static FileManagerManegment = "FileManagerManegment";
}

export class ERolePath {
  static "/dashboard" = ERole.Public;
  static "/user/list" = ERole.UserView;
  static "/user/create" = ERole.UserCreate;

  static "/admin/create" = ERole.AdminCreate;
  static "/admin/list" = ERole.AdminView;
  static "/admin/update/:id" = ERole.AdminUpdate;
  static "/admin/role/:id" = ERole.AdminRole;

  static "/cardvisit/list" = ERole.CardVisitView;
  static "/cardvisit/create" = ERole.CardVisitCreate;

  static "/company/list" = ERole.CompanyView;
  static "/company/create" = ERole.CompanyCreate;

  static "/file-manager" = ERole.FileManagerManegment;
  static "/playground" = ERole.Public;
}
