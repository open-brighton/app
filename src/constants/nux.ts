/**
 * NUX (New User Experience) registry and types.
 * Single source of truth for all guide flows; add new guides here.
 */

export type NuxStep = {
  id: string;
  title: string;
  body: string;
  /** When set, this step uses a custom screen component instead of title/body. */
  screen?: string;
  /**
   * When true, the GuideScreen footer "Next" button is hidden.
   * The custom screen component is responsible for calling onNext() to advance.
   */
  hideFooter?: boolean;
};

/** Props passed to a step screen component when step.screen is set. */
export type NuxStepScreenProps = {
  step: NuxStep;
  stepIndex: number;
  totalSteps: number;
  isLastStep: boolean;
  onNext: () => void;
  defaultRedirect: string;
  redirect?: string;
  nux: NuxDefinition;
};

export type NuxDefinition = {
  slug: string;
  title: string;
  defaultRedirect: string;
  steps: NuxStep[];
};

export const NUX_REGISTRY: NuxDefinition[] = [
  {
    slug: "user-onboarding",
    title: "Welcome to OpenBrighton",
    defaultRedirect: "/(tabs)",
    steps: [
      {
        id: "user-onboarding",
        title: "User Onboarding",
        body: "",
        screen: "user-onboarding",
        hideFooter: true,
      },
    ],
  },
  {
    slug: "welcome",
    title: "Welcome Guide",
    defaultRedirect: "/(tabs)",
    steps: [
      {
        id: "welcome",
        title: "Welcome",
        body: "",
        screen: "welcome",
      },
    ],
  },
  {
    slug: "home",
    title: "Home screen",
    defaultRedirect: "/(tabs)",
    steps: [
      {
        id: "welcome",
        title: "Welcome",
        body: "This is the home screen. Explore the main content and use the menu to navigate.",
      },
      {
        id: "done",
        title: "You're all set",
        body: "Tap Get started to go to the home screen.",
      },
    ],
  },
  {
    slug: "profile",
    title: "Profile & settings",
    defaultRedirect: "/settings",
    steps: [
      {
        id: "intro",
        title: "Profile and settings",
        body: "Your profile and app settings are in the Profile tab. Open the menu or tap Profile to get there.",
      },
      {
        id: "done",
        title: "You're all set",
        body: "Tap Get started to open Profile & Settings.",
      },
    ],
  },
];

export function getNuxBySlug(slug: string): NuxDefinition | undefined {
  return NUX_REGISTRY.find((n) => n.slug === slug);
}
