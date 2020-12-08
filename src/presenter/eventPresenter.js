const renderEvent = (container, task) => {
  const eventComponent = new EventView(task);
  const eventEditComponent = new EventEditView(task);

  const escKeyDownHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replace(eventComponent, eventEditComponent);
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  eventComponent.setEventOpenClickHandler(() => {
    replace(eventEditComponent, eventComponent);
    document.addEventListener(`keydown`, escKeyDownHandler);
  });

  eventEditComponent.setEventEditCloseClickHandler(() => {
    replace(eventComponent, eventEditComponent);
    document.removeEventListener(`keydown`, escKeyDownHandler);
  });

  eventEditComponent.setEventEditSubmitHandler(() => {
    replace(eventComponent, eventEditComponent);
    document.removeEventListener(`keydown`, escKeyDownHandler);
  });

  render(container, eventComponent, RENDER_POSITION.BEFOREEND);
};