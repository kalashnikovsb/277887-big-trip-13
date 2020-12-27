import {FilterType} from "../const.js";
import {isFutureEvent, isPastEvent} from "./events-utils.js";

export const filter = {
  [FilterType.EVERYTHING]: (events) => events.filter((event) => !event.isArchive),
  [FilterType.FUTURE]: (events) => events.filter((event) => isFutureEvent(event.timeStart)),
  [FilterType.PAST]: (events) => events.filter((event) => isPastEvent(event.timeStart))
};
