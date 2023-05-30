import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { DarkModeSwitch } from "./DarkModeSwitch";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    resolvedTheme == "dark" ? setTheme("light") : setTheme("dark");
  };

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="lg:mb-4">
      <DarkModeSwitch checked={resolvedTheme === "dark"} onChange={toggleTheme} />
    </div>
  );
};

export default ThemeToggle;
