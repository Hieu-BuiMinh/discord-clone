import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

async function AuthLayout({ children }: { children: ReactNode }) {
	const { userId } = await auth()

	if (userId) {
		return redirect('/')
	}

	return <div className="h-screen flex justify-center items-center">{children}</div>
}

export default AuthLayout
