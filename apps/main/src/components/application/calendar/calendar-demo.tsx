"use client";

import { Calendar } from "@/components/application/calendar/calendar";
import { events } from "@/components/application/calendar/config";

export const CalendarMonthViewDemo = () => {
    return <Calendar events={events} view="month" />;
};
