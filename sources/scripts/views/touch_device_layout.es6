import ClassList from "../libs/css-class-list.es6";


export class TouchDeviceLayout extends React.Component {
	render() {
		return <div className={ ClassList.TOUCH_DEVICE_LAYOUT }>
			Touch-устройства не поддерживаются. Только мышка, только хардкор =)
		</div>
	}
}