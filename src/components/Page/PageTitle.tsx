import React from 'react'
import { Helmet } from 'react-helmet'

type Props = {
  children: string
}
type State = {
  children: string
  title: string
}

class PageTitle extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      children: props.children,
      title: props.children.toString(),
    }
  }

  render() {
    return (
      <Helmet>
        <title>{this.state.title}</title>
      </Helmet>
    )
  }

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.children !== this.state.children
  }
}

export default PageTitle
