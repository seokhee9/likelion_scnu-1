import { useEffect, useState } from "react";
import "./App.css";

const initialLions = [
  { id: 1, name: "김사자", track: "Frontend" },
  { id: 2, name: "이사자", track: "Backend" },
  { id: 3, name: "박사자", track: "AI" },
];

function App() {
  const [lions, setLions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [track, setTrack] = useState("Frontend");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("전체");
  const [sort, setSort] = useState("기본");

  const [showForm, setShowForm] = useState(false);

  const loadData = () => {
    setLoading(true);
    setError(false);

    setTimeout(() => {
      try {
        setLions(initialLions);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    }, 500);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addLion = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    const newLion = {
      id: Date.now(),
      name: name,
      track: track,
    };

    setLions([...lions, newLion]);
    setName("");
    setTrack("Frontend");
  };

  const deleteLastLion = () => {
    setLions((prev) => prev.slice(0, -1));
  };

  const randomTracks = ["Frontend", "Backend", "AI"];

  const addRandomLion = () => {
    const randomLion = {
      id: Date.now(),
      name: "랜덤사자" + Math.floor(Math.random() * 1000),
      track:
        randomTracks[Math.floor(Math.random() * randomTracks.length)],
    };

    setLions((prev) => [...prev, randomLion]);
  };

  const addFiveRandom = () => {
    const newLions = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      name: "랜덤사자" + Math.floor(Math.random() * 1000),
      track:
        randomTracks[Math.floor(Math.random() * randomTracks.length)],
    }));

    setLions((prev) => [...prev, ...newLions]);
  };

  let result = [...lions];

  if (filter !== "전체") {
    result = result.filter((lion) => lion.track === filter);
  }

  if (search) {
    result = result.filter((lion) =>
      lion.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === "이름순") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (loading) {
    return <h2>로딩 중...</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>에러 발생</h2>
        <button onClick={loadData}>재시도</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>멋쟁이사자처럼 명단 관리</h1>

      <h2>총 {result.length}명</h2>

      <button onClick={() => setShowForm(!showForm)}>
        아기 사자 추가
      </button>

      <button onClick={deleteLastLion}>
        마지막 아기 사자 삭제
      </button>

      <button onClick={addRandomLion}>
        랜덤 1명 추가
      </button>

      <button onClick={addFiveRandom}>
        랜덤 5명 추가
      </button>

      <button onClick={loadData}>
        전체 새로고침
      </button>

      {showForm && (
        <form onSubmit={addLion}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
          />

          <select
            value={track}
            onChange={(e) => setTrack(e.target.value)}
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>AI</option>
          </select>

          <button type="submit">추가</button>
        </form>
      )}

      <hr />

      <input
        placeholder="검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option>전체</option>
        <option>Frontend</option>
        <option>Backend</option>
        <option>AI</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option>기본</option>
        <option>이름순</option>
      </select>

      <div className="cards">
        {result.map((lion) => (
          <div key={lion.id} className="card">
            <h3>{lion.name}</h3>
            <p>{lion.track}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;