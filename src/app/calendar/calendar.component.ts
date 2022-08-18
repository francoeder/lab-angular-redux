import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Injectable, ViewEncapsulation, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarView,
  DAYS_OF_WEEK,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addMinutes,
  addHours,
  endOfWeek
} from 'date-fns';
import { Subject, fromEvent } from 'rxjs';
import { WeekViewHourSegment } from 'calendar-utils';
import { finalize, takeUntil } from 'rxjs/operators';

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  view = CalendarView.Week;
  viewDate = new Date();
  // events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  locale = 'en';
  weekStartsOn: 0 = 0;
  weekendDays: number[] = [DAYS_OF_WEEK.SUNDAY];
  CalendarView = CalendarView;
  activeDayIsOpen = false;
  dragToCreateActive = false;

  @Output() createEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() editEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  @Input() events: CalendarEvent<{ id: number }>[] = [];

  setView(view: CalendarView) {
    this.view = view;
  }

  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'New event',
      start: segment.date,
      meta: {
        tmpEvent: true
      }
    };
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn
    });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refreshDOM();
          console.log(dragToSelectEvent);
          this.createEventEmitter.emit(dragToSelectEvent);
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);

        if (newEnd > segment.date && newEnd < endOfView &&
            this.getDifferenceInHoursBetweenDates(dragToSelectEvent.start, newEnd) <= 8) {
          dragToSelectEvent.end = newEnd;
        }
        this.refreshDOM();
      });
  }

  public addEvent(event: CalendarEvent) {
    this.events.push(event);
  }

  public detailEvent(action: string, event: CalendarEvent): void {
    console.log(event);
    this.editEventEmitter.emit(event);
  }

  public syncEvent(event: CalendarEvent) {
    const eventIndex = this.events.findIndex((item) => item.id === event.id);
    this.events[eventIndex] = event;
  }

  public discardEvent(event: CalendarEvent) {
    this.events = this.events.filter((item) => item.id === event.id);
  }

  private getDifferenceInHoursBetweenDates(start: Date, end: Date) {
    return (end.valueOf() - start.valueOf()) / 1000 / 60 / 60;
  }

  public refreshDOM() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }

}
