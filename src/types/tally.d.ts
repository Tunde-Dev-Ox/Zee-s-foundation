// Minimal global type for the Tally embed script used in the volunteer page
declare interface TallyStatic {
  loadEmbeds: () => void;
}

declare global {
  interface Window {
    Tally?: TallyStatic;
  }
}

export {};
