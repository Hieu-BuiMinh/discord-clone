'use client'

import { Plus } from 'lucide-react'

import { ActionTooltip } from '@/components/common/action-tooltip'
import { useModal } from '@/hooks/use-modal-store'

export const NavigationAction = () => {
	const { onOpen } = useModal()
	return (
		<div>
			<ActionTooltip side="right" align="center" label="Add a server">
				<button className="group flex items-center" onClick={() => onOpen('createServer')}>
					<div
						className="flex mx-3 size-[48px] rounded-[24px] 
          group-hover:rounded-[16px] transition-all overflow-hidden 
          items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500"
					>
						<Plus className="group-hover:text-white transition text-emerald-500" size={25} />
					</div>
				</button>
			</ActionTooltip>
		</div>
	)
}
