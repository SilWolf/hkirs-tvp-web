import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { ClsApplication } from '../types/cls.type'

import { getClsApplicationById } from '../helpers/api.helper'

const ClsApplicationDetail = (): JSX.Element => {
	const { id } = useParams<{ id: string }>()
	const caQuery = useQuery<ClsApplication>(['clsApplication', id], () =>
		getClsApplicationById(id)
	)

	if (caQuery.isLoading) {
		return (
			<>
				<div className='content'>Loading...</div>
			</>
		)
	}

	if (caQuery.isError) {
		return (
			<>
				<div className='content'>Error.</div>
			</>
		)
	}

	const ca = caQuery.data as ClsApplication

	return (
		<>
			<div className='content'>{ca.id}</div>
		</>
	)
}

export default ClsApplicationDetail
