import NavigationSidebar from '@/components/common/navigation/navigation-sidebar'

interface MainLayputProps {
	children: React.ReactNode
}

const MainLayput: React.FC<MainLayputProps> = ({ children }) => {
	return (
		<div className="h-screen">
			<div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
				<NavigationSidebar />
			</div>
			<div className="md:pl-[72px] h-full">{children}</div>
		</div>
	)
}

export default MainLayput
