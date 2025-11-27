"use client";

import type { CalendarEvent } from "./calendar";

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();

const dateOn = (day: number, hours: number, minutes = 0) => new Date(year, month, day, hours, minutes);

export const events: CalendarEvent[] = [
    {
        id: "care-team-standup",
        title: "Care team standup",
        start: dateOn(4, 9, 0),
        end: dateOn(4, 9, 30),
        color: "brand",
        dot: true,
    },
    {
        id: "new-intakes-review",
        title: "New intakes review",
        start: dateOn(5, 11, 0),
        end: dateOn(5, 12, 0),
        color: "green",
    },
    {
        id: "provider-shadowing",
        title: "Provider shadowing",
        start: dateOn(7, 13, 0),
        end: dateOn(7, 15, 0),
        color: "blue",
    },
    {
        id: "on-call-rotation",
        title: "On-call rotation",
        start: dateOn(8, 18, 0),
        end: dateOn(10, 8, 0),
        color: "purple",
    },
    {
        id: "offsite-planning",
        title: "Offsite planning",
        start: dateOn(12, 0, 0),
        end: dateOn(14, 23, 30),
        color: "orange",
    },
    {
        id: "leadership-sync",
        title: "Leadership sync",
        start: dateOn(16, 10, 0),
        end: dateOn(16, 11, 30),
        color: "indigo",
    },
    {
        id: "quality-review",
        title: "Quality review",
        start: dateOn(20, 15, 0),
        end: dateOn(20, 16, 0),
        color: "gray",
        dot: true,
    },
    {
        id: "training-block",
        title: "Training block",
        start: dateOn(22, 9, 0),
        end: dateOn(22, 12, 0),
        color: "yellow",
    },
    {
        id: "community-outreach",
        title: "Community outreach clinic",
        start: dateOn(24, 8, 0),
        end: dateOn(24, 14, 0),
        color: "pink",
    },
];
