interface HistoryProps {
  history: string[];
}

const History: React.FC<HistoryProps> = ({ history }) => (
  <div className="history">
    <h3>History</h3>
    <ul>
      {history.map((entry, index) => (
        <li key={index}>{entry}</li>
      ))}
    </ul>
  </div>
);

export default History;
