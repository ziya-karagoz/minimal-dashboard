export type HorizontalTabProps = {
    tabs: {
      title: string;
      icon?: string;
      content?: React.ReactNode;
    }[];
    decoration?: "classic" | "underline" | "filled" | "rounded" | "shadow" | "minimal" | "none";
    onTabChange?: (tab: any) => void;
  };

export type VerticalTabProps = {
    tabClickCallback?: (tab: string) => void;
    tabs: {
        title: string;
        icon?: string;
        content: React.ReactNode;
    }[];
};