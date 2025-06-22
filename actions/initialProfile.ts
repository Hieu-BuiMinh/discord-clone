import { auth, currentUser } from '@clerk/nextjs/server'
import type { Profile } from '@prisma/client'

import db from '@/lib/db'

export const initialProfile = async (): Promise<Profile | null> => {
	const { redirectToSignIn } = await auth()

	const user = await currentUser()

	if (!user) {
		redirectToSignIn()
		return null
	}

	const profile = await db.profile.findUnique({ where: { userId: user.id } })

	if (profile) {
		return profile
	}

	const newProfile = await db.profile.create({
		data: {
			userId: user.id,
			email: user.emailAddresses[0].emailAddress,
			imageUrl: user.imageUrl,
			name: `${user.firstName || ''} ${user.lastName || ''}`,
		},
	})

	return newProfile
}
