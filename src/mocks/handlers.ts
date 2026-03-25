import { http, HttpResponse } from 'msw';

import { mockRepos, mockSearchResults, mockUser } from './data';

const GITHUB_API = 'https://api.github.com';

export const handlers = [
  http.get(`${GITHUB_API}/search/users`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');

    if (!query) {
      return HttpResponse.json({ items: [], total_count: 0 }, { status: 200 });
    }

    return HttpResponse.json(
      {
        incomplete_results: false,
        items: mockSearchResults,
        total_count: mockSearchResults.length,
      },
      { status: 200 },
    );
  }),

  http.get(`${GITHUB_API}/users/:username`, ({ params }) => {
    const { username } = params;

    if (username === 'notfound') {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return HttpResponse.json({ ...mockUser, login: username }, { status: 200 });
  }),

  http.get(`${GITHUB_API}/users/:username/repos`, ({ params }) => {
    const { username } = params;

    if (username === 'notfound') {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return HttpResponse.json(mockRepos, { status: 200 });
  }),
];
