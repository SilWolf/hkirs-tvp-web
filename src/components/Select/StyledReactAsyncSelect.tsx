import React, { useCallback } from 'react'
import { Props as ReactSelectProps } from 'react-select'
import ReactAsyncSelect, {
	AsyncProps as ReactAsyncSelectProps,
} from 'react-select/async'
import classnames from 'classnames'

type Props<T> = ReactSelectProps<T> &
	ReactAsyncSelectProps<T> & {
		loadOptionsDebounce?: number
		isInvalid?: boolean
	}

let loadOptionsTimeout: any

const StyledReactAsyncSelect: <T>(props: Props<T>) => JSX.Element = ({
	loadOptionsDebounce = 800,
	loadOptions,
	isInvalid,
	...others
}) => {
	const handleLoadOptions = useCallback(
		(inputValue: any, callback: any) => {
			if (loadOptionsTimeout) {
				window.clearTimeout(loadOptionsTimeout)
			}
			if (loadOptions) {
				loadOptionsTimeout = window.setTimeout(() => {
					loadOptions(inputValue, callback)
				}, loadOptionsDebounce)
			}
		},
		[loadOptions, loadOptionsDebounce]
	)

	return (
		<ReactAsyncSelect
			className={classnames('styled-react-select', {
				'is-invalid': isInvalid,
			})}
			classNamePrefix='styled-react-select'
			loadOptions={handleLoadOptions}
			{...others}
		/>
	)
}

export default StyledReactAsyncSelect
