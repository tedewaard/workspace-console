import {useState} from 'react';
import WorkSpaceInfo from '../components/workspaceInfo';

type workSpace = {
  message: string
}

export default function Search() {
  const [userName, setUserName] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [workSpace, setWorkSpace] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleUsername = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setUserName(value);
    console.log(userName);
  }

  const handleDomain = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setDomain(value);
  }

  async function getWorkSpace() {
    console.log("Running getWorkSpace");
    const data = {
      username: userName,
      domain: domain,
    }
    const response = await fetch("/api/getWorkSpace", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const msg = await response.json().then((data: workSpace) => {
      //console.log(data.message);
      return data.message;
    })
    setWorkSpace(msg);
    }

  async function handleSubmit(e: React.FormEvent) {
    setSubmitted(false);
    e.preventDefault();
    //console.log("Username submitted");
    await getWorkSpace()
    setSubmitted(true);
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
              onChange={handleUsername}
              type="text"
              name="username"
            ></input>
          </div>
          <div className="flex flex-row">
            <p className="mr-6">Domain: </p>
            <input type="radio" name="domain" value="HMI" onChange={handleDomain}></input>
            <label className="mr-5">HMI</label>
            <input type="radio" name="domain" value="Knoll" onChange={handleDomain}></input>
            <label>Knoll</label>
          </div>
          <div className="flex justify-center mt-5">
            <button className="border-2 rounded-md w-20" type="submit">Search</button>
          </div>
        </form>
      </div>
        <div className={submitted ? "" : "hidden"}>
            {submitted ? (<WorkSpaceInfo info={workSpace} />) : (<div></div>)}
        </div>
    </>
  );
}