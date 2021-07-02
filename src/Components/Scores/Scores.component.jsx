const Scores = (props) => {
    return (
                <table className="table table-borderd text-center">
                    <thead>
                        <tr>
                            <td>Total Number</td>
                            <td>All Corrects</td>
                            <td>User Corrects</td>
                            <td>Commission</td>
                            <td>Ommission</td>
                            <td>Response Average</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{props.score.totalNumber}</td>
                            <td>{props.score.allCorrects}</td>
                            <td>{props.score.userCorrects}</td>
                            <td>{props.score.commission}</td>
                            <td>{props.score.ommission}</td>
                            <td>{props.score.responseAvg}</td>
                        </tr>
                    </tbody>
                </table >
    )
}
export default Scores;