import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Column, useTable } from 'react-table'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import lightFormat from 'date-fns/lightFormat'

import { Inventory, InventoryLog } from '../types/inventory.type'

import {
	getInventories,
	getInventoryLogs,
	postInventoryLog,
} from '../helpers/api.helper'

import {
	Col,
	Form,
	FormFeedback,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
	Table,
} from 'reactstrap'
import Button from '../components/Button'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'

type InventoryLogDTO = InventoryLog

const inventoryLogDefaultValues: Omit<InventoryLogDTO, 'user'> = {
	quantity: 0,
	description: '',
}

type InventoryDTO = Pick<Inventory, 'id' | 'name' | 'amount' | 'updatedAt'>
const tableColumns: Column<InventoryDTO>[] = [
	{
		Header: '名稱',
		accessor: 'name',
	},
	{
		Header: '現存數量',
		accessor: 'amount',
	},
	{
		Header: '最後更新',
		accessor: 'updatedAt',
	},
]

const LogQuantityCol = styled(Col)<{ quantity: number }>`
	font-size: 1.1em;
	font-weight: bold;
	text-align: right;
	align-self: center;
	padding-right: 2em;
	color: ${({ quantity }) =>
		quantity > 0 ? '#6bd098' : quantity < 0 ? '#ef8157' : 'inherit'};
`

const logQuantityString = (n: number) =>
	n > 0 ? `+${n}` : n < 0 ? `(${n})` : '0'

