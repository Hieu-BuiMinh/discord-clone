'use client'

import { useClerk } from '@clerk/nextjs'
import React from 'react'

import { ModeToggle } from '@/components/common/mode-toggle'

function HomepPage() {
	const { signOut } = useClerk()

	const handleSignOut = async () => {
		try {
			await signOut()
		} catch (err) {
			console.error(JSON.stringify(err, null, 2))
		}
	}

	return (
		<>
			<button onClick={handleSignOut}>Sign out</button>

			<ModeToggle />
		</>
	)
}

export default HomepPage
