type StartTime = {
	startTimeHour: string | number;
	startTimeMinute: string | number;
};

type EndTime = {
	endTimeHour: string | number;
	endTimeMinute: string | number;
};

type CalendarEvent = {
	id: string;
	day: { nanoseconds: number; seconds: number };
	eventTitle: string;
	startTime: StartTime;
	endTime: EndTime;
	eventDescription: string;
};

type NewCalendarEvent = {
	day?: { nanoseconds: number; seconds: number } | Date;
	eventTitle: string;
	eventDescription: string;
	startTime: StartTime;
	endTime: EndTime;
};

type Calendar = CalendarEvent[];

export type { Calendar, StartTime, EndTime, CalendarEvent, NewCalendarEvent };
