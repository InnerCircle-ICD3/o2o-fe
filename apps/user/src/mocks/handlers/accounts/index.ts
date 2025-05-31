import { http, HttpResponse } from "msw";
import { baseUrl } from "../../utils";

const handlers = [
  http.get(`${baseUrl}/accounts/auth/me`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
        name: "서재완",
        email: "sjw7324@gmail.com",
      },
    });
  }),
];

export default handlers;
