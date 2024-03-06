"use client";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleMode = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" sx={{ background: "#1b4650" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Angebot einholen
            </Typography>
            <Switch
              defaultSelected
              size="lg"
              color="success"
              startContent={<SunIcon />}
              endContent={<MoonIcon />}
              onClick={() => toggleMode()}
            ></Switch>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
}
