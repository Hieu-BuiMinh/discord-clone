import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { ModeToggle } from '@/components/common/mode-toggle'
import { NavigationAction } from '@/components/common/navigation/navigation-action'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { currentProfile } from '@/lib/current-profile'
import db from '@/lib/db'

async function NavigationSidebar() {
	const profile = await currentProfile()

	if (!profile) {
		return redirect('/')
	}

	const servers = await db.server.findMany({
		where: {
			members: { some: { profileId: profile.id } },
		},
	})

	return (
		<div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
			<NavigationAction />
			<Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
			<ScrollArea className="flex-1 w-full">
				{/* {servers.map((server) => (
					<div key={server.id} className="mb-4">
						<NavigationItem id={server.id} imageUrl={server.imageUrl} name={server.name} />
					</div>
				))} */}
			</ScrollArea>

			<div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
				<ModeToggle />
				<UserButton
					afterSwitchSessionUrl="/"
					appearance={{
						elements: {
							avatarBox: 'size-[48px]',
						},
					}}
				/>
			</div>
		</div>
	)
}

export default NavigationSidebar
