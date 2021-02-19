import React, { useCallback, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { lightFormat } from 'date-fns'
import classnames from 'classnames'

import { Cls, ClsAnnouncement } from '../types/cls.type'

import { getClsAnnouncementById, getClsById } from '../helpers/api.helper'

import {
	Card,
	CardBody,
	CardTitle,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
} from 'reactstrap'
import Spinner from 'reactstrap/lib/Spinner'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'

enum TAB_INDEX {
	ANNOUNCEMENTS = 0,
	FILES,
	LESSONS,
	DESCRIPTION,
}

const formatDateTime = (dateString: string) =>
	lightFormat(new Date(dateString), 'yyyy年MM月dd日 HH:mm')

const ClsDetail = (): JSX.Element => {
	const [activeTab, setActiveTab] = useState<TAB_INDEX>(TAB_INDEX.ANNOUNCEMENTS)
	const { clsId } = useParams<{ clsId: string }>()

	const handleTabClick = useCallback((newTabIndex: TAB_INDEX) => {
		setActiveTab(newTabIndex)
	}, [])

	const clsQuery = useQuery<Cls>(['cls', clsId], () => getClsById(clsId), {
		select: (cls: Cls) => ({
			...cls,
			startAt: formatDateTime(cls.startAt),
			endAt: formatDateTime(cls.endAt),
			lessons: cls.lessons.map((clsLesson) => ({
				...clsLesson,
				startAt: formatDateTime(clsLesson.startAt),
				endAt: formatDateTime(clsLesson.endAt),
			})),
		}),
	})
	const clsAnnouncementsQuery = useQuery<ClsAnnouncement[]>(
		['cls', clsId, 'announcements'],
		() => getClsAnnouncementById(clsId),
		{
			enabled: !!clsQuery.data,
			select: (clsAs: ClsAnnouncement[]) =>
				clsAs.map((clsA) => ({
					...clsA,
					createdAt: formatDateTime(clsA.createdAt as string),
				})),
		}
	)

	const cls = clsQuery.data as Cls
	const clsAnnouncements = clsAnnouncementsQuery.data as ClsAnnouncement[]

	if (clsQuery.isLoading) {
		return (
			<div className='content'>
				<Spinner type='grow' color='primary' />
			</div>
		)
	}

	return (
		<>
			<PageTitle>{cls.name}</PageTitle>
			<PageBrandname>{cls.name}</PageBrandname>
			<div className='content'>
				<div style={{ display: 'flex', alignItems: 'flex-start' }}>
					<div style={{ marginRight: 16 }}>
						<div
							style={{
								backgroundImage: `url('${cls.course.coverImage?.url}')`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								width: 160,
								height: 160,
							}}
						/>
					</div>
					<div style={{ flexGrow: 1 }}>
						<h4>{cls.code}</h4>
						<h6>
							{cls.startAt} - {cls.endAt}
						</h6>
						<h6>{cls.course.name}</h6>
					</div>
				</div>

				<div style={{ marginTop: 16 }}>
					<Nav tabs>
						{[
							{
								name: '通告',
								tabIndex: TAB_INDEX.ANNOUNCEMENTS,
							},
							{
								name: '課堂和檔案',
								tabIndex: TAB_INDEX.LESSONS,
							},
							{
								name: '課程描述',
								tabIndex: TAB_INDEX.DESCRIPTION,
							},
						].map((item) => (
							<NavItem key={item.tabIndex}>
								<NavLink
									className={classnames({
										active: activeTab === item.tabIndex,
									})}
									onClick={() => {
										handleTabClick(item.tabIndex)
									}}
								>
									{item.name}
								</NavLink>
							</NavItem>
						))}
					</Nav>
				</div>

				<div style={{ marginTop: 16 }}>
					<TabContent activeTab={activeTab}>
						<TabPane tabId={TAB_INDEX.ANNOUNCEMENTS}>
							{clsAnnouncementsQuery.isLoading && (
								<Spinner type='grow' color='primary' />
							)}
							{clsAnnouncements && clsAnnouncements.length === 0 && (
								<div>沒有通告</div>
							)}
							{clsAnnouncements &&
								clsAnnouncements.length > 0 &&
								clsAnnouncements.map((post) => (
									<Card key={post.id}>
										<CardBody>
											<CardTitle>{post.subject}</CardTitle>
											<ReactMarkdown>{post.content}</ReactMarkdown>
											<div className='text-muted'>{post.createdAt}</div>
										</CardBody>
									</Card>
								))}
						</TabPane>
						{/* 
						<TabPane tabId={TAB_INDEX.FILES}>
							{eLearningQuery.isLoading && (
								<Spinner type='grow' color='primary' />
							)}
							{eLearning && eLearning.files.length === 0 && (
								<div>沒有可供下載的檔案</div>
							)}
							{eLearning && eLearning.files.length > 0 && (
								<ul>
									{eLearning.files.map((file) => (
										<li>
											<a
												key={file.id}
												href={file.url}
												rel='noreferrer'
												target='_blank'
											>
												{file.name}
											</a>{' '}
											({file.size}KB)
										</li>
									))}
								</ul>
							)}
						</TabPane> */}

						<TabPane tabId={TAB_INDEX.LESSONS}>
							<ol>
								{cls.lessons &&
									cls.lessons.map((lesson) => (
										<li key={lesson.id} style={{ marginBottom: 16 }}>
											{lesson.startAt} - {lesson.endAt}
											<br />
											<div>{lesson.name}</div>
											<div>{lesson.description}</div>
											<ul>
												{lesson.files &&
													lesson.files.map((file) => (
														<li key={file.id}>
															<a
																href={file.url}
																rel='noreferrer'
																target='_blank'
															>
																{file.name} ({file.size}KB)
															</a>
														</li>
													))}
											</ul>
											<hr />
										</li>
									))}
							</ol>
						</TabPane>

						<TabPane tabId={TAB_INDEX.DESCRIPTION}>
							<ReactMarkdown>{cls.course.description as string}</ReactMarkdown>
						</TabPane>
					</TabContent>
				</div>
			</div>
		</>
	)
}

export default ClsDetail
