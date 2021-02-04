import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

import { Inventory, InventoryLog } from '../types/inventory.type'

import { getInventories, postInventoryLog } from '../helpers/api.helper'

import {
	Button,
	Form,
	FormFeedback,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from 'reactstrap'

type InventoryLogDTO = InventoryLog

const inventoryLogDefaultValues: InventoryLogDTO = {
	quantity: 0,
	description: '',
}

const Inventories = (): JSX.Element => {
	const queryClient = useQueryClient()

	const [activeInventory, setActiveInventory] = useState<Inventory | undefined>(
		undefined
	)

	const [isNewILModalOpened, setIsNewVBModalOpened] = useState<boolean>(false)
	const handleToggleNewVBModal = useCallback(() => {
		setIsNewVBModalOpened((prev) => !prev)
	}, [setIsNewVBModalOpened])

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
					setIsNewVBModalOpened(false)
				})
		},
		[inventoryMutation]
	)

	return (
		<>
			<div className='content'>
				{/* <div style={{ textAlign: 'right' }}>
					<Button color='primary' onClick={handleToggleNewVBModal}>
						預約場地
					</Button>
				</div> */}
			</div>

			<Modal size='lg' isOpen={isNewILModalOpened}>
				<Form onSubmit={handleSubmit(onSubmitInventoryLog)}>
					<ModalHeader toggle={handleToggleNewVBModal}>預約場地</ModalHeader>
					<ModalBody>
						<FormGroup style={{ maxWidth: '6em' }}>
							<Label>增減數量</Label>
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
						<Button color='secondary' onClick={handleToggleNewVBModal}>
							取消
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		</>
	)
}

export default Inventories
