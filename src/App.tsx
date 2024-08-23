import { useState } from "react";
import api from "./api/api";

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit", data);
    const datad = await api.post("/login", data);
    console.log(datad, "k bhayo");
  };

  const handleGetRooms = async () => {
    const datad = await api.get("/api/rooms");
    console.log(datad, "k bhayo");
  };

  return (
    <div className="bg-red-600 h-28">
      <form
        className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            className="p=2 bg-slate-400 w-full rounded-md"
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            id="name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Email</label>
          <input
            className="p=2 bg-slate-400 w-full rounded-md"
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            id="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="p=2 bg-slate-400 w-full rounded-md"
            type="text"
            name="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            id="password"
          />
        </div>
        <button type="submit" className="p-2 w-fit bg-slate-400 rounded-lg">
          Submit
        </button>
      </form>

      <button
        type="button"
        onClick={handleGetRooms}
        className="p-2 w-fit bg-slate-400 rounded-lg"
      >
        rooms
      </button>
    </div>
  );
}

export default App;
