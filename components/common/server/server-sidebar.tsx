import { auth } from '@clerk/nextjs/server'
import { ChannelType, MemberRole } from '@prisma/client'
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

import ServerChannel from '@/components/common/server/server-channel'
import ServerHeader from '@/components/common/server/server-header'
import ServerMember from '@/components/common/server/server-member'
import ServerSection from '@/components/common/server/server-section'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { currentProfile } from '@/lib/current-profile'
import db from '@/lib/db'

interface IServerSidebarProps {
	serverId: string
}

const iconMap = {
	[ChannelType.TEXT]: <Hash className="size-4 mr-2" />,
	[ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
	[ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
}

const roleIconMap = {
	[MemberRole.GUEST]: null,
	[MemberRole.MODERATOR]: <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />,
	[MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
}

async function ServerSidebar({ serverId }: IServerSidebarProps) {
	const { redirectToSignIn } = await auth()
	const profile = await currentProfile()

	if (!profile) {
		return redirectToSignIn()
	}

	const server = await db.server.findUnique({
		where: { id: serverId },
		include: {
			channels: { orderBy: { createdAt: 'asc' } },
			members: {
				include: {
					profile: true,
				},
				orderBy: { role: 'asc' },
			},
		},
	})

	if (!server) {
		redirect('/')
	}

	const textChannels = server.channels.filter((channel) => channel.type == ChannelType.TEXT)
	const audioChannels = server.channels.filter((channel) => channel.type === ChannelType.AUDIO)
	const videoChannels = server.channels.filter((channel) => channel.type === ChannelType.VIDEO)

	const members = server.members.filter((member) => member.profileId !== profile.id)

	const role = server.members.find((member) => member.profileId === profile.id)?.role

	return (
		<div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
			<ServerHeader server={server} role={role} />
			<ScrollArea className="flex-1 px-3">
				<div className="mt-2"></div>
				<Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

				{!!textChannels?.length && (
					<div className="mb-2">
						<ServerSection
							sectionType="channels"
							channelType={ChannelType.TEXT}
							role={role}
							label="Text Channels"
						/>
						<div className="space-y-[2px]">
							{textChannels.map((channel) => (
								<ServerChannel key={channel.id} channel={channel} role={role} server={server} />
							))}
						</div>
					</div>
				)}

				{!!audioChannels?.length && (
					<div className="mb-2">
						<ServerSection
							sectionType="channels"
							channelType={ChannelType.AUDIO}
							role={role}
							label="Audio Channels"
						/>
						<div className="space-y-[2px]">
							{audioChannels.map((channel) => (
								<ServerChannel key={channel.id} channel={channel} role={role} server={server} />
							))}
						</div>
					</div>
				)}

				{!!videoChannels?.length && (
					<div className="mb-2">
						<ServerSection
							sectionType="channels"
							channelType={ChannelType.VIDEO}
							role={role}
							label="Video Channels"
						/>
						<div className="space-y-[2px]">
							{videoChannels.map((channel) => (
								<ServerChannel key={channel.id} channel={channel} role={role} server={server} />
							))}
						</div>
					</div>
				)}

				{!!members?.length && (
					<div className="mb-2">
						<ServerSection sectionType="members" role={role} label="Members" server={server} />
						<div className="space-y-[2px]">
							{members.map((member) => (
								<ServerMember key={member.id} member={member} server={server} />
							))}
						</div>
					</div>
				)}
			</ScrollArea>
		</div>
	)
}

export default ServerSidebar
