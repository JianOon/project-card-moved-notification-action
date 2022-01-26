const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;
    const token = core.getInput('token');
    const octokit = github.getOctokit(token);
    const changedColumnId = github.context.payload.changes && github.context.payload.changes.column_id;

    if (changedColumnId) {
      if (github.context.payload.project_card.content_url) {
        const issueResponse = await octokit.request(github.context.payload.project_card.content_url);
        const label = `Dev Task`;
        var arrayLength = issueResponse.data.labels.length;
        const createLabelResponse = await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/labels', {
                      owner: 'zengzihui',
                      repo: 'DevOps_Oct2021_Team04',
                      issue_number: issueResponse.data.number,
                      labels: label
                    });
          }
        }
      }
    }

  } catch (error) {
    console.error(error);
    core.setFailed(`The action failed with ${error}`);
  }
}

run();
