import React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import './Stats.css';

const Stats = () => {
    const easyPlayed = localStorage.getItem('easyPlayed');
    const easyStreak = localStorage.getItem('easyStreak');
    const easyWon = localStorage.getItem('easyWon');
    // const mediumPlayed = localStorage.getItem('mediumPlayed');
    // const mediumStreak = localStorage.getItem('mediumStreak');
    // const mediumWon = localStorage.getItem('mediumWon');
    const hardPlayed = localStorage.getItem('hardPlayed');
    const hardStreak = localStorage.getItem('hardStreak');
    const hardWon = localStorage.getItem('hardWon');

    function createData(
        level,
        played,
        win,
        streak,
    ) {
        return { level, played, win, streak };
    }

    const rows = [
        createData("Easy", easyPlayed !== null ? easyPlayed : 0, easyWon !== null ? (easyWon / easyPlayed) * 100 : 0, easyStreak !== null ? easyStreak : 0),
        // createData("Medium", mediumPlayed !== null ? mediumPlayed : 0, mediumWon !== null ? (mediumWon / mediumPlayed) * 100 : 0, mediumStreak !== null ? mediumStreak : 0),
        createData("Hard", hardPlayed !== null ? hardPlayed : 0, hardWon !== null ? (hardWon / hardPlayed) * 100 : 0, hardStreak !== null ? hardStreak : 0),

    ];
    return (
        <>
            <div className='container'>
                <div className='heading-stats'>Your Stats</div>
                <TableContainer component={Paper} sx={{ width: 617, background: 'transparent', border: '4px solid #c42d63', borderRadius: 0 }}>
                    <Table sx={{ width: 617 }} size="small" aria-label="stats table">
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.level}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.level}
                                    </TableCell>
                                    <TableCell align="right">
                                        <div style={{ textAlign: 'center' }}>
                                            {row.played}
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            {"Game Played"}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right"> <div style={{ textAlign: 'center' }}>
                                        {row.win} %
                                    </div>
                                        <div style={{ textAlign: 'center' }}>
                                            {"win percentage"}
                                        </div></TableCell>
                                    <TableCell align="right"> <div style={{ textAlign: 'center' }}>
                                        {row.streak}
                                    </div>
                                        <div style={{ textAlign: 'center' }}>
                                            {"Game Streak"}
                                        </div></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

        </>
    )
}

export default Stats