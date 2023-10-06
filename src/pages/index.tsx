import {useState} from 'react';

export default function Home() {
  const [userName, setUserName] = useState<string>("");
  const [workSpace, setWorkSpace] = useState<string>("");

  const handleChange = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setUserName(value);
  }

  async function getWorkSpace() {
    const response = await fetch("/api/getWorkSpace");
    return response.json();
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    console.log("Username submitted");
    console.log(userName);
    const response = await getWorkSpace() as JSON;
    setWorkSpace(response.message);
    console.log(workSpace);
  };

  return (
    <>
      <div className="mx-auto w-1/2 flex justify-center">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              className="bg-slate-200 rounded-lg ml-2"
              value={userName}
              onChange={handleChange}
              type="text"
              name="username"
            ></input>
          </div>
          <div className="flex justify-center mt-5">
            <button className="border-2 rounded-md w-20" type="submit">Search</button>
          </div>
        </form>
      </div>
    </>
  );
}
