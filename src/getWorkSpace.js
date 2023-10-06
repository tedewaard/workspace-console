import { WorkSpacesClient, DescribeWorkspacesCommand } from "@aws-sdk/client-workspaces"; // ES Modules import
import {fromIni} from "@aws-sdk/credential-provider-ini";
// const { WorkSpacesClient, DescribeWorkspacesCommand } = require("@aws-sdk/client-workspaces"); // CommonJS import
const client = new WorkSpacesClient({credentials: fromIni({profile: 'enduser'}), region: "us-east-1"});
const hmiDirectory = "d-9067117c9e";
const knollDirectory = "";

const input = { // DescribeWorkspacesRequest
  DirectoryId: "",
  UserName: "",
};


async function getWorkSpace(userName, directory) {
    if (directory === "HMI") {
        input.DirectoryId = hmiDirectory;
    } else {
        input.DirectoryId = knollDirectory;
    }
    input.UserName = userName;
    const command = new DescribeWorkspacesCommand(input);
    const response = await client.send(command);
    return response;
    //console.log(response);
}

export {getWorkSpace}

// { // DescribeWorkspacesResult
//   Workspaces: [ // WorkspaceList
//     { // Workspace
//       WorkspaceId: "STRING_VALUE",
//       DirectoryId: "STRING_VALUE",
//       UserName: "STRING_VALUE",
//       IpAddress: "STRING_VALUE",
//       State: "PENDING" || "AVAILABLE" || "IMPAIRED" || "UNHEALTHY" || "REBOOTING" || "STARTING" || "REBUILDING" || "RESTORING" || "MAINTENANCE" || "ADMIN_MAINTENANCE" || "TERMINATING" || "TERMINATED" || "SUSPENDED" || "UPDATING" || "STOPPING" || "STOPPED" || "ERROR",
//       BundleId: "STRING_VALUE",
//       SubnetId: "STRING_VALUE",
//       ErrorMessage: "STRING_VALUE",
//       ErrorCode: "STRING_VALUE",
//       ComputerName: "STRING_VALUE",
//       VolumeEncryptionKey: "STRING_VALUE",
//       UserVolumeEncryptionEnabled: true || false,
//       RootVolumeEncryptionEnabled: true || false,
//       WorkspaceProperties: { // WorkspaceProperties
//         RunningMode: "AUTO_STOP" || "ALWAYS_ON" || "MANUAL",
//         RunningModeAutoStopTimeoutInMinutes: Number("int"),
//         RootVolumeSizeGib: Number("int"),
//         UserVolumeSizeGib: Number("int"),
//         ComputeTypeName: "VALUE" || "STANDARD" || "PERFORMANCE" || "POWER" || "GRAPHICS" || "POWERPRO" || "GRAPHICSPRO" || "GRAPHICS_G4DN" || "GRAPHICSPRO_G4DN",
//         Protocols: [ // ProtocolList
//           "PCOIP" || "WSP",
//         ],
//       },
//       ModificationStates: [ // ModificationStateList
//         { // ModificationState
//           Resource: "ROOT_VOLUME" || "USER_VOLUME" || "COMPUTE_TYPE",
//           State: "UPDATE_INITIATED" || "UPDATE_IN_PROGRESS",
//         },
//       ],
//       RelatedWorkspaces: [ // RelatedWorkspaces
//         { // RelatedWorkspaceProperties
//           WorkspaceId: "STRING_VALUE",
//           Region: "STRING_VALUE",
//           State: "PENDING" || "AVAILABLE" || "IMPAIRED" || "UNHEALTHY" || "REBOOTING" || "STARTING" || "REBUILDING" || "RESTORING" || "MAINTENANCE" || "ADMIN_MAINTENANCE" || "TERMINATING" || "TERMINATED" || "SUSPENDED" || "UPDATING" || "STOPPING" || "STOPPED" || "ERROR",
//           Type: "PRIMARY" || "STANDBY",
//         },
//       ],
//     },
//   ],
//   NextToken: "STRING_VALUE",
// };