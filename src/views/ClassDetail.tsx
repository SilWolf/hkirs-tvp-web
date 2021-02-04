import React, { useCallback, useState } from 'react'
import { useAsync } from 'react-async'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'

import { Cls } from '../types/cls.type'
import { ELearning } from '../types/elearning.type'

import { getClassByClassId, getELearningByClassId } from '../helpers/api.helper'

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
import DateSpan from '../components/DateTime/DateSpan'
import TimeSpan from '../components/DateTime/TimeSpan'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'

import TimeAgo from 'timeago-react'

enum TAB_INDEX {
	ANNOUNCEMENTS = 0,
	FILES,
	LESSONS,
	DESCRIPTION,
}

const getClassFn = ({ classId }: any) => {
	return getClassByClassId(classId)
}
const getELearningFn = ({ classId }: any) => {
	return getELearningByClassId(classId)
}

const ClassDetail = () => {
	const [activeTab, setActiveTab] = useState<TAB_INDEX>(TAB_INDEX.ANNOUNCEMENTS)
	const { classId } = useParams<{ classId: string }>()

	const handleTabClick = useCallback((newTabIndex: TAB_INDEX) => {
		setActiveTab(newTabIndex)
	}, [])

	const eLearningAsync = useAsync<ELearning>({
		deferFn: getELearningFn,
		classId,
	})
	const classAsync = useAsync<Cls>({
		promiseFn: getClassFn,
		classId,
		onResolve: async () => {
			eLearningAsync.run(classId)
		},
	})

	const cls = classAsync.data as Cls
	const eLearning = eLearningAsync.data as ELearning

	if (classAsync.isLoading) {
		return (
			<div className='content'>
				<Spinner type='grow' color='primary' />
			</div>
		)
	}

	return (
		<>
			<PageTitle>{cls.code}</PageTitle>
			<PageBrandname>{cls.code}</PageBrandname>
			<div className='content'>
				<div style={{ display: 'flex', alignItems: 'flex-start' }}>
					<div style={{ marginRight: 16 }}>
						<div
							style={{
								backgroundImage: `url('${cls.course.coverImage.url}')`,
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
							{cls.startDate} - {cls.endDate}
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
								name: '檔案',
								tabIndex: TAB_INDEX.FILES,
							},
							{
								name: '課堂',
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
							{eLearningAsync.isLoading && (
								<Spinner type='grow' color='primary' />
							)}
							{eLearning && eLearning.e_learning_posts.length === 0 && (
								<div>沒有通告</div>
							)}
							{eLearning &&
								eLearning.e_learning_posts.length > 0 &&
								eLearning.e_learning_posts.map((post) => (
									<Card key={post.id}>
										<CardBody>
											<CardTitle>{post.title}</CardTitle>
											<ReactMarkdown>{post.content}</ReactMarkdown>
											<div className='text-muted'>
												<TimeAgo datetime={post.updatedAt} locale='zh_TW' />
											</div>
										</CardBody>
									</Card>
								))}
						</TabPane>

						<TabPane tabId={TAB_INDEX.FILES}>
							{eLearningAsync.isLoading && (
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
						</TabPane>

						<TabPane tabId={TAB_INDEX.LESSONS}>
							<ol>
								{cls.lessons &&
									cls.lessons.map((lesson) => (
										<li style={{ marginBottom: 16 }}>
											<DateSpan dateOrDateString={lesson.startAt} />{' '}
											<TimeSpan dateOrDateString={lesson.startAt} />-
											<TimeSpan dateOrDateString={lesson.endAt} />
											<br />
											{lesson.title}
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

export default ClassDetail
