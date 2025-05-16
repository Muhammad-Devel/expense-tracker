const SummaryCard = (props) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-center md:space-x-4 space-y-4 md:space-y-0">
      <div className="flex-1 flex flex-col items-center bg-white shadow p-4 rounded-lg text-center">
        <span className="text-base md:text-lg font-semibold">
          Jami xarajatlar:
        </span>
        <span className="text-xl md:text-2xl text-blue-500 font-bold">
          {props.allSummary.toLocaleString()} so‘m
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center bg-white shadow p-4 rounded-lg text-center">
        <span className="text-base md:text-lg font-semibold">
          Jami xarajatlar soni:
        </span>
        <span className="text-xl md:text-2xl text-blue-500 font-bold">
          {props.allCount.toLocaleString()} ta
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center bg-white shadow p-4 rounded-lg text-center">
        <span className="text-base md:text-lg font-semibold">
          Oylik xarajat:
        </span>
        <span className="text-xl md:text-2xl text-red-500 font-bold">
          {props.total.toLocaleString()} so‘m
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;
