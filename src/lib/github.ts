import { Octokit } from "octokit";

export type FileData = {
  name: string;
  path: string;
};

// Check the directory content
export async function getGHDirContent(
  pagesOrPosts: "pages" | "posts",
  locale: string,
  dirName?: string
): Promise<FileData[]> {
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN,
  });

  const filepath = `${pagesOrPosts}/${locale}${dirName ? "/" + dirName : ""}`;

  try {
    const folderContent = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: process.env.GH_OWNER || "",
        repo: process.env.GH_REPO || "",
        path: filepath,
      }
    );

    return Array.isArray(folderContent.data)
      ? folderContent.data.map((fileData) => ({
          name: fileData.name,
          path: fileData.path,
        }))
      : [];
  } catch (error) {
    console.error("Woops - error in downloading the Github stuff...");
    return [];
  }
}

export async function getGHFileContentFromPath(
  filePath: string
): Promise<string> {
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN,
  });

  try {
    const result = await octokit.rest.repos.getContent({
      owner: process.env.GH_OWNER || "",
      repo: process.env.GH_REPO || "",
      path: filePath,
    }); // ouch - I don't manage to type this correctly to get access to the `data.content` property

    // Decoding the result in Base 64
    if (process.env.NODE_ENV === "development") {
      console.log(`Result of GetFileContentFromPath`, result);
    }

    if (Array.isArray(result.data)) {
      return "";
    }

    if (result.data.type == "file") {
      return Buffer.from(result.data.content, "base64").toString("ascii");
    } else {
      return "";
    }
  } catch (error) {
    console.error(`Error in getGHFileContentFrom Path! ${filePath}`);
    console.log(error);
    return "";
  }
}

export async function getGHFileContentFromId(
  pagesOrPosts: "pages" | "posts",
  locale: string,
  fileId: string
): Promise<string> {
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN,
  });

  try {
    const result = await octokit.rest.repos.getContent({
      owner: process.env.GH_OWNER || "",
      repo: process.env.GH_REPO || "",
      path: `${pagesOrPosts}/${locale}/${fileId}.md`,
    });
    if (process.env.NODE_ENV === "development")
      console.log(`Result of GetFileContentFromId`, result);
    if (Array.isArray(result.data)) {
      return "";
    }
    if (result.data.type === "file")
      return Buffer.from(result.data.content, "base64").toString("ascii");

    return "";
  } catch (error) {
    console.error(`Error in getGHFileFromId ${fileId}`);
    console.log(error);
    return "";
  }
}
