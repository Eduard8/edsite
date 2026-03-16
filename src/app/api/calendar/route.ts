import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const maxResults = request.nextUrl.searchParams.get('maxResults') || '10';
    const timeMin = request.nextUrl.searchParams.get('timeMin') || new Date().toISOString();

    if (!apiKey || !calendarId) {
      return NextResponse.json(
        { error: 'Missing calendar configuration' },
        { status: 500 }
      );
    }

    const encodedCalendarId = encodeURIComponent(calendarId);
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodedCalendarId}/events?key=${apiKey}&singleEvents=true&orderBy=startTime&timeMin=${timeMin}&maxResults=${maxResults}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Google Calendar API error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: `Calendar request failed with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Add CORS headers to allow Flutter web app
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    return NextResponse.json(data, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Calendar API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar events' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
