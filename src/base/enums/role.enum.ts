export class ERole {
  static Public = "Public";

  // example
  static Restricted = "Restricted";
}

export class ERolePath {
  static "/dashboard" = ERole.Public;
  static "/dashboard/components" = ERole.Public;
}
