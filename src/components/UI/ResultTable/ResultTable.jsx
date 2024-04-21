import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classes from "./ResultTable.module.css";
import ChartModal from "../Chart/ChartModal/ChartModal";
import ResultChart from "../Chart/ResultChart";
import { BiSort } from "react-icons/bi";

// import ChartModal from "../Chart/ChartModal/ChartModal";

const StyledTableCell = styled(TableCell)(() => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: `var(--background-color)`,
		color: `var(--text-color)`,
		border: 0,
	},
	[`&.${tableCellClasses.body}`]: {
		border: 0,

		color: `var(--text-color)`,
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ index }) => ({
	backgroundColor:
		index % 2 === 0 ? `var(--background-color)` : `var(--accent-color-2)`,
	color: `var(--text-color)`,

	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

function createData(data) {
	return {
		time: data.time,
		calculatedWpm: data.calculatedWpm,
		calculatedAccuracy: data.calculatedAccuracy,
		enteredWordsLength: data.enteredWords.length,
		mistakes: `${data.mistakes.length}`,
		date: new Date(data.createdAt).toLocaleString(),
	};
}

// eslint-disable-next-line react/prop-types
export default function ResultTable({ results }) {
	const inputData = results;

	const rows = inputData.map(createData);
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("calories");

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const [modal, setModal] = React.useState(false);
	const [chartResult, setChartResult] = React.useState(null);
	const getChartResult = (row) => {
		const chartResult = inputData.filter(
			(result) => new Date(result.createdAt).toLocaleString() === row.date
		)[0];
		return chartResult;
	};

	const handleOpenChartModal = (row) => {
		const result = getChartResult(row);
		setChartResult(result);
		setModal(true);
	};

	// const handleOpenChartModal  = (chartResult) => {
	// 	return (

	// 	);
	// };

	return (
		<TableContainer
			component={Paper}
			style={{ backgroundColor: `var(--background-color)` }}
			className={classes.ResultTable}
		>
			<Table aria-label="customized table">
				<TableHead className={classes.TableHead}>
					<TableRow style={{ cursor: "pointer" }}>
						<StyledTableCell
							onClick={(event) => handleRequestSort(event, "time")}
						>
							Time <BiSort />
						</StyledTableCell>
						<StyledTableCell
							align="right"
							onClick={(event) => handleRequestSort(event, "calculatedWpm")}
						>
							WPM <BiSort />
						</StyledTableCell>
						<StyledTableCell
							align="right"
							onClick={(event) =>
								handleRequestSort(event, "calculatedAccuracy")
							}
						>
							Accuracy <BiSort />
						</StyledTableCell>
						<StyledTableCell
							align="right"
							onClick={(event) =>
								handleRequestSort(event, "enteredWordsLength")
							}
						>
							Words entered <BiSort />
						</StyledTableCell>
						<StyledTableCell
							align="right"
							onClick={(event) => handleRequestSort(event, "mistakes")}
						>
							Mistakes <BiSort />
						</StyledTableCell>
						<StyledTableCell
							align="center"
							onClick={(event) => handleRequestSort(event, "info")}
						>
							Info <BiSort />
						</StyledTableCell>
						<StyledTableCell
							align="right"
							onClick={(event) => handleRequestSort(event, "date")}
						>
							Date 
						</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows
						.sort(
							(a, b) =>
								(orderBy === "date"
									? new Date(a.date) - new Date(b.date)
									: a[orderBy] - b[orderBy]) * (order === "asc" ? 1 : -1)
						)
						.map((row, index) => (
							<StyledTableRow key={row.date} index={index}>
								<StyledTableCell component="th" scope="row">
									{row.time}
								</StyledTableCell>
								<StyledTableCell align="right">
									{row.calculatedWpm}
								</StyledTableCell>
								<StyledTableCell align="right">
									{row.calculatedAccuracy}%
								</StyledTableCell>
								<StyledTableCell align="right">
									{row.enteredWordsLength}
								</StyledTableCell>
								<StyledTableCell align="right">
									{row.mistakes} mistakes
								</StyledTableCell>
								<StyledTableCell align="right">
									{row.info}
									<button onClick={() => handleOpenChartModal(row)}>
										Open Chart
									</button>
									{modal && (
										<ChartModal visible={modal} setVisible={setModal}>
											<ResultChart result={chartResult} />
										</ChartModal>
									)}
								</StyledTableCell>
								<StyledTableCell align="right">{row.date}</StyledTableCell>
							</StyledTableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
