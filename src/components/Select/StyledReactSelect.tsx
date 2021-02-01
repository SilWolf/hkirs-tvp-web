import React from 'react'
import ReactSelect, { Props as ReactSelectProps } from 'react-select'
import classnames from 'classnames'

import './styled-react-select.scss'

type Props<T> = ReactSelectProps<T> & {
	isInvalid?: boolean
}

const StyledReactSelect: <T>(props: Props<T>) => JSX.Element = ({
	isInvalid,
	...others
}) => (
	<ReactSelect
		className={classnames('styled-react-select', {
			'is-invalid': isInvalid,
		})}
		classNamePrefix='styled-react-select'
		{...others}
	/>
)

export default StyledReactSelect
