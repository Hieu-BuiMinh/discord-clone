'use client'

import React, { useEffect, useState } from 'react'

function ModalsProviders() {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return <div></div>
}

export default ModalsProviders
