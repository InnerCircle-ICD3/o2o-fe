import * as github from "@actions/github";
import { WebClient } from "@slack/web-api";

interface Reviewer {
  githubName: string;
  slackUserId: string;
}

async function run() {
  const { GH_TOKEN, SLACK_BOT_TOKEN, REVIEWERS_JSON } = process.env;
  if (!GH_TOKEN || !SLACK_BOT_TOKEN || !REVIEWERS_JSON) {
    throw new Error("❌ 필요한 환경 변수가 누락되었습니다.");
  }

  const octokit = github.getOctokit(GH_TOKEN);
  const slack = new WebClient(SLACK_BOT_TOKEN);
  const context = github.context;

  const pr = context.payload.pull_request;
  if (!pr) throw new Error("❌ PR 정보가 없습니다.");

  const prCreator = pr.user.login;
  const reviewers = JSON.parse(REVIEWERS_JSON) as Reviewer[];
  const candidates = reviewers.filter((r) => r.githubName !== prCreator);
  const selected = candidates[Math.floor(Math.random() * candidates.length)];

  // 1. GitHub Reviewer 지정
  await octokit.rest.pulls.requestReviewers({
    owner: context.repo.owner,
    repo: context.repo.repo,
    // biome-ignore lint/style/useNamingConvention: false
    pull_number: pr.number,
    reviewers: [selected.githubName],
  });

  // 2. Slack 사용자 ID 추출
  const slackUserId = selected.slackUserId;

  // 3. DM 채널 열기 (자기 자신도 가능)
  const { channel } = await slack.conversations.open({ users: slackUserId });
  if (!channel?.id) throw new Error("❌ DM 채널 열기에 실패했습니다.");

  // 4. 메시지 전송
  await slack.chat.postMessage({
    channel: channel.id,
    text: `🔔 *[${pr.title}]* PR의 리뷰어로 지정되셨습니다!\n👉 <${pr.html_url}|PR 보러가기>`,
  });
}

run().catch((e) => {
  console.error("❌ 에러 발생:", e);
  process.exit(1);
});
