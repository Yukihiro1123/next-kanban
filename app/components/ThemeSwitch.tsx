"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Switch
      defaultChecked={theme === "dark"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    />
  );
};
