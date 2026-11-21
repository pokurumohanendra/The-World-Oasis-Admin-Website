import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/useDarkMode";
export default function DarkModeToggle() { const { isDarkMode, toggleDarkMode } = useDarkMode(); return <ButtonIcon aria-label="Toggle dark mode" onClick={toggleDarkMode}>{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}</ButtonIcon>; }
