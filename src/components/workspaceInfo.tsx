import { useEffect, useState } from "react";

type workspaceProps = {
    ComputeTypeName: string,
    RunningMode: string,
    Protocols: [string],
}

type workSpace = {
    BundleId: string,
    ComputerName: string,
    DirectoryId: string,
    IpAddress: string,
    UserName: string,
    WorkspaceId: string,
    WorkspaceProperties: workspaceProps,
}

function displayData(workspace: workSpace){
    return (
      <table className="table-auto border-separate border-spacing-x-5 border-spacing-y-3">
        <tbody>
          <tr>
            <td>ComputerName: </td>
            <td>{workspace.ComputerName}</td>
          </tr>
          <tr>
            <td>UserName: </td>
            <td>{workspace.UserName}</td>
          </tr>
          <tr>
            <td>WorkspaceId: </td>
            <td>{workspace.WorkspaceId}</td>
          </tr>
          <tr>
            <td>ComputeType: </td>
            <td>{workspace.WorkspaceProperties.ComputeTypeName}</td>
          </tr>
          <tr>
            <td>Protocol: </td>
            <td>{workspace.WorkspaceProperties.Protocols[0]}</td>
          </tr>
          <tr>
            <td>RunningMode: </td>
            <td>{workspace.WorkspaceProperties.RunningMode}</td>
          </tr>
        </tbody>
      </table>
    );
}

export default function WorkSpaceInfo({info}) {
    const [data, setData] = useState<workSpace | null>(null);

    useEffect(() => {
        if (info !== "") {
            const converted = JSON.parse(info);
        if (converted.Workspaces.length > 0) {
            setData(converted.Workspaces[0] as workSpace);
        } else {
            console.log("WorkSpace wasn't returned.")
        }
        }
    }, []);

    return(
        <>
            {data ? (displayData(data)) : (<div></div>)}
        </>
    )
}