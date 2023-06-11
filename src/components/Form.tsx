// 型を指定するものが複数ある場合は、下記のように別のところに書いて当てはめる。
type FormPropsType = {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  getWeather: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form = ({ city, setCity, getWeather }: FormPropsType) => {
  return (
    <form onSubmit={getWeather}>
      <input
        type="text"
        name="city"
        placeholder="都市名"
        //「onChange」は、inputに入力されたデータをsetCityに渡す役割を担う。
        // この「e」には、<input />に関する様々な情報が格納されている。ユーザーが入力した都市名の情報も入っている（e.target.valueで取得）。
        // 「setCity」内に「e.target.value」を書くことで、そのデータをcityに保管できる。
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default Form;
