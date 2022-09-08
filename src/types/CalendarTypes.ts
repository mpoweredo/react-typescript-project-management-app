type StartTime = {
	startTimeHour: string;
	startTimeMinute: string;
};

type EndTime = {
	endTimeHour: string;
	endTimeMinute: string;
};

type CalendarEvent = {
	day: { nanoseconds: number; seconds: number };
	eventTitle: string;
	startTime: StartTime;
	endTime: EndTime;
	eventDescription: string;
};

type Calendar = CalendarEvent[];

export type { Calendar, StartTime, EndTime, CalendarEvent };
