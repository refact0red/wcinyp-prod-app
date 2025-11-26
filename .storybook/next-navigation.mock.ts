// Minimal mock of Next.js navigation for Storybook.
// Provides the APIs our components use without needing a real Next router.

let currentPathname = "/";

type Router = {
    push: (href: string, options?: Record<string, unknown>) => void;
    replace: (href: string, options?: Record<string, unknown>) => void;
    prefetch: (href: string) => Promise<void>;
    back: () => void;
    forward: () => void;
    refresh: () => void;
    readonly pathname: string;
};

const router: Router = {
    push: (href) => console.info("[storybook router] push:", href),
    replace: (href) => console.info("[storybook router] replace:", href),
    prefetch: async () => {},
    back: () => console.info("[storybook router] back"),
    forward: () => console.info("[storybook router] forward"),
    refresh: () => console.info("[storybook router] refresh"),
    get pathname() {
        return currentPathname;
    },
};

export const useRouter = () => router;

export const usePathname = () => router.pathname;

export const useSearchParams = () => new URLSearchParams();

export const useParams = () => ({});

export const redirect = (href: string) => {
    throw new Error(`redirect(${href}) is not supported in Storybook mock router.`);
};

export const permanentRedirect = redirect;

export const setMockPathname = (pathname: string) => {
    currentPathname = pathname;
};
