import React, { Component } from 'react';
import Table from './../shared/Table';
import ModalFormAction from './ModalFormAction';
import ModalAlertDetails from './ModalAlertDetails';
import dataService from './../services/data.service';
import './styles.scss';
const HANDLE = 'patients';

// Object Details data for table
const AlertData = [
	{
		key: '1',
		mrn: '#123456',
		firstName: 'Maha',
		lastName: 'ahmed',
		age: '23',
		abNormal: 'heart-rate',
		alert: [
			{
				type: '',
				value: '120bpm',
				criticality: 'high'
			}
		],
		lastRead: '22/11/2021',
		status: 'unread'
	},
	{
		key: '2',
		mrn: '#123456',
		firstName: 'alaa',
		lastName: 'ahmed',
		age: '23',
		abNormal: 'SpO2',
		lastRead: '22/11/2021',
		status: 'unread',
		alert: [
			{
				type: '',
				value: '120%',
				criticality: 'high'
			}
		]
	},
	{
		key: '3',
		mrn: '#123456',
		firstName: 'soad',
		lastName: 'ahmed',
		age: '23',
		abNormal: 'Bl.Pressure',
		alert: [
			{
				type: '',
				value: '115mmHg',
				criticality: 'critical-low'
			}
		],
		lastRead: '22/11/2021',
		status: 'unread',
		criticality: 'low'
	},
	{
		key: '4',
		mrn: '#123456',
		firstName: 'amgad',
		lastName: 'ahmed',
		age: '23',
		abNormal: 'BG(b.meal)',
		alert: [
			{
				type: '',
				value: '163/105',
				criticality: 'critical-high'
			}
		],
		lastRead: '22/11/2021',
		status: 'unread'
	},
	{
		key: '5',
		mrn: '#123456',
		firstName: 'amgad',
		lastName: 'ahmed',
		age: '23',
		abNormal: 'motion',
		alert: [
			{
				type: 'fail',
				value: '',
				criticality: 'critical-high'
			}
		],
		lastRead: '22/11/2021',
		status: 'unread'
	}
];

export default class Alerts extends Component {
	state = {
		data: [],
		visible: false,
		item: {}
	};
	componentDidMount() {
		this.getData();
	}
	getData = () => {
		dataService.get(HANDLE).then((items) => {
			const monitoredPatients = items.filter((item) => item.assigned === true);
			// console.log(monitoredPatients);

			this.setState({
				viewPatient: false,
				data: monitoredPatients
			});
		});
	};
	getPatient = (item) => {
		// console.log(item);
	};
	rowClick = (item) => {
		this.setState({
			visible: true,
			item
		});
		// console.log('rowclick', item);
	};
	handleCancel = () => {
		// console.log('handlecancel');
		this.setState({
			visible: false
		});
	};
	render() {
		const columns = {
			mrn: true,
			firstName: true,
			lastName: true,
			diagnosis: false,
			gender: false,
			age: true,
			dateCreated: false,
			assignAction: false,
			referAction: false,
			selectable: true,
			clickable: true,
			abNormal: true,
			alert: true,
			lastRead: true,
			status: true,
			criticality: false,
			measurements: false,
			deviceStatus: false,
			PatientsDeviceStatus: false,
			physician: false,
			patient: false,
			serial: false,
			model: false,
			type: false,
			mrnDevices: false
		};
		return (
			<div className="Alerts">
				<ModalFormAction />
				<ModalAlertDetails
					handleCancel={this.handleCancel}
					visible={this.state.visible}
					item={this.state.item}
				/>
				<Table
					{...columns}
					getPatient={this.getPatient}
					rowClick={this.rowClick}
					loading={this.state.loading}
					data={AlertData}
				/>
				<div />
			</div>
		);
	}
}
