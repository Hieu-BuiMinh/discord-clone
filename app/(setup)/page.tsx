import { redirect } from 'next/navigation'
import React from 'react'

import { initialProfile } from '@/actions/initialProfile'
import InitialModal from '@/components/common/modals/initial-modal'
import db from '@/lib/db'

async function SetupPage() {
	const profile = await initialProfile()

	const server = await db.server.findFirst({
		where: {
			members: { some: { profileId: profile?.id } },
		},
	})

	if (server) {
		return redirect(`/servers/${server.id}`)
	}

	return <InitialModal />
}

export default SetupPage
