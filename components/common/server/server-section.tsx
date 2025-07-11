'use client'

import type { ChannelType } from '@prisma/client'
import { MemberRole } from '@prisma/client'
import { Plus, Settings } from 'lucide-react'
import React from 'react'

import { ActionTooltip } from '@/components/common/action-tooltip'
import { useModal } from '@/hooks/use-modal-store'
import type { ServerWithMembersWithProfile } from '@/types'

interface ServerSectionProps {
	label: string
	role?: MemberRole
	sectionType: 'channels' | 'members'
	channelType?: ChannelType
	server?: ServerWithMembersWithProfile
}

function ServerSection({ label, sectionType, channelType, role, server }: ServerSectionProps) {
	const { onOpen } = useModal()

	return (
		<div className="flex items-center justify-between py-2">
			<p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">{label}</p>

			{role !== MemberRole.GUEST && sectionType === 'channels' && (
				<ActionTooltip label="Create Channel" side="top">
					<button
						className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
						onClick={() => onOpen('createChannel', { channelType })}
					>
						<Plus className="size-4" />
					</button>
				</ActionTooltip>
			)}
			{role === MemberRole.ADMIN && sectionType === 'members' && (
				<ActionTooltip label="Manage Members" side="top">
					<button
						className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
						onClick={() => onOpen('members', { server })}
					>
						<Settings className="size-4" />
					</button>
				</ActionTooltip>
			)}
		</div>
	)
}

export default ServerSection
