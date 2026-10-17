import { create } from "zustand";
import { DEFAULT_PROFILE } from "@/lib/constants/profile";
import type { ProfileData, ProfileInput } from "@/lib/validations/profile";
import type { ActionResponse } from "@/types";

interface ProfileState {
  profile: ProfileData;
  initialProfile: ProfileData;
  hasChanges: boolean;
  isSaving: boolean;
  isSaved: boolean;
  errorMessage: string | null;
  initProfile: (data: ProfileData) => void;
  setField: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
  addCompany: (company: string) => void;
  removeCompany: (company: string) => void;
  saveChanges: (
    saveAction: (payload: ProfileInput) => Promise<ActionResponse<ProfileInput>>
  ) => Promise<boolean>;
  discardChanges: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: DEFAULT_PROFILE,
  initialProfile: DEFAULT_PROFILE,
  hasChanges: false,
  isSaving: false,
  isSaved: false,
  errorMessage: null,

  initProfile: (data) =>
    set({ profile: data, initialProfile: data, hasChanges: false }),

  setField: (key, value) =>
    set((state) => ({
      profile: { ...state.profile, [key]: value },
      hasChanges: true,
      isSaved: false,
    })),

  addCompany: (company) => {
    const trimmed = company.trim();
    if (!trimmed) return;
    const current = get().profile.targetCompanies;
    if (current.includes(trimmed)) return;
    set((state) => ({
      profile: {
        ...state.profile,
        targetCompanies: [...state.profile.targetCompanies, trimmed],
      },
      hasChanges: true,
      isSaved: false,
    }));
  },

  removeCompany: (company) =>
    set((state) => ({
      profile: {
        ...state.profile,
        targetCompanies: state.profile.targetCompanies.filter((c) => c !== company),
      },
      hasChanges: true,
      isSaved: false,
    })),

  saveChanges: async (saveAction) => {
    set({ isSaving: true, errorMessage: null });
    const { profile } = get();
    const res = await saveAction(profile);
    if (res.success) {
      set({ isSaving: false, isSaved: true, hasChanges: false, initialProfile: profile });
      return true;
    }
    set({ isSaving: false, errorMessage: res.error || "Save failed." });
    return false;
  },

  discardChanges: () =>
    set((state) => ({
      profile: state.initialProfile,
      hasChanges: false,
      isSaved: false,
      errorMessage: null,
    })),
}));
