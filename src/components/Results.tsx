type ResultsPropsType = {
  // resultsという名前のpropsとして渡されているため、results袋のなかの要素として、入れ子で書く必要がある
  results: {
    country: string;
    cityName: string;
    temperature: string;
    conditionText: string;
    icon: string;
  };
};

const Results = ({ results }: ResultsPropsType) => {
  const { country, cityName, temperature, conditionText, icon } = results;
  // 「&&」は、ロジカルオペレーターという記法で「左辺がtrueなら右辺を実行する」といった意味。
  return (
    <>
      {country && <div>{country}</div>}
      {cityName && <div>{cityName}</div>}
      {temperature && (
        <div>
          {temperature} <span>°C</span>
        </div>
      )}
      {conditionText && (
        <div className="results-condition">
          <img src={icon} alt="icon" />
          <span>{conditionText}</span>
        </div>
      )}
    </>
  );
};

export default Results;
