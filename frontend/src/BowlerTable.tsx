// This type matches one bowler object returned by the backend API.
type Bowler = {
  bowlerID: number
  bowlerFirstName: string
  bowlerMiddleInit: string | null
  bowlerLastName: string
  teamName: string
  bowlerAddress: string
  bowlerCity: string
  bowlerState: string
  bowlerZip: string
  bowlerPhoneNumber: string
}

type BowlerTableProps = {
  bowlers: Bowler[]
}

function BowlerTable({ bowlers }: BowlerTableProps) {
  return (
    <div className="table-wrap">
      <table>
        {/* Table headers required by the assignment. */}
        <thead>
          <tr>
            <th>Bowler Name</th>
            <th>Team Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {/* Render one row per bowler from the API. */}
          {bowlers.map((b) => (
            <tr key={b.bowlerID}>
              <td>{`${b.bowlerFirstName} ${b.bowlerMiddleInit ? `${b.bowlerMiddleInit} ` : ''}${b.bowlerLastName}`}</td>
              <td>{b.teamName}</td>
              <td>{b.bowlerAddress}</td>
              <td>{b.bowlerCity}</td>
              <td>{b.bowlerState}</td>
              <td>{b.bowlerZip}</td>
              <td>{b.bowlerPhoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export type { Bowler }
export default BowlerTable
