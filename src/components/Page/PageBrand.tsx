import React from 'react'
import store from '../../store'
import pageSlice from '../../slices/page.slice'

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

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.children !== this.state.children
  }
}

export default PageBrandname
