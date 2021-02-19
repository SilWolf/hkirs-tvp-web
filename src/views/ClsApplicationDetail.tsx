import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Redirect, useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ClsApplication } from '../types/cls.type'

import { getClsApplicationById } from '../helpers/api.helper'

const ClsApplicationDetail = (): JSX.Element => {
	const { id } = useParams<{ id: string }>()
	const location = useLocation()
	const caQuery = useQuery<ClsApplication>(['clsApplication', id], () =>
		getClsApplicationById(id)
	)

	useEffect(() => {
		if (location.search.indexOf('success') !== -1) {
			toast.success('付費成功，你已完成報名程序。')
		} else if (location.search.indexOf('canceled') !== -1) {
			toast.warning('你取消了付款程序，報名已取消。')
		}
	}, [location.search])

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
			<Redirect to='.' />
		</>
	)
}

export default ClsApplicationDetail
