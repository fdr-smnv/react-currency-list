import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./App.css";
import List from "./components/List.js";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currencyToday, setCurrencyToday] = useState(null);
  const [historicData, setHistoricData] = useState(null);

  const calculateValueChange = (current, pervious, toFixed) => {
    const result =
      current > pervious
        ? ((pervious - current) / current) * 100
        : ((current - pervious) / current) * 100;

    if (toFixed) return result.toFixed(toFixed);
    return result;
  };

  const memoizedData = useMemo(() => {
    if (currencyToday && currencyToday.Valute) {
      return Object.values(currencyToday.Valute).map(
        ({ CharCode, Value, Previous, Name }) => ({
          meta: { Name },
          data: {
            CharCode,
            Value: "₽ " + Value.toFixed(2),
            YesterdayDifference: calculateValueChange(Value, Previous, 2) + "%",
          },
        })
      );
    }
  }, [currencyToday]);

  const onItemClick = useCallback(() => {
    if (!historicData) {
    }
  }, [historicData]);

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((res) => res.json())
      .then(
        (data) => {
          setCurrencyToday(data);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (isLoaded && memoizedData) {
    return (
      <div className="App">
        <h1>Курс валюты на сегодня</h1>
        <List items={memoizedData} />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default App;
