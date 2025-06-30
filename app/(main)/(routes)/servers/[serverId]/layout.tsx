import { auth } from '@clerk/nextjs/server'
import React from 'react'

import ServerSidebar from '@/components/common/server/server-sidebar'
import { currentProfile } from '@/lib/current-profile'
import db from '@/lib/db'

interface ServerIdLayoutProps {
	children: React.ReactNode
	params: Promise<{
		serverId: string
	}>
}

async function ServerIdLayout({ children, params }: ServerIdLayoutProps) {
	const { redirectToSignIn } = await auth()

	const profile = await currentProfile()

	const serverId = (await params).serverId

	if (!profile) return redirectToSignIn()

	const server = await db.server.findUnique({
		where: {
			id: serverId,
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	})
	if (!server) redirectToSignIn()

	return (
		<div className="h-full">
			<div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
				<ServerSidebar serverId={serverId} />
			</div>
			<main className="h-full md:pl-60">{children}</main>
		</div>
	)
}

export default ServerIdLayout
