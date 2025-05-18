import { ClerkProvider } from '@clerk/nextjs'
import type { ReactNode } from 'react'

import ModalsProviders from '@/components/common/providers/modals-provider'
import QueryProvider from '@/components/common/providers/query-provider'
import { ThemeProvider } from '@/components/common/providers/theme-provider'

function AppProvider({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider afterSignOutUrl="/sign-in">
			<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
				<QueryProvider>
					{children}
					<ModalsProviders />
				</QueryProvider>
			</ThemeProvider>
		</ClerkProvider>
	)
}

export default AppProvider

/*

// new update for clerk authenticate with OAuthStrategy
// https://clerk.com/docs/references/javascript/sign-in#authenticate-with-redirect

import { useSignIn } from "@clerk/clerk-react";

function LoginModal() {
  const { isOpen, close } = useLoginModal();
  const { signIn, isLoaded, setSession } = useSignIn();

  const path = typeof window !== "undefined" ? window.location.href : usePathname();

  const loginWith = async ({ strategy }: { strategy: OAuthStrategy }) => {
    if (!isLoaded) return;

    await signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: path,
      redirectUrlComplete: path,
    });
  };

}

*/
