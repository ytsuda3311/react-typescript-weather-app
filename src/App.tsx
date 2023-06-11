import { useState } from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import Results from "./components/Results";
import Loading from "./components/Loading";
import "./App.css";

type ResultsStateType = {
  country: string;
  cityName: string;
  temperature: string;
  conditionText: string;
  icon: string;
};

function App() {
  // Loadingコンポーネントは、初期状態では非表示（false）で「Get Weather」ボタンを押すと表示（true）し、気象データが表示されると消える（false）ため「state」を使う。
  const [loading, setLoading] = useState<boolean>(false);
  // 「city」がstateで、ここにユーザーが入力した都市名が保管される。
  // 「setCity」がstateにデータを書き込んだり操作したりする仕組み。つまり「setCity」を使うことで、「city」内のデータを操作できる。
  // useStateの("")の中には初期値が入る。
  const [city, setCity] = useState<string>("");
  // 気象データの保管
  const [results, setResults] = useState<ResultsStateType>({
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: "",
  });
  // Form.tsxからWeatherAPIに都市名を渡す
  const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // <form>タグは実行するとデフォルトでリロードが入るため、「e.preventDefault()」が必要
    setLoading(true);
    // 「then」の中身は、APIにデータを送った後の処理を書く。
    // 「res」の中にAPIから送り返された気象データが入っている。
    fetch(
      // 「London」→「${city}」に置き換えることで入力された都市のURLを動的に生成できる。
      `https://proxy-server-book.vercel.app/weather-data?${city}`
    )
      .then((res) => res.json()) // 「fetch()」では、この送り返されたデータをこちらで再びJSON形式に変換して判読できるようにする。
      // 「data」には、resをJSON形式に変換したデータが入っている。
      .then((data) => {
        // 気象データをAPIから取得
        setResults({
          country: data.location.country,
          cityName: data.location.name,
          temperature: data.current.temp_c,
          conditionText: data.current.condition.text,
          icon: data.current.condition.icon,
        });
        setCity(""); // フォームに入力した文字を消すために、「city」のstateを初期状態に戻す。
        setLoading(false);
      })
      // エラー処理
      .catch((err) =>
        alert(
          "エラーが発生しました。ページをリロードして、もう一度トライしてください。"
        )
      );
  };
  // propsでは「名前 = {渡すもの}」となっており、これにアクセスするには「props.名前」となるため、慣例的に「city={city}」のように同じ名前にする。
  return (
    <div className="wrapper">
      <div className="container">
        <Title />
        <Form setCity={setCity} getWeather={getWeather} city={city} />
        {loading ? <Loading /> : <Results results={results} />}
      </div>
    </div>
  );
}

export default App;
