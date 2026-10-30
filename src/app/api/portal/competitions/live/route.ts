import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export interface LiveCompetitionItem {
  id: string;
  title: string;
  link: string;
  source: string;
  snippet: string;
  date?: string | null;
  organizer?: string;
  deadline?: string;
  prize?: string;
  category: 'delhi-university' | 'national' | 'unstop' | 'international';
}

// In-memory cache to preserve SerpApi credits
let cachedItems: LiveCompetitionItem[] = [];
let lastFetchedAt: number = 0;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true';

    const apiKey =
      process.env.SERPAPI_API_KEY ||
      '81d0598c9901e3bb87cc21615b66f040e4d4adec8806c2a0b7b856ccee3f1819';

    // Serve from cache if fresh and not forced
    const now = Date.now();
    if (!forceRefresh && cachedItems.length > 0 && now - lastFetchedAt < CACHE_TTL_MS) {
      return NextResponse.json({
        success: true,
        source: 'cache',
        lastUpdated: new Date(lastFetchedAt).toISOString(),
        competitions: cachedItems,
      });
    }

    const queries = [
      'site:unstop.com photography competition 2026',
      'photography competition Delhi University 2026 college fest',
      'photography competition India 2026 2027 college students register',
    ];

    const allResults: LiveCompetitionItem[] = [];
    const seenTitles = new Set<string>();

    for (const q of queries) {
      try {
        const url = `https://serpapi.com/search.json?engine=google&gl=in&hl=en&num=8&q=${encodeURIComponent(
          q
        )}&api_key=${apiKey}`;

        const res = await fetch(url, { next: { revalidate: 3600 } });
        if (!res.ok) continue;

        const data = await res.json();
        const results = data.organic_results || [];

        for (const item of results) {
          const title = item.title || '';
          const snippet = item.snippet || '';
          const combined = `${title} ${snippet}`.toLowerCase();

          // Must be photography related
          if (
            !combined.includes('photo') &&
            !combined.includes('lens') &&
            !combined.includes('camera') &&
            !combined.includes('drishya') &&
            !combined.includes('shutter')
          ) {
            continue;
          }

          // Deduplicate by clean title
          const cleanTitle = title
            .replace(/\s*-\s*Unstop.*$/i, '')
            .replace(/\s*\|\s*.*$/i, '')
            .trim();

          if (seenTitles.has(cleanTitle.toLowerCase())) continue;
          seenTitles.add(cleanTitle.toLowerCase());

          // Extract category
          let category: LiveCompetitionItem['category'] = 'national';
          if (
            combined.includes('delhi university') ||
            combined.includes(' du ') ||
            combined.includes('college of arts') ||
            combined.includes('miranda') ||
            combined.includes('hindu') ||
            combined.includes('hansraj') ||
            combined.includes('stephen') ||
            combined.includes('kamala nehru')
          ) {
            category = 'delhi-university';
          } else if (item.link?.includes('unstop.com')) {
            category = 'unstop';
          } else if (
            combined.includes('world photography') ||
            combined.includes('international') ||
            combined.includes('sony world')
          ) {
            category = 'international';
          }

          // Extract deadline if present in snippet
          const deadlineMatch =
            snippet.match(/(?:deadline|submission closes|last date|register by)[:\s]+([^.,\n]+)/i) ||
            snippet.match(/(\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+202[5-7])/i);
          const deadline = deadlineMatch ? deadlineMatch[1].trim() : 'Active 2026/27 (Check Link)';

          // Extract prize snippet if present
          const prizeMatch = snippet.match(/(?:prize|win|reward|cash)[:\s]+([^.,\n]+)/i);
          const prize = prizeMatch ? prizeMatch[1].trim() : undefined;

          // Resolve clean link
          let link = item.link || '';
          if (link.startsWith('/goto?url=')) {
            link = `https://www.google.com${link}`;
          }

          allResults.push({
            id: `live-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            title: cleanTitle,
            link,
            source: item.displayed_link || 'Google Search',
            snippet,
            date: item.date || null,
            deadline,
            prize,
            category,
          });
        }
      } catch (err) {
        console.error('Error fetching query from SerpApi:', q, err);
      }
    }

    if (allResults.length > 0) {
      cachedItems = allResults;
      lastFetchedAt = Date.now();
    }

    return NextResponse.json({
      success: true,
      source: 'live',
      lastUpdated: new Date(lastFetchedAt).toISOString(),
      competitions: cachedItems.length > 0 ? cachedItems : allResults,
    });
  } catch (error) {
    console.error('Live competitions API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch live competitions from SerpApi.' },
      { status: 500 }
    );
  }
}
