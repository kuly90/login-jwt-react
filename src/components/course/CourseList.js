import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const getCaret = direction => {
	if (direction === 'asc') {
		return (
			<span> <i className="fa fa-sort-asc" aria-hidden="true" /></span>
		);
	}

	if (direction === 'desc') {
		return (
			<span> <i className="fa fa-sort-desc" aria-hidden="true" /></span>
		);
	}

	return (
		<span> <i className="fa fa-sort" aria-hidden="true" /></span>
	);
};

class CourseList extends React.Component {
	constructor(props) {
		super(props);

		this.options = {
			sortIndicator: true,
			noDataText: 'No data'
		};

		this.selectRowProp = {
			mode: 'checkbox',
      columnWidth: '60px',
			onSelect: props.handleRowSelect,
			onSelectAll: this.onSelectAll
		};
	}

	onSelectAll = (isSelected) => {
    if (isSelected) {
      return this.props.ListData.map(row => row.id);
    } else {
      return [];
    }
  }

	render() {
		var x = this.props.ListData.map(item => item.length).reduce((prev, next) => prev + next, 0);
		x = x.toLocaleString('it-IT', { currency : 'VND'});
		return (
			<div>
				<br/>
			{/* <p>{x} VND</p> */}
			<BootstrapTable data={this.props.ListData} selectRow={this.selectRowProp} options={this.options} bordered={false} pagination>
				<TableHeaderColumn dataField="id" isKey hidden>Id</TableHeaderColumn>

				<TableHeaderColumn
					dataField="title"
					dataSort={true}
					caretRender={getCaret}
					filter={{ type: 'TextFilter', delay: 0 }}
					columnTitle
				>
					Title
        </TableHeaderColumn>

				<TableHeaderColumn
					dataField="length"
					dataSort={true}
					caretRender={getCaret}
					columnTitle
				>
					Length
        </TableHeaderColumn>

				<TableHeaderColumn
					dataField="category"
					dataSort={true}
					caretRender={getCaret}
					filter={{ type: 'TextFilter', delay: 0 }}
					columnTitle
				>
					Category
        </TableHeaderColumn>

				<TableHeaderColumn
					dataField="authorId"
					dataSort={true}
					caretRender={getCaret}
					filter={{ type: 'TextFilter', delay: 0 }}
					columnTitle
				>
					Author
        </TableHeaderColumn>
			</BootstrapTable>
			</div>
		);
	}

}

export default CourseList;
