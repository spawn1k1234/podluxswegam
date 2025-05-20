export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            id: number;
            username?: string;
            [key: string]: any;
          };
        };
        [key: string]: any;
      };
    };
  }
}
