import React from 'react'

export type RouteType = {
	path: string
	name: string
	icon?: string
	component: typeof React.Component | React.FC
	inSidebar?: boolean
}
