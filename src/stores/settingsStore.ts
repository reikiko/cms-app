import { create } from "zustand";
import { persist } from "zustand/middleware";

type MenuGroup = {
  id: string;
  name: string;
};

type Menu = {
  id: string;
  name: string;
  groupId: string;
};

interface SettingsState {
  menuGroups: MenuGroup[];
  menus: Menu[];
  addMenuGroup: (name: string) => void;
  removeMenuGroup: (id: string) => void;
  addMenu: (groupId: string, name: string) => void;
  removeMenu: (id: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      menuGroups: [],
      menus: [],
      addMenuGroup: (name) => {
        const newGroup = { id: crypto.randomUUID(), name };
        set((state) => ({ menuGroups: [...state.menuGroups, newGroup] }));
      },
      removeMenuGroup: (id) => {
        set((state) => ({
          menuGroups: state.menuGroups.filter((g) => g.id !== id),
          menus: state.menus.filter((m) => m.groupId !== id),
        }));
      },
      addMenu: (groupId, name) => {
        const newMenu = { id: crypto.randomUUID(), name, groupId };
        set((state) => ({ menus: [...state.menus, newMenu] }));
      },
      removeMenu: (id) => {
        set((state) => ({ menus: get().menus.filter((m) => m.id !== id) }));
      },
    }),
    {
      name: "cms-settings-storage", // key in localStorage
    },
  ),
);
