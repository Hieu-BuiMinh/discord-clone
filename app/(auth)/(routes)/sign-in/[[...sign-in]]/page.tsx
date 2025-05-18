import { SignIn } from '@clerk/nextjs'
import React from 'react'

function SigninPage() {
	return <SignIn fallbackRedirectUrl="/sign-in" />
}

export default SigninPage
