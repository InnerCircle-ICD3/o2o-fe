import { http, HttpResponse } from "msw";
import { baseUrl } from "../../utils";

const mockRecommendations = [
  "피자",
  "피자스쿨",
  "피자나라치킨공주",
  "피나치공",
  "피자헛",
  "피자마루",
  "피자알볼로",
  "치킨",
  "짜장면",
  "Pizza",
  "pizza",
  "pizza",
  "PIZZA",
  "Pizza Hut",
  "Dominos PIZZA",
  "pizzaria",
  "포커",
  "포커 추천1",
  "포커 추천2",
  "포커게임",
  "카지노",
  "바카라",
];

const handlers = [
  http.get(`${baseUrl}/recommendations`, ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("searchTerm") ?? "";
    const filtered = mockRecommendations.filter((word) => word.includes(searchTerm));
    return HttpResponse.json(filtered);
  }),
];

export default handlers;
