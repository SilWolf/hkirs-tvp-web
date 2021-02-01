import React from 'react'

import pageSlice from '../../slices/page.slice'
import store from '../../store'

type Props = {
	children: string
}
type State = {
	children: string
	brandname: string
}

class PageBrandname extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			children: props.children,
			brandname: props.children.toString(),
		}
	}

	render() {
		store.dispatch(pageSlice.actions.brandName(this.state.brandname))
		return <></>
	}
}

export default PageBrandname
