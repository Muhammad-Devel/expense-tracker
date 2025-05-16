const DateFilter = ({ fromDate, toDate, onChange }) => {
  return (
    <div className="bg-white shadow p-4 rounded-lg my-6 flex gap-4 items-center">
      <div>
        <label className="block text-sm font-medium">Boshlanish sanasi:</label>
        <input
          type="date"
          name="from"
          value={fromDate}
          onChange={onChange}
          className="input"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Tugash sanasi:</label>
        <input
          type="date"
          name="to"
          value={toDate}
          onChange={onChange}
          className="input"
        />
      </div>
    </div>
  );
};

export default DateFilter;
