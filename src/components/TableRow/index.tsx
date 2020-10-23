import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    rank: number;
    count: number;
    name: string;
    userLogin: string;
}

const TableRow: React.FC<Props> = ({
    rank,
    count,
    name,
    userLogin
}) => {
  return (
    <tr style={{textAlign: "center"}}>
        <td>{rank}</td>
        <td>{count}</td>
        <td><a href={`https://github.com/${userLogin}`}>{name}</a></td>
        <td><Link to={`/user/${userLogin}`}>{userLogin}</Link></td>
    </tr>
  );
}

export default TableRow;