const Inventories = (): JSX.Element => {
	const queryClient = useQueryClient()

	const [activeInventory, setActiveInventory] = useState<Inventory | undefined>(
		undefined
	)
	const [isNewILModalOpened, setIsNewILModalOpened] = useState<boolean>(false)
	const [isLogsModalOpened, setIsLogsModalOpened] = useState<boolean>(false)

	const inventoriesQuery = useQuery<Inventory[]>(
		['inventories'],
		() => getInventories(),
		{
			staleTime: 60000,
			placeholderData: [],
			select: (inventories: Inventory[]) =>
				inventories.map(({ id, name, amount, updatedAt }) => ({
					id,
					name,
					amount,
					updatedAt: updatedAt
						? lightFormat(new Date(updatedAt), 'yyyy-MM-dd HH:mm')
						: '-',
				})),
		}
	)

	const inventoryLogsQuery = useQuery<InventoryLog[]>(
		['inventory', activeInventory?.id, 'logs'],
		() => getInventoryLogs(activeInventory?.id || ''),
		{
			enabled: !!activeInventory && isLogsModalOpened,
			staleTime: 60000,
			placeholderData: [],
			select: (logs: InventoryLog[]) =>
				logs.map((log) => ({
					...log,
					createdAt: lightFormat(
						new Date(log.createdAt as string),
						'yyyy-MM-dd HH:mm'
					),
				})),
		}
	)

	const handleToggleNewILModal = useCallback(
		(iId?: string | undefined) => {
			if (!isNewILModalOpened) {
				const inventory = inventoriesQuery.data?.find((_) => _.id === iId)
				setActiveInventory(inventory ? { ...inventory } : undefined)
			}
			setIsNewILModalOpened((prev) => !prev)
		},
		[
			inventoriesQuery.data,
			setActiveInventory,
			isNewILModalOpened,
			setIsNewILModalOpened,
		]
	)

	const handleToggleLogsModal = useCallback(
		(iId?: string | undefined) => {
			if (!isLogsModalOpened) {
				const inventory = inventoriesQuery.data?.find((_) => _.id === iId)
				setActiveInventory(inventory)
			}
			setIsLogsModalOpened((prev) => !prev)
		},
		[
			inventoriesQuery.data,
			setActiveInventory,
			isLogsModalOpened,
			setIsLogsModalOpened,
		]
	)

	const tableInstance = useTable({
		columns: tableColumns,
		data: inventoriesQuery.data || [],
	})
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableInstance

	const { register, handleSubmit, errors } = useForm<InventoryLogDTO>({
		defaultValues: inventoryLogDefaultValues,
	})

	const inventoryMutation = useMutation(
		({ iId, iL }: { iId: string; iL: InventoryLog }) => {
			return postInventoryLog(iId, iL)
		},
		{
			onSuccess: () => {
				queryClient.refetchQueries(['inventories'])
			},
		}
	)

	const onSubmitInventoryLog = useCallback(
		(data: Record<string, unknown>) => {
			inventoryMutation
				.mutateAsync({
					iId: activeInventory?.id || '',
					iL: {
						...data,
					} as InventoryLog,
				})
				.then(() => {
					setIsNewILModalOpened(false)
					inventoriesQuery.refetch()
					toast.success('已更新')
				})
		},
		[inventoryMutation]
	)

	return (
		<>
			<PageTitle>物品庫 - HKIRS師生平台</PageTitle>
			<PageBrandname>物品庫</PageBrandname>
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
									<th>操作</th>
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
										<td>
											<Button
												color='primary'
												onClick={() => handleToggleLogsModal(row.original.id)}
											>
												紀錄
											</Button>{' '}
											<Button
												color='primary'
												onClick={() => handleToggleNewILModal(row.original.id)}
											>
												修改
											</Button>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</Table>
			</div>

			<Modal size='lg' isOpen={isNewILModalOpened}>
				<Form onSubmit={handleSubmit(onSubmitInventoryLog)}>
					<ModalHeader toggle={() => handleToggleNewILModal()}>
						修改
					</ModalHeader>
					<ModalBody>
						<Row>
							<Col xs={12} sm={6}>
								<FormGroup>
									<Label>物品</Label>
									<Input plaintext readOnly value={activeInventory?.name} />
								</FormGroup>
							</Col>
							<Col xs={12} sm={6}>
								<FormGroup>
									<Label>現存數量</Label>
									<Input plaintext readOnly value={activeInventory?.amount} />
								</FormGroup>
							</Col>
						</Row>

						<FormGroup style={{ maxWidth: '6em' }}>
							<Label>數量增減</Label>
							<Input
								name='quantity'
								type='number'
								innerRef={register({
									required: '必須填寫',
									valueAsNumber: true,
								})}
								invalid={!!errors.quantity}
								autoComplete='off'
							/>
							{errors.quantity && (
								<FormFeedback>{errors.quantity?.message}</FormFeedback>
							)}
						</FormGroup>

						<FormGroup>
							<Label>說明</Label>
							<Input
								name='description'
								type='textarea'
								rows={2}
								innerRef={register({
									required: '必須填寫',
								})}
								invalid={!!errors.description}
								autoComplete='off'
							/>
							{errors.description && (
								<FormFeedback>{errors.description?.message}</FormFeedback>
							)}
						</FormGroup>
					</ModalBody>
					<ModalFooter>
						<Button
							color='primary'
							type='submit'
							isLoading={inventoryMutation.isLoading}
						>
							提交
						</Button>{' '}
						<Button color='secondary' onClick={() => handleToggleNewILModal()}>
							取消
						</Button>
					</ModalFooter>
				</Form>
			</Modal>

			<Modal isOpen={isLogsModalOpened}>
				<ModalHeader toggle={() => handleToggleLogsModal()}>
					{activeInventory?.name} 紀錄
				</ModalHeader>
				<ModalBody>
					{inventoryLogsQuery.data &&
						inventoryLogsQuery.data.map((log) => (
							<Row style={{ justifyContent: 'center' }}>
								<Col>
									<div>
										<small className='text-muted'>
											{log.createdAt} - {log.user?.username}
										</small>
										<div>{log.description}</div>
									</div>
								</Col>
								<LogQuantityCol quantity={log.quantity}>
									{logQuantityString(log.quantity)}
								</LogQuantityCol>
							</Row>
						))}
				</ModalBody>
				<ModalFooter>
					<Button color='secondary' onClick={() => handleToggleLogsModal()}>
						關閉
					</Button>
				</ModalFooter>
			</Modal>
		</>
	)
}

export default Inventories
