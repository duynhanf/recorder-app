import React, { useState, useRef, useEffect } from "react";
import {
  UserEvent,
  deleteUserEvent,
  updateUserEvent,
} from "../../redux/user-events";
import { useDispatch } from "react-redux";
import { addZero } from "../../lib/utils";

interface Props {
  event: UserEvent;
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${addZero(hours)}:${addZero(minutes)}`;
};

const EventItem: React.FC<Props> = ({ event }) => {
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id));
  };
  const [editable, setEditable] = useState(false);
  const handleTitleClick = () => {
    setEditable(true);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);
  const [title, setTitle] = useState(event.title);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleBlurInput = () => {
    if (title !== event.title) {
      dispatch(updateUserEvent({ ...event, title }));
    }
    setEditable(false);
  };
  return (
    <div key={event.id} className="calendar-event">
      <div className="calendar-event-info">
        <div className="calendar-event-time">
          {formatDate(event.dateStart)} - {formatDate(event.dateEnd)}
        </div>
        <div className="calendar-event-title">
          {editable ? (
            <input
              type="text"
              ref={inputRef}
              value={title}
              onChange={handleChangeInput}
              onBlur={handleBlurInput}
            />
          ) : (
            <span onClick={handleTitleClick}>{event.title}</span>
          )}
        </div>
      </div>
      <button
        onClick={handleDeleteClick}
        className="calendar-event-delete-button"
      >
        &times;
      </button>
    </div>
  );
};

export default EventItem;
