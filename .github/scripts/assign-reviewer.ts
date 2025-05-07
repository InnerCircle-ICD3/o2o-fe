import * as github from '@actions/github';
import { WebClient } from '@slack/web-api';

interface Reviewer {
  githubName: string;
  slackUserId: string;
}

async function run() {
  const token = process.env.GH_TOKEN!;
  const slackToken = process.env.SLACK_BOT_TOKEN!;
  const octokit = github.getOctokit(token);
  const slack = new WebClient(slackToken);
  const context = github.context;

  const pr = context.payload.pull_request;
  if (!pr) throw new Error('❌ PR 정보가 없습니다.');

  const prCreator = pr.user.login;

  // reviewers.yml 로딩 및 타입 변환
  const reviewersJson = process.env.REVIEWERS_JSON!;
  const reviewers = JSON.parse(reviewersJson) as Reviewer[];
  const candidates = reviewers.filter(r => r.githubName !== prCreator);
  const selected = candidates[Math.floor(Math.random() * candidates.length)];

  // reviewer 지정
  await octokit.rest.pulls.requestReviewers({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: pr.number,
    reviewers: [selected.githubName],
  });

  // Slack DM 전송
  await slack.chat.postMessage({
    channel: selected.slackUserId,
    text: `🔔 *[${pr.title}]* PR의 리뷰어로 지정되셨습니다!\n👉 <${pr.html_url}|PR 보러가기>`,
  });
}

run().catch((e) => {
  console.error('❌ 에러 발생:', e);
  process.exit(1);
});