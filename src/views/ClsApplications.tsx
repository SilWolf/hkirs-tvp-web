import React from 'react'
import { useQuery } from 'react-query'
import { Link, useRouteMatch } from 'react-router-dom'
import { Column, useTable } from 'react-table'

import { ClsApplication } from '../types/cls.type'

import { getMyClsApplications } from '../helpers/api.helper'

import { Table } from 'reactstrap'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'

type ClsApplicationDTO = Omit<ClsApplication, 'isPaid' | 'isConfirmed'> & {
	clsName: string
	isPaid: string
	isConfirmed: string
}
const tableColumns: Column<ClsApplicationDTO>[] = [
	{
		Header: '課程',
		accessor: 'clsName',
	},
	{
		Header: '參加者',
		accessor: 'name',
	},
	{
		Header: '已支付?',
		accessor: 'isPaid',
	},
	{
		Header: '已確認取錄?',
		accessor: 'isConfirmed',
	},
]

const ClsApplications = (): JSX.Element => {
	const routeMatch = useRouteMatch()

	const clsApplicationsQuery = useQuery<
		ClsApplication[],
		unknown,
		ClsApplicationDTO[]
	>(['clsApplications'], () => getMyClsApplications(), {
		staleTime: 60000,
		placeholderData: [],
		select: (cas: ClsApplication[]) =>
			cas.map((ca) => ({
				...ca,
				clsName: ca.cls.name,
				isPaid: ca.isPaid ? `已支付HKD$${ca.cls.price}` : '未支付',
				isConfirmed: ca.isConfirmed ? '已取錄' : '未取錄',
			})),
	})

	const tableInstance = useTable({
		columns: tableColumns,
		data: clsApplicationsQuery.data || [],
	})
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableInstance

	return (
		<>
			<PageTitle>我的報名 - HKIRS師生平台</PageTitle>
			<PageBrandname>我的報名</PageBrandname>
			<div className='content'>
				{/* <div style={{ textAlign: 'right' }}>
					<Button color='primary' onClick={handleToggleNewILModal}>
						預約場地
					</Button>
				</div> */}

				<Table {...getTableProps()}>
					<thead>
						{
							// Loop over the header rows
							headerGroups.map((headerGroup) => (
								// Apply the header row props
								<tr {...headerGroup.getHeaderGroupProps()}>
									{
										// Loop over the headers in each row
										headerGroup.headers.map((column) => (
											// Apply the header cell props
											<th {...column.getHeaderProps()}>
												{
													// Render the header
													column.render('Header')
												}
											</th>
										))
									}
									{/* <th>操作</th> */}
								</tr>
							))
						}
					</thead>
					{/* Apply the table body props */}
					<tbody {...getTableBodyProps()}>
						{
							// Loop over the table rows
							rows.map((row) => {
								// Prepare the row for display
								prepareRow(row)
								return (
									// Apply the row props
									<tr {...row.getRowProps()}>
										{
											// Loop over the rows cells
											row.cells.map((cell) => {
												// Apply the cell props
												return (
													<td {...cell.getCellProps()}>
														{
															// Render the cell contents
															cell.render('Cell')
														}
													</td>
												)
											})
										}
										{/* <td>
											<Link to={`${routeMatch.path}/${row.original.id}`}>
												詳細
											</Link>
										</td> */}
									</tr>
								)
							})
						}
					</tbody>
				</Table>
			</div>
		</>
	)
}

export default ClsApplications
